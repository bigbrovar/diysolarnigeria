# DIY Solar Calculator

A one-page calculator for Nigerian homes. Tick the appliances you run and it shows what they use, what that costs on the grid, and what size of inverter, lithium battery and solar panels covers it.

It is a static page. There is no database, no login and no server code, and nothing a visitor enters leaves their browser.

## How it works out the sizes

| Part | Rule |
| --- | --- |
| Inverter | Add up the watts of everything ticked, as if all of it runs at once. Divide by 0.8 so the inverter runs at 80% of its rating or less. |
| Lithium battery | Take the energy used after sunset and divide by 0.8, so the battery never goes below 20%. |
| Solar panels | Daytime use, plus night use with 3% lost in the battery, divided by (sun hours x 0.75). The 0.75 covers heat, dust, cable and inverter losses. Panels are counted at 550 W each. |

It is a safe estimate. Assuming everything runs at once makes the result slightly oversized, on purpose.

Every number in those rules is in `data/calculator.yaml`, and the page shows the full working under "See how it is worked out".

## What is in the repo

| File | What it is |
| --- | --- |
| `data/calculator.yaml` | Everything you might change: appliances, states and sun hours, price bands, sizing rules and wording |
| `template.html` | The page: layout, styles and the calculator's JavaScript |
| `build.py` | Checks the data and writes `dist/index.html` |
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
- **Change a state's sun hours:** edit `states`.

Do not change an appliance's `id` once the site is live. Share links use the ids, so an old link would stop ticking that appliance.

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
- **Sun hours:** provisional estimates by region. They still need replacing with figures from a published source, and the page labels them as provisional until then.
- **Appliance watts:** typical figures. Check the label on your own appliance.

## License

Copyright (C) 2026 bigbrovar.

This program is free software: you can redistribute it and modify it under the terms of the GNU General Public License, version 3, as published by the Free Software Foundation. It comes with no warranty. See `LICENSE` for the full text.

In short: you may use, copy and change it, but if you share your version, you must share its source under the same licence.
