#!/usr/bin/env python3
# Copyright (C) 2026 bigbrovar. Licensed under the GNU General Public License, version 3. See LICENSE.
"""Check the calculator before a change is merged.

    python3 validate.py

It runs every check and prints a tick or a cross for each one. It finishes with
"All checks passed", or lists what failed and exits with an error, which is what
makes the GitHub check go red.

Needs Python 3 with PyYAML, and Node.js 18 or newer for the two checks that run
the page's JavaScript.
"""
import json
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

try:
    import yaml
except ImportError:
    sys.exit("PyYAML is missing. Install it with: pip install pyyaml")

ROOT = pathlib.Path(__file__).resolve().parent
PAGE = ROOT / "dist" / "index.html"

# The 36 states and the FCT. A typo or a missing state fails the check.
STATES = {
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
    "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT, Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
    "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
    "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
}

failed = []


def check(name, problems):
    """Print one line for a check. `problems` is a list of what went wrong."""
    if problems:
        print(f"  ✗ {name}")
        for line in problems:
            print(f"      {line}")
        failed.append(name)
    else:
        print(f"  ✓ {name}")


def run(command):
    done = subprocess.run(command, cwd=ROOT, capture_output=True, text=True)
    return done.returncode, (done.stdout + done.stderr).strip()


def last_lines(output, count=25):
    return output.splitlines()[-count:]


def build():
    code, output = run([sys.executable, "build.py"])
    check("The data is valid and the page builds", last_lines(output) if code else [])
    return code == 0


def states():
    doc = yaml.safe_load((ROOT / "data" / "calculator.yaml").read_text(encoding="utf-8"))
    listed = set((doc.get("states") or {}).keys())
    problems = [f"missing: {name}" for name in sorted(STATES - listed)]
    problems += [f"not a Nigerian state, or misspelt: {name}" for name in sorted(listed - STATES)]
    check("All 36 states and the FCT are listed", problems)


def page():
    text = PAGE.read_text(encoding="utf-8")
    problems = []
    if not text.lower().startswith("<!doctype html>"):
        problems.append("the page does not start with <!doctype html>")
    if '<meta charset="utf-8">' not in text:
        problems.append('the page has lost <meta charset="utf-8">, so ₦ would show as garbled text')
    if 'name="viewport"' not in text:
        problems.append("the page has lost its viewport line, so it would not fit a phone screen")
    leftover = sorted(set(re.findall(r"__[A-Z_]+__", text)))
    if leftover:
        problems.append("placeholders were left unfilled: " + ", ".join(leftover))
    for word in ("undefined", "NaN"):
        if re.search(rf">\s*{word}\s*<", text):
            problems.append(f'the page shows the word "{word}"')
    data = re.search(r"^const D=(\{.*\});$", text, re.M)
    if not data:
        problems.append("the page's data block is missing")
    else:
        try:
            json.loads(data.group(1).replace("<\\/", "</"))
        except ValueError as error:
            problems.append(f"the page's data block is not valid: {error}")
    check("The built page is complete", problems)


def wording():
    problems = []
    for name in ("README.md", "template.html", "data/calculator.yaml"):
        for number, line in enumerate((ROOT / name).read_text(encoding="utf-8").splitlines(), 1):
            if "—" in line:
                problems.append(f"{name}, line {number}: has an em dash. Use a comma, a colon or a shorter sentence")
    check("No em dashes in the wording", problems)


def script():
    node = shutil.which("node")
    if not node:
        check("The page's JavaScript has no syntax errors", ["Node.js is not installed, so this could not be checked"])
        check("The sums match answers worked out by hand", ["Node.js is not installed, so this could not be checked"])
        return
    blocks = re.findall(r"<script>(.*?)</script>", PAGE.read_text(encoding="utf-8"), re.S)
    with tempfile.TemporaryDirectory() as folder:
        target = pathlib.Path(folder) / "page.js"
        target.write_text("\n".join(blocks), encoding="utf-8")
        code, output = run([node, "--check", str(target)])
    check("The page's JavaScript has no syntax errors", last_lines(output, 12) if code else [])
    tests = sorted(str(path.relative_to(ROOT)) for path in (ROOT / "tests").glob("*.test.js"))
    code, output = run([node, "--test", *tests])
    wrong = [line for line in output.splitlines() if line.lstrip().startswith(("✖", "not ok")) or "expected" in line]
    check("The sums match answers worked out by hand", (wrong or last_lines(output, 15)) if code else [])


def main():
    print("Checking the DIY Solar Calculator\n")
    built = build()
    states()
    wording()
    if built:
        page()
        script()
    else:
        print("  - The remaining checks were skipped because the page did not build.")
    if failed:
        print(f"\n{len(failed)} check{'s' if len(failed) > 1 else ''} failed. Fix the lines marked ✗ and run this again.")
        sys.exit(1)
    print("\nAll checks passed.")


if __name__ == "__main__":
    main()
