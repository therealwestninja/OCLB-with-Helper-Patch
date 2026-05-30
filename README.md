# OCLB with Helper

A DeviantArt userscript that adds **Give Llama** and **Give Cake** buttons next to every deviant and group. Click once and it gives the badge for you — no page reloads, no pop-ups. It also adds a floating **bulk panel** that can give to everyone on the current page in one click.

This is a fork of Kishan Bagaria's [One Click Llama Button](https://github.com/KishanBagaria/OCLB) that merges in a rewritten bulk-give helper (originally *OCLB Helper* by HampshireBrony) and folds in Cake badge support (from Liamb135's *One Click Cake Button*) through a single shared give-pipeline.

## Features

- One-click **Llama** and **Cake** giving next to every username, group, and badge link
- Clear button states: ready, giving, given, already gave, "enough for love", 100k club, spam-throttled, and error (click to retry)
- **Bulk panel** — a floating button in the corner that gives to everyone on the page, one at a time
- Live counter of how many badges you can still give on the page, with a full breakdown on hover
- Automatically backs off when DeviantArt's spam filter trips (and turns red to tell you)
- One button per deviant per page, attached to their name (not their avatar), so content-heavy profiles and galleries stay tidy
- Remembers who you've already given to and syncs button states across your open tabs
- No external dependencies (no jQuery); works on both classic and Eclipse DeviantArt

## Install

