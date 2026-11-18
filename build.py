#!/usr/bin/env python3
"""Build the DIY Solar Calculator.

Reads data/calculator.yaml, checks it, and writes one self-contained page to
dist/index.html. Needs Python 3 and PyYAML:

    pip install pyyaml
    python3 build.py
"""
import html
import json
import pathlib
import re
import shutil
import sys

try:
    import yaml
except ImportError:
    sys.exit("PyYAML is missing. Install it with: pip install pyyaml")

ROOT = pathlib.Path(__file__).resolve().parent
DATA = ROOT / "data" / "calculator.yaml"
TEMPLATE = ROOT / "template.html"
DIST = ROOT / "dist"

problems = []


def problem(where, what):
    problems.append(f"  {where}: {what}")


def number(value, where, low, high):
    """True when value is a number from low to high; records a problem if not."""
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        problem(where, f"should be a number, but it is {value!r}")
        return False
    if not low <= value <= high:
        problem(where, f"should be between {low} and {high}, but it is {value}")
        return False
    return True


def text(value, where):
    if not isinstance(value, str) or not value.strip():
        problem(where, "should be some text, but it is empty or missing")
        return False
    return True


def only(mapping, allowed, where):
    """Flag fields nobody reads, which are usually typing mistakes."""
    if not isinstance(mapping, dict):
        problem(where, "should be a set of named fields")
        return False
    for key in mapping:
        if key not in allowed:
            problem(where, f"has a field called '{key}' that the calculator does not use. Check the spelling")
    return True


