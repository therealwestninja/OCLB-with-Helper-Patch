# One Click Llama Button (OCLB) with Helper Patch

A userscript that adds a **Give Llama** button next to every deviant and group on DeviantArt. Click it once and it gives that deviant a llama for you — no page reloads, no pop-ups. As of v6.2.0 it also includes a bulk panel that can llama everyone on the current page in one click.

## Features

- One-click llama giving next to every username, group, and badge link
- Clear button states: ready, giving, given, already gave, "enough for love", 100k club, spam-throttled, and error (click to retry)
- **Bulk panel** — a floating llama in the corner that gives a llama to everyone on the page, one at a time
- Live counter of how many llamas you can still give on the page, with a full breakdown on hover
- Automatically backs off when DeviantArt's spam filter kicks in
- Remembers who you've already llamaed and syncs button states across your open tabs
- No external dependencies (no jQuery); works on both classic and Eclipse DeviantArt

## Install

1. Install a userscript manager — [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Edge, Safari) or [Violentmonkey](https://violentmonkey.github.io/) / [Greasemonkey](https://www.greasespot.net/) (Firefox).
2. Open **[OCLB.user.js](https://raw.githubusercontent.com/KishanBagaria/OCLB/master/OCLB.user.js)** and confirm the install.
3. Browse DeviantArt — llama buttons appear automatically.

## Using the bulk panel

A small llama panel sits in the bottom-right corner of any DeviantArt page:

- The number on it is how many llamas you can still give on the page.
- Hover it for a breakdown (to give, given, already, loading, enough, spam, errors).
- Click it to start giving to everyone, one at a time. Click again to stop.
- The border turns **gold** while it's running and **red** if DeviantArt's spam filter trips — it stops on its own when that happens.

It's most useful on members / watchers / watching lists where you want to llama a whole page at once.

## Preferences

Open the [preferences page](https://kishanbagaria.com/userscripts/one-click-llama-button/preferences/) to control:

- Where buttons show (everywhere, profile only, notifications, etc.)
- Button position (before or after the name)
- Whether to add buttons for groups
- Button animation on or off

## How it works

OCLB injects a small `<span>` button next to each username link. Clicking it sends a give-llama request using your DeviantArt session and CSRF token, then updates the button to reflect the result. The bulk panel simply clicks those buttons for you on a timer, so it reuses the exact same flow — and the same safety handling — as a manual click.

## Credits

- **Kishan Bagaria** — original author ([kishanbagaria.com](https://kishanbagaria.com))
- **More credits**: Noushad Bhuiyan, LlanellaWhatCake, Liamb135, Chipster-roo, AgnosticDragon
- Bulk panel: based on *OCLB Helper* by HampshireBrony, merged and rewritten

## License

[MIT](LICENSE.txt)