1. Install a userscript manager — [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Edge, Safari) or [Violentmonkey](https://violentmonkey.github.io/) / [Greasemonkey](https://www.greasespot.net/) (Firefox).
2. Open **[OCLB-wHelper.user.js](https://github.com/therealwestninja/OCLB-with-Helper-Patch/raw/refs/heads/main/OCLB-wHelper.user.js)** and confirm the install.
3. Browse DeviantArt — the buttons appear automatically.

## Using the bulk panel

A small panel sits in the bottom-right corner of any DeviantArt page:

- The number on it is how many badges you can still give on the page.
- Hover it for a breakdown (to give, given, already, loading, enough, spam, errors).
- Click it to start giving to everyone, one at a time. Click again to stop.
- The border turns **gold** while running and **red** if the spam filter trips — it stops on its own when that happens.

It's most useful on members / watchers / watching lists where you want to give to a whole page at once. When Cake is enabled, the bulk run gives **both** badges to each deviant, so it counts and clicks llama and cake buttons together.

> **Note:** the cross-page "continue to next page" feature targets classic DeviantArt's member-list pagination. On the modern Eclipse layout the run finishes the current page rather than walking pages.

## Llama vs. Cake

Both badges share the same code path — the same CSRF handling, username scanning, status polling, and spam/error logic — so they behave identically; only the endpoint and icon differ. Cake buttons are shown by default. To turn Cake off, set the `addCake` value to `false` in your userscript manager's storage for this script (Tampermonkey → the script → *Storage* tab).

## Preferences

The original hosted [preferences page](https://kishanbagaria.com/userscripts/one-click-llama-button/preferences/) controls:

- Where buttons show (everywhere, profile only, notifications, etc.)
- Button position (before or after the name)
- Whether to add buttons for groups
- Button animation on or off

## How it works

The script injects a small `<span>` button next to each username link. Clicking it sends a give request using your DeviantArt session and CSRF token, then updates the button to reflect the result. Llama and Cake are two configurations of one shared pipeline. The bulk panel simply clicks those buttons for you on a timer, so it reuses the exact same flow — and the same safety handling — as a manual click.

To keep busy pages readable, a deviant only ever gets one button of each type per page even when their name is repeated dozens of times (gallery bylines, avatars, module headers), and buttons are never attached to avatar-only links.

## Changelog

- **2.3** — Code hygiene pass. Removed all dead code left behind by earlier refactors: the `iframe` parameter in `processGiven` (the classic give path that needed it is long gone), per-deviant `devIDs` state and the devID argument threading through callbacks (nothing set it), per-deviant `storageKey` on each badge (nothing wrote to it), the `total` field from `countByState` (never read), and a dead write to GM storage for the CSRF token. Fixed two latent bugs: `localStorage.clear()` on any storage error (destructive — now just returns null), and `setting()` using `if (value)` as the write guard (wrong for falsy values — now `if (value !== undefined)`). Dropped `@grant unsafeWindow` (unused). Replaced the disruptive `alert()` in the error handler with `console.error`.
- **2.2** — Hardened give-response detection based on HAR data. `badges/give` returns `{"success":true}` on success; added `response.success !== false` to `bodyOk` so a hypothetical `{"success":false}` can't slip through the error-field checks and be misread as a successful give.
- **2.1** — Corrected the Llama give endpoint based on what DeviantArt's own UI actually does.
- **2.0** — Switched Llama giving to DeviantArt's newer `_napi/shared_api/give_llama` endpoint, with the older `_puppy/dashared/give_llama` kept as an automatic fallback. *(Superseded by 2.1 — see above.)*
- **1.9** — Stripped to essentials for modern DeviantArt. Removed the defunct classic-site machinery (the cross-domain "exchanger" iframe, the `/modal/badge/` give and trade flows, the external preferences page, and the cross-window message listener), since modern Eclipse gives go straight through a direct request. The result is a leaner, single-path script (~180 fewer lines) that does exactly what's needed on today's DeviantArt and nothing else.
- **1.8** — Performance and bulk-giving overhaul. Status lookups are now lazy: a button only checks the server once it scrolls near the viewport, turning a ~100-request burst on busy profiles into a handful (a bulk run still resolves the whole page up front). The bulk run now gives all Llamas before Cakes, and treats each badge's rate limit independently — a Cake limit no longer halts Llama giving.
- **1.7** — Give requests are now judged by HTTP status, not just the response text: a rejected give (such as Cake's 400 rate-limit reply) reliably trips the spam/stop state so a bulk run halts instead of hammering the limiter, and a dropped connection now resolves to an error instead of hanging.
- **1.6** — Hardening and cleanup pass: the server-response check no longer chokes on non-text error fields (found via fuzz testing), plus tidied comments and removed redundancy.
- **1.5** — Hardened against DeviantArt's React re-renders: all injected elements (button/panel styles and the bulk panel) now re-attach themselves through one shared mechanism, so the panel can't end up attached-but-invisible. Cake buttons now show Cake tooltips instead of Llama ones.
- **1.4** — Fixed the bulk panel not appearing in Chrome: DeviantArt's React hydration was wiping it, so the panel now re-attaches itself if removed. The message listener no longer throws on DeviantArt's own (object-valued) page messages.
- **1.3** — Fixed the bulk panel looping forever on Cake (which, unlike Llamas, can be given repeatedly): each button is now given at most once per run. The Llama and Cake buttons for a deviant now share a single status request instead of polling twice.
- **1.2** — One button per deviant per page; buttons no longer attach to avatar-only links (fixes profile pages sprouting dozens of duplicate buttons). More robust `userinfo` cookie parsing.
- **1.1** — Added Cake badge support through the shared give-pipeline; bulk panel now counts and gives both badges.
- **1.0** — Merged the bulk-give helper panel into One Click Llama Button; dropped the jQuery dependency.

## Credits

- **Kishan Bagaria** — original One Click Llama Button ([kishanbagaria.com](https://kishanbagaria.com))
- **Bulk panel** — based on *OCLB Helper* by HampshireBrony, merged and rewritten
- **Cake support** — based on *One Click Cake Button* by [Liamb135](https://www.deviantart.com/liamb135)
- **More credits**: Noushad Bhuiyan, LlanellaWhatCake, Chipster-roo, AgnosticDragon
- **This fork** — [therealwestninja](https://github.com/therealwestninja)

## License

[MIT](LICENSE.txt)