def main():
    if not DATA.exists():
        sys.exit(f"Cannot find {DATA}")
    try:
        doc = yaml.safe_load(DATA.read_text(encoding="utf-8"))
    except yaml.YAMLError as error:
        sys.exit(f"Nothing was built. data/calculator.yaml could not be read:\n{error}")

    top = {"title", "tagline", "source_url", "site_url", "defaults", "rules", "bands", "band_note",
           "when", "sun_note", "states", "groups"}
    if not only(doc, top, "calculator.yaml"):
        sys.exit("Nothing was built. data/calculator.yaml is not laid out as expected.")

    for field in ("title", "tagline", "band_note", "sun_note"):
        text(doc.get(field), field)
    source_url = str(doc.get("source_url") or "")
    if not source_url.startswith("https://"):
        problem("source_url", "should be a full https:// address")
    site_url = str(doc.get("site_url") or "").strip()
    if site_url and (not site_url.startswith("https://") or site_url.endswith("/")):
        problem("site_url", "should be a full https:// address with no slash at the end, or left empty")

    # rules
    rules = doc.get("rules") or {}
    limits = {"inverter_load": (0.3, 1), "battery_use": (0.3, 1), "battery_loss": (0, 0.3),
              "panel_losses": (0.4, 1), "panel_watts": (50, 1000), "days_in_month": (28, 31)}
    if only(rules, limits, "rules"):
        for key, (low, high) in limits.items():
            if key not in rules:
                problem("rules", f"'{key}' is missing")
            else:
                number(rules[key], f"rules, {key}", low, high)

    # bands
    bands = doc.get("bands") or []
    if not isinstance(bands, list) or not bands:
        problem("bands", "should list at least one price")
        bands = []
    for index, band in enumerate(bands, 1):
        where = f"bands, entry {index}"
        if only(band, {"name", "price"}, where):
            text(band.get("name"), where + ", name")
            number(band.get("price"), where + ", price", 0, 10000)

    # when
    when = doc.get("when") or []
    when_ids = []
    if not isinstance(when, list) or not when:
        problem("when", "should list at least one choice")
        when = []
    for index, choice in enumerate(when, 1):
        where = f"when, entry {index}"
        if only(choice, {"id", "label", "night"}, where):
            text(choice.get("id"), where + ", id")
            text(choice.get("label"), where + ", label")
            number(choice.get("night"), where + ", night", 0, 1)
            when_ids.append(choice.get("id"))

    # states
    states = doc.get("states") or {}
    if not isinstance(states, dict) or not states:
        problem("states", "should list each state with its sun hours")
        states = {}
    for name, hours in states.items():
        number(hours, f"states, {name}", 2, 8)

    # defaults
    defaults = doc.get("defaults") or {}
    if only(defaults, {"state", "price", "when"}, "defaults"):
        if defaults.get("state") not in states:
            problem("defaults, state", f"'{defaults.get('state')}' is not in the states list")
        number(defaults.get("price"), "defaults, price", 0, 10000)
        if defaults.get("when") not in when_ids:
            problem("defaults, when", f"'{defaults.get('when')}' is not one of the ids under when")

    # appliances
    groups = doc.get("groups") or []
    seen = set()
    if not isinstance(groups, list) or not groups:
        problem("groups", "should list at least one group of appliances")
        groups = []
    for group in groups:
        if not only(group, {"title", "note", "appliances"}, "groups"):
            continue
        title = group.get("title")
        text(title, "groups, title")
        text(group.get("note"), f"groups, {title}, note")
        for item in group.get("appliances") or []:
            where = f"groups, {title}, {item.get('name') if isinstance(item, dict) else item}"
            if not only(item, {"id", "name", "watts", "qty", "hours", "selected"}, where):
                continue
            ident = item.get("id")
            if not isinstance(ident, str) or not re.fullmatch(r"[a-z0-9]+", ident or ""):
                problem(where, "needs an id made of small letters and digits only, like 'fan' or 'ac15'")
            elif ident in seen:
                problem(where, f"uses the id '{ident}', which another appliance already has")
            seen.add(ident)
            text(item.get("name"), where + ", name")
            number(item.get("watts"), where + ", watts", 1, 20000)
            if number(item.get("qty"), where + ", qty", 1, 50) and item["qty"] != int(item["qty"]):
                problem(where, "qty should be a whole number")
            if number(item.get("hours"), where + ", hours", 0.5, 24) and (item["hours"] * 2) != int(item["hours"] * 2):
                problem(where, "hours should be in steps of 0.5")
            if "selected" in item and not isinstance(item["selected"], bool):
                problem(where, "selected should be true or false")

    if problems:
        print("Nothing was built. Fix these in data/calculator.yaml and run the build again:\n")
        print("\n".join(problems))
        sys.exit(1)

    data = {
        "rules": {"inverterLoad": rules["inverter_load"], "batteryUse": rules["battery_use"],
                  "batteryLoss": rules["battery_loss"], "panelLosses": rules["panel_losses"],
                  "panelWatts": rules["panel_watts"], "daysInMonth": rules["days_in_month"]},
        "bands": [{"name": b["name"], "price": b["price"]} for b in bands],
        "when": [{"id": w["id"], "label": w["label"], "night": w["night"]} for w in when],
        "states": [[name, hours] for name, hours in states.items()],
        "groups": [{"title": g["title"], "note": g["note"],
                    "items": [{"id": a["id"], "name": a["name"], "w": a["watts"], "q": int(a["qty"]),
                               "h": a["hours"], "on": bool(a.get("selected", False))}
                              for a in g.get("appliances") or []]} for g in groups],
        "defaults": {"state": defaults["state"], "price": defaults["price"], "when": defaults["when"]},
        "sunNote": doc["sun_note"],
    }

    social = ""
    if site_url:
        title, tagline = html.escape(doc["title"], quote=True), html.escape(doc["tagline"], quote=True)
        social = "\n".join([
            f'<link rel="canonical" href="{site_url}/">',
            '<meta property="og:type" content="website">',
            f'<meta property="og:url" content="{site_url}/">',
            f'<meta property="og:title" content="{title}">',
            f'<meta property="og:description" content="{tagline}">',
            f'<meta property="og:image" content="{site_url}/og.png">',
            '<meta property="og:image:width" content="1200">',
            '<meta property="og:image:height" content="630">',
            '<meta name="twitter:card" content="summary_large_image">',
        ])

    page = TEMPLATE.read_text(encoding="utf-8")
    fills = {
        "__TITLE__": html.escape(doc["title"]),
        "__TAGLINE__": html.escape(doc["tagline"], quote=True),
        "__BAND_NOTE__": html.escape(doc["band_note"]),
        "__SOURCE_URL__": html.escape(source_url, quote=True),
        "__SOCIAL__": social,
        # "</" is escaped so text in the data can never close the script tag
        "__DATA__": json.dumps(data, ensure_ascii=False).replace("</", "<\\/"),
    }
    for token, value in fills.items():
        if token not in page:
            sys.exit(f"Nothing was built. template.html has lost its {token} marker.")
        page = page.replace(token, value)

    DIST.mkdir(exist_ok=True)
    (DIST / "index.html").write_text(page, encoding="utf-8")
    if (ROOT / "og.png").exists():
        shutil.copyfile(ROOT / "og.png", DIST / "og.png")

    count = sum(len(g["items"]) for g in data["groups"])
    print(f"Built dist/index.html: {count} appliances, {len(states)} states, {len(bands)} price bands.")
    if "provisional" in doc["sun_note"].lower():
        print("Note: the sun hours are still marked provisional.")
    if not site_url:
        print("Note: site_url is empty, so shared links will not show a preview card yet.")


if __name__ == "__main__":
    main()
