# DIY Solar Calculator

A one-page calculator for Nigerian homes. Tick the appliances you run and it shows what they use, what that costs on the grid, and what size of inverter, lithium battery and solar panels covers it.

It is a static page. There is no database, no login and no server code, and nothing a visitor enters leaves their browser.

## How it works out the sizes

| Part | Rule |
| --- | --- |
| Inverter | Add up the watts of everything ticked, as if all of it runs at once. Divide by 0.8 so the inverter runs at 80% of its rating or less. |
| Lithium battery | Take the energy used after sunset and divide by 0.8, so the battery never goes below 20%. |
| Solar panels | Daytime use, plus night use with 3% lost in the battery, divided by (sun hours x 0.75). The sun hours are for the lowest month of the year in your state, so the panels keep up all year. The 0.75 covers heat, dust, cable and inverter losses. Panels are counted at 550 W each. |

It is a safe estimate. Assuming everything runs at once makes the result slightly oversized, on purpose.

Every number in those rules is in `data/calculator.yaml`, and the page shows the full working under "See how it is worked out".

## What is in the repo

| File | What it is |
| --- | --- |
| `data/calculator.yaml` | Everything you might change: appliances, states and sun hours, price bands, sizing rules and wording |
| `template.html` | The page: layout, styles and the calculator's JavaScript |
| `build.py` | Checks the data and writes `dist/index.html` |
| `validate.py` | Runs every check before a change is merged |
| `tests/sums.test.js` | Hand-worked answers the sums are checked against |
| `.github/workflows/validate.yml` | Tells GitHub to run the checks on every pull request |
| `wrangler.jsonc` | Cloudflare Worker settings |
| `og.png` | The picture shown when a link to the site is shared |

`dist/` is built each time and is never committed.

## Run it on your computer

You need Python 3 and PyYAML.

```
pip install pyyaml
python3 build.py
```

Then open `dist/index.html` in a browser. No server is needed.

If something in the data is wrong, the build stops, says "Nothing was built", and lists each problem and where it is.

## Change something

Edit `data/calculator.yaml`, run `python3 build.py`, and reload the page.

- **Add an appliance:** add a line under the right group with an `id`, `name`, `watts`, `qty` and `hours`.
- **Change a price band:** edit `bands`.
- **Change a sizing rule:** edit `rules`. The explanation on the page updates itself.
- **Change a state's sun hours:** edit `states`. `low` is the lowest month and is what the sums use; `yearly` is shown for comparison.

Do not change an appliance's `id` once the site is live. Share links use the ids, so an old link would stop ticking that appliance.

## Checks before merging

`validate.py` checks a change before it goes live. GitHub runs it on every pull request, and you can run it yourself:

```
python3 validate.py
```

It needs Python 3 with PyYAML, and Node.js 18 or newer. It checks that:

- the data is valid and the page builds
- all 36 states and the FCT are listed
- the wording has no em dashes
- the built page is complete, with nothing left unfilled
- the page's JavaScript has no syntax errors
- the sums match answers worked out by hand (`tests/sums.test.js`)

If you change a sizing rule on purpose, the expected answers in `tests/sums.test.js` need working out again.

To stop a pull request being merged while the check is failing:

1. On GitHub, open the repo's **Settings**, then **Rules**, then **Rulesets**, and choose **New branch ruleset**.
2. Name it `main`, set **Enforcement status** to **Active**, and under **Target branches** add **Include default branch**.
3. Tick **Require a pull request before merging**.
4. Tick **Require status checks to pass**, click **Add checks**, and pick `validate`.
5. Click **Create**.

## Put it on Cloudflare

The site runs as a Cloudflare Worker that serves static files.

1. In Cloudflare, go to **Workers & Pages**, choose **Create**, then **Import a repository**, and pick this repo.
2. Use these settings:

| Setting | Value |
| --- | --- |
| Project name | `diysolarnigeria` |
| Build command | `pip install pyyaml && python build.py` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |

3. Deploy. Every push to `main` rebuilds and publishes the site. A push to any other branch builds a preview.
4. To use your own address, open the Worker, go to **Settings**, then **Domains & Routes**, and add a custom domain.
5. Once the site has an address, put it in `site_url` in `data/calculator.yaml` so shared links show a preview card.

## Where the numbers come from

- **Price bands:** home (non-MD) rates for Abuja Electric from [NERC order ORDER/NERC/2025/059](https://nerc.gov.ng/wp-content/uploads/2025/08/AEDC_July_2025_059.pdf), effective 1 July 2025. Other DisCos differ a little in Bands B to D.
- **Sun hours:** from [NASA POWER](https://power.larc.nasa.gov), the long-term average of sunlight on a flat surface at each state capital (parameter `ALLSKY_SFC_SW_DWN`), rounded to one decimal. The calculator sizes panels for the lowest month of the year, which is August in most states, and shows the yearly average beside it.
- **Appliance watts:** typical figures. Check the label on your own appliance.

## License

Copyright (C) 2026 bigbrovar.

This program is free software: you can redistribute it and modify it under the terms of the GNU General Public License, version 3, as published by the Free Software Foundation. It comes with no warranty. See `LICENSE` for the full text.

In short: you may use, copy and change it, but if you share your version, you must share its source under the same licence.
