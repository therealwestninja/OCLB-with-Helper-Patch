// ==UserScript==
// @name            OCLB with Helper
// @namespace       http://www.door2windows.com/
// @description     Adds give Llama and Cake buttons after the names of every deviant and group, plus a bulk "give to everyone on this page" panel.
// @author          therealwestninja | https://github.com/therealwestninja | https://www.deviantart.com/west-ninja
// @author          Kishan Bagaria | kishanbagaria.com | https://www.deviantart.com/kishan-bagaria
// @version         1.2
// @icon            https://kishanbagaria.com/-/oclb.png
// @match           *://*.deviantart.com/*
// @match           *://*.sta.sh/*
// @match           *://kishanbagaria.com/userscripts/one-click-llama-button/*
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           unsafeWindow
// @run-at          document-end
// @downloadURL     https://github.com/therealwestninja/OCLB-with-Helper-Patch/raw/refs/heads/main/OCLB-wHelper.user.js
// @updateURL       https://github.com/therealwestninja/OCLB-with-Helper-Patch/raw/refs/heads/main/OCLB-wHelper.user.js
// ==/UserScript==

// Additional Credits:
// Code Update      Noushad Bhuiyan | https://www.fiverr.com/web_coder_nsd | https://www.deviantart.com/noushadbug
// Code Update      LlanellaWhatCake | https://www.deviantart.com/llanellawhatcake
// Code Update      Liamb135 | https://www.deviantart.com/liamb135
// Troubleshooter   Chipster-roo | https://www.deviantart.com/chipster-roo
// 100kllamas       AgnosticDragon | https://www.deviantart.com/agnosticdragon | https://www.deviantart.com/100kllamas
// Bulk panel       Based on "OCLB Helper" by HampshireBrony | http://hampshirebrony.neocities.org (merged & rewritten)
// Cake support      Based on "One Click Cake Button" by Liamb135 | https://www.deviantart.com/liamb135 (integrated into the shared pipeline)

try {
    gmSet = GM_setValue;
    gmGet = GM_getValue;
} catch (e) {
    console.error(e);
}

function addJS(source) {
    const s = document.createElement('script');
    s.textContent = '(' + source + ')();';
    document.body.appendChild(s).remove();
}

addJS(function() {
    const VERSION = '1.2';

    const IMG = {
        ALREADY: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAmElEQVR4Aa2OxUHFQBCGvxXctQl62jbCBS0lR/qhBC7x5MXXcCrgH/cR8eVme3rTz1FKg7P4zZwesXMvHl9XAP1ZVCcHidzZJowz0cekLVqAWwCJVEbubqOO92FLgxQIrQw/0NGt+GEmWkeYlg/rCc7zC/l501YdtmjxTY/vR+K0pH8bPh9q6w1OCIP3H0Wbnl1c30PO/+AdWxpL8w9v1MsAAAAASUVORK5CYII=',
        SPAM: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAVCAMAAACE9bUqAAAAe1BMVEUAMmb0zTM4DRCcX0HOt4ifSyxmAADMmWZlOCSojjDMiGGPPSFlAADVs5vElXfUp6oAAC5KR0NPNTyeSi6fgHYgH0+dX0Cbg4AAMWaZZmara2a4dG4/QFLHik9jCQ13Tkw6KUUAADMILVRLEhbMj22KSSgsDg0tR2YAKmIz6elIAAAAj0lEQVR4AX3LBRrDMAxDYSdlGDMz3P+Es6tF4/1lva+S/SL/OeeaS+y014JFOKJIgE9cOAhfXB3GafPLR4HuKI7jdqkStdnuBPa9WB0RBonpo1xihZ1QXgMMURAiM45gci8rfAaz+WIppqZ1bdJUbwz4JpQWUAWh5MHB+xMLdk9nb7TkgBU6SsuVO2eU7JcbjM8Lv+nDU0gAAAAASUVORK5CYII=',
        ENOUGH: 'data:image/gif;base64,R0lGODlhDwASAPQYALAUFHNzc97KzIeHh8K2qu3t7fn5+cgmJuXl5WNjY+95eXh4ePr6+rscHKsPDz09PexiYvOenjc3Nzs7O+7u7s/PzwAAAPTt5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUAABgALAAAAAAPABIAAAV4ICaOYxBgJqkGhcC64oHJJcIgJ9YoQESjE8Qj14AoFL+A4MHIYRyQH4pwcz5XFwJOtSIICgPuYDwIeMGqgWFtCFwEl4tT/Za/4WjRoB7vX/J6dXBxFFYYA3CJcYAjEgQVBAQJkRZcFgmXlZmWCxadGJ6VlhakoKUhADs=',
        ERROR: 'data:image/gif;base64,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',
        GIVE: 'data:image/gif;base64,R0lGODlhDwASAPQaAO6oQy4kHAAAAJRPC0onDfbhbl0yEO+pQtGBKdGMJcJaKpVgLrFtJ+qwNFkrFuqpJvjGROOKJFUyEmNjPNWUNOzJYnx8Sl0xDXFFLnV1Pv///wAAAAAAAAAAAAAAAAAAACH5BAUAABoALAAAAAAPABIAQAWJoKYFgiCKhKGl5ym9EjEgh9qOWWAF466VgUKAhIIYCoSbZKFgLhYJgGoYFAxRjUIjKQK2CIzBgSuSVCKICBiBSNRuAQfGMQgMHLyu8EQ4UPp/AgWDgyYrFw0GZEF5KAMFEGQ3jjQ2LhWYFWsJD2QDTk9PCW4DLQNNqAsPB6VwEwGvI7GTVDxUGiEAOw==',
        GIVING: 'data:image/gif;base64,R0lGODlhEgASAPQLAAYEASAVBvzJAPnsAvz3rqpkAO3Sfv374MuPSvvuJvzxTPnth/+oAf7+/vvxS55hAO3Fb/vJAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgALACwAAAAAEgASAEAFZuAijmIALMBJrigQIIcSBOwIMICQ6jUbCAeDgdYDJARHgUKAIPYWv4PA+YQCZU9AYysYKL7TZ6AwBpBVYmAuXLXKqOlvs22NwVdrQVcxLCb1Ag4KCGh4SIcEPEUPZikFhTUpkikrIQAh+QQJCgASACwDAAAADAASAAAFYaAkjkAglSN5CICwmOm5HkAslkdQ20Bu7DFAwVCABQ9DYKqnMBgBUN1BAYEBIoIsYNAkQAWN8FZBFugaiazaoWCdBOm0QIGwxuECgvsWKBaEOiQPQjWEJAwthXs3UIVQEiEAIfkECQoADAAsBAAAAAsAEgAABVwgIzIAEJDnCCiHAAhLKq7tAYxzcOg3vgYGQ09VMBRlM0VRiCOxFAZZKfCEpF4uxQBKKDUaq61CIQgAEoJ02kEunQVogQJxhdsJrlwhUADshyV9gYAvbnkzbokMIQAh+QQJCgAMACwFAAAACgASAAAFViDDAGQwmqOiHAIgLCigsgcgnkcgBHYaGEDUqGAgKoRD4PGWWi1FpNnTJVMMDAhTITpQGJYFgVj8NQESArRAkR2l34SWKFCgA+q3QCDbzuv+TAx6gzchACH5BAkKAAwALAMAAAAMABIAAAViIMMEwAiUohgsAiAcCpoCxxun8xHAsggYQMVtVjAUhIceA1A0KJI4lfMAjQYgTwVJBiA4BzFBSyUQKsCARqPkUjjE8AQqgFCIEwI5ykXI+7kBBUyBJEQnTCc4LoctPYePKCEAIfkECQoAEgAsAwAAAAwAEgAABWCgFAAiKZ1nsAiAcJioBBwuHAOGodgobrwxVEC3C55wCqBxmOSlIM0RwAQg6AaCrCBCCggUYGxjzGopHNpsotFFKNSCBOsoIMTvCWqgACjsRz18MnwPMC0khwyGUzJTMCEAIfkECQoACwAsAwAAAAsAEgAABVbgsgDAGIhoIAjAIZzoorpwHBjKG4s3vcuKXC2l8O0CRZ0NeQAESCncYLUqqYKKaWNLEigc1FXCisgJEufSSEA4u9XOAqAQoMfmJPlDve4CGHwkglALIQAh+QQFCgAMACwEAAAACgASAAAFViATACJgMuIiAMKhKCQDHO0by4HwwmgfvAaeL2go3ESG5FF0UPZECpdhhQogDIOXgPoLDg60AnS63Yqtim1CkCCxCOx4LGAs0ANPqx7vE+QCfFWAgCghADs=',
        SUCCESS: 'data:image/gif;base64,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',
        UNKNOWN: 'data:image/gif;base64,R0lGODlhDAASAPABAJOpjwAAACH5BAUAAAEALAAAAAAMABIAAAImjA8QeWi62nNyKVZvzFTC7XXJSH2g1Zho5aglC44yFmnaZJ+ypRQAOw==',
        TOKEN_MISS: 'data:image/gif;base64,R0lGODlhDAASAPABAJOpjwAAACH5BAUAAAEALAAAAAAMABIAAAImjA8QeWi62nNyKVZvzFTC7XXJSH2g1Zho5aglC44yFmnaZJ+ypRQAOw==',
        CAKE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAAsTAAALEwEAmpwYAAACB0lEQVQ4jZ2SvU9TYRSHn/e2t/QDSqoGlosuJXa6TBJ2/wMTIgziZkJMUBdjU0ycNHYyJH6wslgYmujg5ubg4kAHJYEm8jGgCdpAb7W2vcfh9r60QG+Nv+QmJ+fjec895yAiiAh22hJAAPF9//MdGyC17QWx01ZP4OGrK30fMybGx2RifEzstAVAaWsP30eHjpYnJWpf4Gh5sst/UuHS1h617QXt8O34paVTySoTh1IQDsJ+sZ22+Pj+GlNXi6eSZm6MyNS5BBuf7pD5vMjdIKCIKIDOX1zf3FWdsHz+Ma4Lt4rveHA/x+zcqM59vfJNdQJVeyEopQTATlsa6MPKuwUMJdx8dpm13A6ppKUBD7NFlFIaroEnNTs3KvmnS3z5+gIAM2RiKCGWiDEQNaFdNxi9qGsWs6v0BN6esWX63hB/3DDlzSoAw0MJwmYoYILtpfSSYSj2dw6Zv/4EgJ+VGqmk6QVDCQDcxg8Aqo5DYe1NMLBLzTKpQcCF/e9VRs4bGKE4tGoA1J2K10QQIzJwdlgpPNgZ6tmhoRSq5dkvV3P9+qde/UWcTG+gK0Ik5i1gfvoRrlvviovbRBnH5f80w0bTbbdrQmND+5uN39qORLxH644D9NlyzWlq++CgwnAy6hWZUT1Dt70UX33PBmDlbTYoTWv9Q6v3YYN33OAtyA3I8/W8UFJ/ASNLIgCpZsHzAAAAAElFTkSuQmCC'
    };

    const STYLE =
        'span.oclb        {display:inline-block;pointer-events:all;image-rendering:pixelated;width:18px;height:18px;vertical-align:middle;margin:0 3px;cursor:default;transition:.3s all}' +
        'span.oclb-give   {background:url(' + IMG.GIVE + ')    center no-repeat;cursor:pointer}' +
        'span.oclb-giving {background:url(' + IMG.GIVING + ')  center no-repeat;cursor:progress}' +
        'span.oclb-already{background:url(' + IMG.ALREADY + ') center no-repeat;margin:0}' +
        'span.oclb-success{background:url(' + IMG.SUCCESS + ') center no-repeat;width:26px}' +
        'span.oclb-error  {background:url(' + IMG.ERROR + ')   center no-repeat;cursor:pointer}' +
        'span.oclb-token_miss  {background:url(' + IMG.TOKEN_MISS + ')   center no-repeat;cursor:pointer}' +
        'span.oclb-spam   {background:url(' + IMG.SPAM + ')    center no-repeat;cursor:pointer;width:25px}' +
        'span.oclb-unknown{background:url(' + IMG.UNKNOWN + ') center no-repeat;cursor:help}' +
        'span.oclb-enough {background:url(' + IMG.ENOUGH + ') center no-repeat}' +
        'span.oclb-100k   {width:28px}' +
        'span.oclb-100k:after{color:#f6e16e;background:#4A270D;content:"100k";font:10px/17px Trebuchet MS;text-align:center;letter-spacing:0;vertical-align:top;border-radius:4px;padding:0 3px;display:block}' +
        // Cake buttons reuse every Llama status icon; only the "give" affordance differs.
        'span.occb        {display:inline-block;pointer-events:all;image-rendering:pixelated;width:18px;height:18px;vertical-align:middle;margin:0 3px;cursor:default;transition:.3s all}' +
        'span.occb-give   {background:url(' + IMG.CAKE + ')    center no-repeat;background-size:contain;cursor:pointer}' +
        'span.occb-giving {background:url(' + IMG.GIVING + ')  center no-repeat;cursor:progress}' +
        'span.occb-already{background:url(' + IMG.ALREADY + ') center no-repeat;margin:0}' +
        'span.occb-success{background:url(' + IMG.SUCCESS + ') center no-repeat;width:26px}' +
        'span.occb-error  {background:url(' + IMG.ERROR + ')   center no-repeat;cursor:pointer}' +
        'span.occb-token_miss{background:url(' + IMG.TOKEN_MISS + ') center no-repeat;cursor:pointer}' +
        'span.occb-spam   {background:url(' + IMG.SPAM + ')    center no-repeat;cursor:pointer;width:25px}' +
        'span.occb-unknown{background:url(' + IMG.UNKNOWN + ') center no-repeat;cursor:help}' +
        'span.occb-enough {background:url(' + IMG.ENOUGH + ') center no-repeat}';

    const CSS = STYLE;
    const NO_TRANSITION_STYLE = 'span.oclb,span.occb{transition:none}';
    const UNKNOWN_TITLE = 'This deviant\'s Llama status is a mystery!';
    const TOKEN_MISSING_TITLE = 'CSRF token not found. Please clear site data and try again.';

    const TITLES = {
        give: 'Give a Llama',
        giving: 'Giving Llama...',
        already: 'Already gave a Llama',
        success: 'Llama given successfully!',
        enough: 'Has Llamas enough for love',
        spam: 'You\'re giving Llamas too quickly!',
        error: 'Error giving Llama. Click to retry.',
        '100k': 'This Deviant has received 100,000 Llamas!',
        token_miss: TOKEN_MISSING_TITLE,
        unknown: {
            loading: UNKNOWN_TITLE + ' (Loading...)',
            err_network: UNKNOWN_TITLE + ' (Network error)',
            err_dev_id: UNKNOWN_TITLE + ' (Invalid response, unable to find deviant ID)',
            err_server_response: UNKNOWN_TITLE + ' (Llama status error: Invalid server response)'
        }
    };

    const HAS_100K_LLAMAS = [
        'aenea-jones', 'agnosticdragon', 'alitn', 'anpcreations', 'autumniv',
        'beckykidus', 'canonics', 'championx91', 'chateaugrief', 'cheriibat',
        'coccineus', 'damaimikaz', 'darksena', 'derfeldwebel', 'epicsaveroom',
        'eve-jennifer', 'eviejulia', 'evuie', 'finakiyomo', 'fizzypinkbubbles',
        'gh0std0lls', 'hyliabeilschmidt', 'iamsorry87', 'internetwaifu', 'ioulaum',
        'kalmakamala', 'koiransielu', 'liamb135', 'leonorachris', 'lombarsi',
        'luke-crowe', 'metorou-de', 'naiuou', 'natures-studio', 'neekothefox2',
        'nekodawnlight', 'niotabunny', 'noire-ighaan', 'novakaru', 'raadollistunut',
        'seasidehill', 'savagefrog', 'senzune', 'seviyummy', 'shintaurashura',
        'shinigamiookamiryuu', 'spook-a-palooza', 'strawberriesinhell', 'thegalleryofeve',
        'timing2', 'toby512', 'tree-pencil', 'unexpectedtoy', 'unibat',
        'unreal-forever', 'vibrant-snow', 'vibrantsnow', 'wytherwing',
        'zestylimey', 'zjeroxytz'
    ];

    const DEFAULTS = {
        showIn: '*',
        showPos: 'after',
        addForGroups: 'true',
        animation: 'true',
        addCake: 'true'
    };

    const xhrCallbacks = {};
    let xdCommunicator;
    let bulkUI = null;

    let csrfTokenCache = null;
    let csrfTokenCacheTime = 0;
    const CSRF_CACHE_DURATION = 30 * 60 * 1000;

    try {
        const addCSS = css => {
            document.head.appendChild(document.createElement('style')).textContent = css;
        };

        const isLSSupported = (() => {
            const mod = 'ls-supported';
            try {
                window.localStorage.setItem(mod, mod);
                window.localStorage.removeItem(mod);
                return true;
            } catch (e) {
                return false;
            }
        })();

        const storage = (action, key, value) => {
            if (!isLSSupported) return;
            try {
                return window.localStorage[action + 'Item'](key, value);
            } catch (er) {
                window.localStorage.clear();
            }
        };

        const setting = (key, value) => {
            if (value) {
                if (typeof gmSet !== 'undefined') gmSet(key, value);
            } else {
                if (typeof gmGet !== 'undefined' && gmGet(key)) return gmGet(key);
                return DEFAULTS[key];
            }
        };

        const getToken = doc => {
            let token = null;

            const scripts = doc.scripts;
            if (scripts) {
                for (const current of scripts) {
                    if (current.innerHTML && current.innerHTML.includes('window.__CSRF_TOKEN__')) {
                        const htmlChunks = current.innerHTML.split('window.__CSRF_TOKEN__');
                        const splitForToken = htmlChunks[1].split(/'/);
                        token = splitForToken[1];
                        if (token) break;
                    }
                }
            }

            if (!token) {
                try {
                    const logoutForm = doc.querySelector("#logout-form input[type='hidden']");
                    if (logoutForm) token = logoutForm.value;
                } catch (e) {}
            }

            if (!token) {
                try {
                    const metaToken = doc.querySelector('meta[name="csrf-token"]');
                    if (metaToken) token = metaToken.getAttribute('content');
                } catch (e) {}
            }

            return token;
        };

        // Read the logged-in deviant from the `userinfo` cookie, handling both the
        // legacy ';'-delimited and modern '__{json}' forms. Never throws.
        const parseUserinfoCookie = () => {
            const entry = document.cookie.split(';').find(c => c.trim().indexOf('userinfo=') === 0);
            if (!entry) return null;
            try {
                const decoded = decodeURIComponent(entry.trim().slice('userinfo='.length));
                const jsonStart = decoded.indexOf('{');
                if (jsonStart === -1) return null;
                const username = JSON.parse(decoded.slice(jsonStart)).username;
                return username ? username.toLowerCase() : null;
            } catch (e) {
                return null;
            }
        };

        const getLoggedInDeviantName = () => {
            if (window.deviantART && window.deviantART.deviant) {
                const u = window.deviantART.deviant.username;
                if (u) return u.toLowerCase();
            }
            const eclipseElement = document.querySelector('header a[data-username]');
            if (eclipseElement) {
                return eclipseElement.getAttribute('data-username').toLowerCase();
            }
            return parseUserinfoCookie();
        };

        const waitForLoggedInDevName = (timeoutMs = 5000) => {
            return new Promise(resolve => {
                const intervalMs = 100;
                let elapsed = 0;

                const check = () => {
                    const u = getLoggedInDeviantName();
                    if (u) {
                        resolve(u);
                    } else if (elapsed >= timeoutMs) {
                        resolve(null);
                    } else {
                        elapsed += intervalMs;
                        setTimeout(check, intervalMs);
                    }
                };

                check();
            });
        };

        let loggedInDev = null;

        // Per-badge config. Llama and Cake share the whole pipeline below; only the
        // endpoint, status field, class prefix, and a few policies differ. Each badge
        // owns its own state so the two never mix.
        const newBadgeState = () => ({
            lastStates: {},
            devIDs: {},
            errorTimeouts: {},
            spamTimeouts: {},
            toUpdate: {}
        });

        const BADGES = {
            llama: {
                kind: 'llama',
                cls: 'oclb',
                label: 'Llama',
                giveUrl: 'https://www.deviantart.com/_puppy/dashared/give_llama',
                giveBody: (devNameReg, token) => JSON.stringify({ foruser: devNameReg, csrf_token: token }),
                statusField: 'canGiveLlama',
                sbsKey: 'sbsCall',
                has100k: true,
                storageKey: devName => loggedInDev + '|' + devName,
                state: newBadgeState()
            },
            cake: {
                kind: 'cake',
                cls: 'occb',
                label: 'Cake',
                giveUrl: 'https://www.deviantart.com/_puppy/dashared/badges/give',
                giveBody: (devNameReg, token) => JSON.stringify({ foruser: devNameReg, type: 'cake', csrf_token: token }),
                statusField: 'canGiveCake',
                sbsKey: 'cakeSbsCall',
                has100k: false,
                storageKey: devName => 'occb|' + loggedInDev + '|' + devName,
                state: newBadgeState()
            }
        };

        const cakeEnabled = () => setting('addCake') === 'true';

        const initOCLB = async () => {
            loggedInDev = getLoggedInDeviantName();
            if (!loggedInDev) {
                loggedInDev = await waitForLoggedInDevName();
            }
            if (!loggedInDev && !window.location.href.includes('/notifications')) return;
            addLlamaButtonsInDA();
        };

        const setButtonState = (badge, button, className, title) => {
            button.className = badge.cls + ' ' + badge.cls + '-' + className;
            if (!title) title = TITLES[className];
            if (title) button.title = title;
            if (bulkUI) bulkUI.scheduleRefresh();
        };

        const saveLastState = (badge, devName, className, title) => {
            if (className === 'unknown') return;
            badge.state.lastStates[devName] = { className, title };
        };

        const badgeButtonsFor = (badge, devName) =>
            document.querySelectorAll('span.' + badge.cls + '[devName="' + devName + '"]');

        const setButtonsState = (badge, devName, className, title, dontTellOtherTabs) => {
            if (!dontTellOtherTabs) {
                storage('set', badge.sbsKey, JSON.stringify({
                    loggedInDev,
                    devName,
                    className,
                    title
                }));
            }

            const spamTimeouts = badge.state.spamTimeouts;
            if (spamTimeouts.hasOwnProperty(devName)) clearTimeout(spamTimeouts[devName]);

            if (className === 'spam') {
                spamTimeouts[devName] = setTimeout(() => {
                    setButtonsState(badge, devName, 'give', TITLES.give);
                }, 60000);
            }

            saveLastState(badge, devName, className, title);

            for (const button of badgeButtonsFor(badge, devName)) {
                setButtonState(badge, button, className, title);
            }
        };

        const insertInvisibleIframe = (src, id) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = src;
            if (id) iframe.id = id;
            return document.body.appendChild(iframe);
        };

        const badgeButtonClicked = (badge, button, event) => {
            event.preventDefault();
            event.stopPropagation();

            const stateClass = button.className.slice(badge.cls.length * 2 + 2);
            if (!['give', 'error', 'spam', 'token_miss'].includes(stateClass)) return;

            const devName = button.getAttribute('devName');
            const devNameReg = button.getAttribute('devNameReg');
            setButtonsState(badge, devName, 'giving');

            getCsrfToken().then(token => {
                if (!token) {
                    setButtonsState(badge, devName, 'token_miss', 'CSRF token not found. Please refresh the page.');
                    return;
                }
                processGiven(badge, token, devNameReg, devName);
            }).catch(() => {
                setButtonsState(badge, devName, 'token_miss', 'Failed to get CSRF token. Please refresh the page.');
            });

            clearTimeout(badge.state.errorTimeouts[devName]);
            badge.state.errorTimeouts[devName] = setTimeout(() => {
                setButtonsState(badge, devName, 'error', 'Timeout');
            }, 45000);
        };

        const SPAM_WORDS = ['quickly', 'Whoa there', 'spam filter', 'too fast'];
        const ALREADY_WORDS = ['Cannot give badge to this user', 'cannot give any more'];
        const matchesAny = (text, words) =>
            !!text && words.some(w => text.toLowerCase().includes(w.toLowerCase()));

        const processGiven = (badge, token, devNameReg, devName, iframe) => {
            const errorTimeouts = badge.state.errorTimeouts;

            const xhr = new XMLHttpRequest();
            xhr.open('POST', badge.giveUrl, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        const desc = response.errorDescription;
                        const isError = response.status === 'error' || response.error;

                        if (isError && matchesAny(desc, SPAM_WORDS)) {
                            clearTimeout(errorTimeouts[devName]);
                            setButtonsState(badge, devName, 'spam');
                            if (iframe) iframe.remove();
                            return;
                        }

                        if (isError && matchesAny(desc, ALREADY_WORDS)) {
                            clearTimeout(errorTimeouts[devName]);
                            setButtonsState(badge, devName, 'already');
                            if (iframe) iframe.remove();
                            return;
                        }

                        if (!isError) {
                            clearTimeout(errorTimeouts[devName]);
                            setButtonsState(badge, devName, 'success');
                            if (iframe) iframe.remove();

                            errorTimeouts[devName] = setTimeout(() => {
                                getGiveMenu(badge, devName, (devID, className, title) => {
                                    saveLastState(badge, devName, className, title);
                                    if (devID) badge.state.devIDs[devName] = devID;
                                    for (const button of badgeButtonsFor(badge, devName)) {
                                        setButtonState(badge, button, className, title);
                                    }
                                });
                            }, 5000);

                            return;
                        }
                    } catch (e) {}
                }

                clearTimeout(errorTimeouts[devName]);
                setButtonsState(badge, devName, 'error');
                if (iframe) iframe.remove();
            };

            xhr.send(badge.giveBody(devNameReg, token));
        };

        let xhrCounter = 0;

        const get = (url, callbacks) => {
            if (!xdCommunicator) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = () => callbacks.success.call(xhr.response);
                xhr.onerror = () => callbacks.error.call('');
                xhr.send();
            } else {
                xhrCallbacks[++xhrCounter] = callbacks;
                xdCommunicator.postMessage(JSON.stringify({
                    oclb: {
                        id: xhrCounter,
                        url
                    }
                }), '*');
            }
        };

        const getCsrfToken = () => {
            return new Promise(resolve => {
                const now = Date.now();

                // Cache, persist, and resolve a freshly found token in one step.
                const cacheToken = token => {
                    csrfTokenCache = token;
                    csrfTokenCacheTime = now;
                    storage('set', 'cached_csrf', token);
                    resolve(token);
                };

                if (csrfTokenCache && (now - csrfTokenCacheTime) < CSRF_CACHE_DURATION) {
                    resolve(csrfTokenCache);
                    return;
                }

                const currentLoggedInDev = getLoggedInDeviantName();
                const prevLoggedInDev = storage('get', 'oclb_last_user');

                if (currentLoggedInDev !== prevLoggedInDev) {
                    csrfTokenCache = null;
                    csrfTokenCacheTime = 0;
                    storage('set', 'oclb_last_user', currentLoggedInDev);
                    Object.values(BADGES).forEach(b => {
                        Object.keys(b.state.lastStates).forEach(key => delete b.state.lastStates[key]);
                    });
                }

                const token = getToken(document);
                if (token) {
                    cacheToken(token);
                    return;
                }

                const tryFetchSessionToken = () => {
                    try {
                        const sessionToken = window.sessionStorage.getItem('csrf_token');
                        if (sessionToken) {
                            cacheToken(sessionToken);
                            return;
                        }
                    } catch (e) {}
                    resolve(null);
                };

                fetch('https://www.deviantart.com/', {
                    credentials: 'include',
                    cache: 'no-store'
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch CSRF token. Status: ${response.status}`);
                    }
                    return response.text();
                }).then(htmlContent => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = htmlContent;

                    const tokenInput = tempDiv.querySelector("#logout-form input[type='hidden']") ||
                        tempDiv.querySelector("input[name='validate_token']") ||
                        tempDiv.querySelector("[name='csrf_token']");

                    if (tokenInput && tokenInput.value) {
                        cacheToken(tokenInput.value);
                        return;
                    }

                    const tokenFromScripts = getToken(tempDiv);
                    if (tokenFromScripts) {
                        cacheToken(tokenFromScripts);
                        return;
                    }

                    tryFetchSessionToken();
                }).catch(error => {
                    console.error('Error fetching CSRF token:', error);
                    tryFetchSessionToken();
                });
            });
        };

        const getGiveMenu = (badge, devName, callback) => {
            getCsrfToken().then(csrfToken => {
                if (csrfToken) {
                    get('https://www.deviantart.com/_puppy/dauserprofile/give_menu/status?username=' + devName + '&csrf_token=' + csrfToken, {
                        success: function() {
                            if (!this || this.includes('fail')) {
                                callback(0, 'unknown', TITLES.unknown.err_dev_id);
                                return;
                            }

                            let resultJSON;
                            try {
                                resultJSON = JSON.parse(this);
                            } catch (e) {
                                callback(0, 'unknown', TITLES.unknown.err_server_response);
                                return;
                            }

                            if (resultJSON[badge.statusField]) {
                                callback(badge.state.devIDs[devName], 'give');
                            } else {
                                callback(badge.state.devIDs[devName], 'already');
                            }
                        },
                        error: () => {
                            callback(0, 'unknown', TITLES.unknown.err_network);
                        }
                    });
                } else {
                    console.error('CSRF token not found.');
                    setButtonsState(badge, devName, 'token_miss', 'Token not found! Refresh and retry..');
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        };

        const askServerForStatus = (badge, button, devName) => {
            const toUpdate = badge.state.toUpdate;
            if (toUpdate.hasOwnProperty(devName)) {
                toUpdate[devName].push(button);
            } else {
                toUpdate[devName] = [button];
                getGiveMenu(badge, devName, (devID, className, title) => {
                    saveLastState(badge, devName, className, title);
                    if (devID) badge.state.devIDs[devName] = devID;
                    for (const b of toUpdate[devName]) {
                        setButtonState(badge, b, className, title);
                    }
                    delete toUpdate[devName];
                });
            }
        };

        const initBadgeButton = (badge, button, devName) => {
            button.onclick = event => badgeButtonClicked(badge, button, event);

            const lastStates = badge.state.lastStates;
            if (lastStates.hasOwnProperty(devName)) {
                setButtonState(badge, button, lastStates[devName].className, lastStates[devName].title);
            } else if (badge.has100k && HAS_100K_LLAMAS.includes(devName)) {
                setButtonState(badge, button, '100k');
            } else if (storage('get', badge.storageKey(devName))) {
                setButtonState(badge, button, 'already');
            } else if (loggedInDev === devName) {
                setButtonState(badge, button, 'enough');
            } else {
                setButtonState(badge, button, 'unknown', TITLES.unknown.loading);
                askServerForStatus(badge, button, devName);
            }
        };

        const getDevName = (link, needLowerCase) => {
            const eclipseUsername = link.getAttribute('data-username');

            if (eclipseUsername) {
                return needLowerCase ? eclipseUsername.toLowerCase() : eclipseUsername;
            }

            const devNameOld = /([a-zA-Z0-9-]+)\.deviantart\.com/.exec(link.href);
            if (devNameOld && devNameOld[1] !== 'www') {
                return needLowerCase ? devNameOld[1].toLowerCase() : devNameOld[1];
            }

            const devNameNew = /www\.deviantart\.com\/([a-zA-Z0-9-]+)/.exec(link.href);
            if (devNameNew) {
                return needLowerCase ? devNameNew[1].toLowerCase() : devNameNew[1];
            }
        };

        // Insert point for a badge button: after the username link, any user-symbol,
        // and any badge buttons already added - so Llama and Cake sit side-by-side.
        const findInsertRef = devNameLink => {
            let refEl = devNameLink.nextSibling;
            while (refEl && refEl.nodeType === Node.ELEMENT_NODE && refEl.classList &&
                (refEl.classList.contains('user-symbol') ||
                    refEl.classList.contains('oclb') ||
                    refEl.classList.contains('occb'))) {
                refEl = refEl.nextSibling;
            }
            return refEl;
        };

        const addBadgeButton = (badge, devNameLink) => {
            const isSpan = devNameLink.nodeType === Node.ELEMENT_NODE &&
                devNameLink.tagName.toLowerCase() === 'span';

            if (devNameLink.className.includes('banned')) return;

            const devName = isSpan ? devNameLink.innerText : getDevName(devNameLink, true);
            const devNameReg = isSpan ? devNameLink.innerText : getDevName(devNameLink, false);

            if (!devName) return;

            // Skip avatar/icon-only links (no visible text). A button next to a bare
            // avatar is meaningless, and the same deviant appears elsewhere as text.
            if (!isSpan && !devNameLink.textContent.trim()) return;

            if (!loggedInDev) loggedInDev = parseUserinfoCookie();

            if (devName === loggedInDev) return;
            if (!devNameLink.parentNode) return;

            // One button per deviant per page. Querying the live document (not just
            // the parent) keeps profile/gallery pages from sprouting dozens of
            // identical buttons, and self-heals if DeviantArt recycles list nodes.
            if (document.querySelector('span.' + badge.cls + '[devName="' + devName + '"]')) return;

            const button = document.createElement('span');
            button.setAttribute('devName', devName);
            button.setAttribute('devNameReg', devNameReg);

            initBadgeButton(badge, button, devName);

            const refEl = setting('showPos') === 'before' ? devNameLink : findInsertRef(devNameLink);
            devNameLink.parentNode.insertBefore(button, refEl);
        };

        // Hook that the scanner calls for each username link: add a Llama button
        // and, when enabled, a Cake button right beside it.
        const addLlamaButton = devNameLink => {
            addBadgeButton(BADGES.llama, devNameLink);
            if (cakeEnabled()) addBadgeButton(BADGES.cake, devNameLink);
        };

        const addMessageListener = callback => {
            window.addEventListener('message', e => {
                if (e.data && e.data.slice && e.data.slice(0, 6) !== '{"oclb') return;
                callback(JSON.parse(e.data).oclb, e.origin);
            });
        };

        const addStylesAndMsgListener = () => {
            addCSS(CSS);
            if (setting('animation') !== 'true') addCSS(NO_TRANSITION_STYLE);

            addMessageListener((data, origin) => {
                if (origin !== 'https://www.deviantart.com') return;

                const oclbFrame = document.getElementById('oclb-frame-' + data.devName);
                clearTimeout(BADGES.llama.state.errorTimeouts[data.devName]);
                delete BADGES.llama.state.errorTimeouts[data.devName];

                const callback = (className, setStorage) => {
                    setButtonsState(BADGES.llama, data.devName, className,
                        className === 'success' ? data.successText : data.errorText);
                };

                if (data.successText.includes('Success!')) {
                    callback('success', true);
                } else if (data.errorText.includes('You cannot give any more llama badges to') ||
                    data.errorText.includes('Cannot give badge to this user')) {
                    callback('already', true);
                } else if (data.errorText.includes('Badges have been given too quickly, and have tripped a spam filter') ||
                    data.errorText.includes('Whoa there')) {
                    callback('spam');
                } else {
                    callback('error');
                    if (oclbFrame) {
                        if (data.errorText.includes('Please enter a password')) {
                            data.errorText = 'One Click Llama Button will start working after you give a Llama manually (the normal way) with the "Remember my password" option checked.';
                        }
                        alert(data.errorText + (data.successText ? '\n\n' + data.successText : ''));
                    }
                }

                if (oclbFrame) oclbFrame.remove();
            });
        };

        const addFooterLinks = () => {
            const footer = document.querySelector('.footer-menu-list');
            if (!footer) return;

            const LINKS = {
                'One Click Llama Button': '//kishanbagaria.com/userscripts/one-click-llama-button/'
            };

            Object.keys(LINKS).forEach(link => {
                const li = document.createElement('li');
                li.className = 'footer-menu-list-item';
                li.innerHTML = link.link(LINKS[link]);
                footer.appendChild(li);
            });
        };

        const addLlamaButtonsInDA = () => {
            const waitForElements = (parentNode, selector, callback) => {
                const callbackOnlyOnce = n => {
                    if (n.getAttribute('data-oclb-found')) return;
                    callback(n);
                    n.setAttribute('data-oclb-found', '1');
                };

                const callForChildren = () => {
                    if (parentNode.matches && parentNode.matches(selector)) callbackOnlyOnce(parentNode);
                    if (!parentNode.querySelectorAll) return;
                    parentNode.querySelectorAll(selector).forEach(callbackOnlyOnce);
                };

                callForChildren();

                new MutationObserver(mutations => {
                    for (const m of mutations) {
                        m.addedNodes.forEach(callForChildren);
                    }
                }).observe(parentNode, { childList: true, subtree: true });
            };

            const storageListener = e => {
                const badge = Object.values(BADGES).find(b => b.sbsKey === e.key);
                if (!badge || !e.newValue) return;
                let data;
                try {
                    data = JSON.parse(e.newValue);
                } catch (err) {
                    return;
                }
                if (data.loggedInDev === loggedInDev) {
                    setButtonsState(badge, data.devName, data.className, data.title, true);
                }
            };

            const usernameLinkSelector = setting('addForGroups') === 'true'
                ? 'a.username, a[data-username]'
                : 'a.username:not(.group), a[data-username]:not([data-usertype=group])';

            const addEverywhere = () => {
                const badgesLinkSelector = 'a[href*=".deviantart.com/"][href*="/badges/"]';
                const watchersSelector = '#watchers div > span';
                const watchingSelector = '#watching div > span';
                const membersSelector = '#group_members div > span';
                const adminSelector = '#group_admins div > span';

                waitForElements(document.body, [
                    badgesLinkSelector,
                    usernameLinkSelector,
                    watchersSelector,
                    watchingSelector,
                    membersSelector,
                    adminSelector
                ].join(','), addLlamaButton);
            };

            const addInCatBar = () => {
                const devNameLink = document.querySelector('div.gruserbadge ' + usernameLinkSelector);
                if (devNameLink) addLlamaButton(devNameLink);
                return devNameLink;
            };

            const isNotifyCenter = () => window.location.href.includes('/notifications/');

            const showIn = setting('showIn');

            if (showIn === '*') {
                if (window.location.href.endsWith('/badges/')) {
                    addInCatBar();
                    waitForElements(document.querySelector('.ll'), usernameLinkSelector, addLlamaButton);
                } else {
                    addEverywhere();
                }
            } else if (showIn === 'profile') {
                if (!addInCatBar()) return;
            } else if (showIn === 'notifycenter') {
                if (!isNotifyCenter()) return;
                addEverywhere();
            } else if (showIn === 'notifycenter+profile') {
                if (isNotifyCenter()) addEverywhere();
                else if (!addInCatBar()) return;
            }

            if (showIn !== 'profile') window.addEventListener('storage', storageListener);

            addStylesAndMsgListener();
            addFooterLinks();

            // Attach the bulk panel only in the top-level window (not the hidden
            // give/process_trade iframes) and not in profile-only mode.
            if (window.top === window.self && showIn !== 'profile') {
                bulkUI = BulkGiver;
                BulkGiver.init();
            }
        };

        // Bulk Giver (merged from "OCLB Helper" v0.23 by HampshireBrony, rewritten).
        // A floating panel that shows live button counts and, on click, gives to
        // everyone on the page one-by-one by clicking the existing buttons - so it
        // reuses the normal pipeline and inherits all spam/error handling for free.
        const BULK_INTERVAL = 600;       // ms between gives during a bulk run
        const BULK_PARAM = 'oclb_bulk';  // URL flag used to continue across pages

        const STATE_CLASSES = [
            'give', 'giving', 'already', 'success', 'enough',
            '100k', 'spam', 'error', 'token_miss', 'unknown'
        ];

        // Selector matching a given state across both badge types.
        const stateSel = state => 'span.oclb-' + state + ', span.occb-' + state;

        const countByState = () => {
            const counts = {};
            let total = 0;
            for (const c of STATE_CLASSES) {
                const n = document.querySelectorAll(stateSel(c)).length;
                counts[c] = n;
                total += n;
            }
            counts.total = total;
            return counts;
        };

        const statsRow = (l1, v1, l2, v2) =>
            '<tr><td>' + l1 + '</td><td>' + v1 + '</td><td>' + l2 + '</td><td>' + v2 + '</td></tr>';

        const BULK_CSS =
            '.oclb-bulk{position:fixed;right:14px;bottom:14px;width:42px;height:42px;z-index:2147483600;' +
                'background:#3b5a3b;border:2px solid #2a402a;border-radius:8px;' +
                'cursor:pointer;user-select:none;transition:border-color .2s,transform .1s}' +
            '.oclb-bulk:hover{transform:translateY(-1px)}' +
            '.oclb-bulk.is-active{border-color:#f6e16e}' +
            '.oclb-bulk.is-stopped{border-color:#e2503c}' +
            '.oclb-bulk-icon{position:absolute;top:0;left:0;right:0;bottom:0;' +
                'background:url(' + IMG.GIVE + ') center no-repeat;background-size:22px;image-rendering:pixelated}' +
            '.oclb-bulk-count{position:absolute;left:0;right:0;bottom:1px;text-align:center;' +
                'font:bold 11px/1 Verdana,sans-serif;color:#f6e16e;text-shadow:0 1px 2px #000;pointer-events:none}' +
            '.oclb-bulk-card{position:absolute;right:0;bottom:48px;display:none;width:236px;padding:10px 12px;' +
                'background:#1f1f1f;color:#eee;border:1px solid #444;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.4);' +
                'font:12px/1.55 Verdana,sans-serif;cursor:default}' +
            '.oclb-bulk:hover .oclb-bulk-card{display:block}' +
            '.oclb-bulk-title{font-weight:bold;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #444}' +
            '.oclb-bulk-card table{width:100%;border-collapse:collapse}' +
            '.oclb-bulk-card td{padding:1px 0}' +
            '.oclb-bulk-card td:nth-child(2),.oclb-bulk-card td:nth-child(4){text-align:right;font-weight:bold;color:#f6e16e}' +
            '.oclb-bulk-card td:nth-child(3){padding-left:14px}' +
            '.oclb-bulk-hint{margin-top:7px;color:#bbb;font-size:11px}';

        const BulkGiver = {
            active: false,
            stopped: false,
            timer: null,
            idleTicks: 0,
            refreshQueued: false,
            el: {},

            init() {
                if (this.el.panel) return;
                addCSS(BULK_CSS);

                const panel = document.createElement('div');
                panel.className = 'oclb-bulk';

                const icon = document.createElement('span');
                icon.className = 'oclb-bulk-icon';

                const count = document.createElement('span');
                count.className = 'oclb-bulk-count';

                const card = document.createElement('div');
                card.className = 'oclb-bulk-card';

                panel.appendChild(icon);
                panel.appendChild(count);
                panel.appendChild(card);
                panel.addEventListener('click', () => this.toggle());

                document.body.appendChild(panel);
                this.el = { panel, count, card };

                this.refresh();
                this.maybeAutoStart();
            },

            scheduleRefresh() {
                if (this.refreshQueued || !this.el.panel) return;
                this.refreshQueued = true;
                requestAnimationFrame(() => {
                    this.refreshQueued = false;
                    this.refresh();
                });
            },

            refresh() {
                if (!this.el.panel) return;
                const c = countByState();

                this.el.count.textContent = c.give || '';
                this.el.card.innerHTML =
                    '<div class="oclb-bulk-title">Badges on this page</div>' +
                    '<table>' +
                        statsRow('To give', c.give, 'Given', c.success) +
                        statsRow('Giving', c.giving, 'Already', c.already) +
                        statsRow('Loading', c.unknown, 'Enough', c.enough + c['100k']) +
                        statsRow('Spam', c.spam, 'Errors', c.error + c.token_miss) +
                    '</table>' +
                    '<div class="oclb-bulk-hint">' + this.hint(c) + '</div>';

                this.el.panel.classList.toggle('is-active', this.active);
                this.el.panel.classList.toggle('is-stopped', this.stopped && !this.active);
            },

            hint(c) {
                if (this.active) return 'Giving badges\u2026 click to stop (' + c.give + ' left)';
                if (this.stopped) return 'Stopped \u2014 spam filter tripped. Click to resume.';
                if (c.give > 0) return 'Click to give ' + c.give + ' badge' + (c.give === 1 ? '' : 's');
                return 'No badges to give on this page';
            },

            toggle() {
                if (this.active) this.stop('user');
                else this.start();
            },

            start() {
                if (this.active) return;
                this.active = true;
                this.stopped = false;
                this.idleTicks = 0;
                this.refresh();
                this.tick();
            },

            stop(reason) {
                this.active = false;
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                if (reason === 'spam') this.stopped = true;
                this.refresh();
            },

            tick() {
                if (!this.active) return;

                // Spam filter tripped: stop and go red.
                if (document.querySelector(stateSel('spam'))) {
                    this.stop('spam');
                    return;
                }

                const next = document.querySelector(stateSel('give'));
                if (next) {
                    next.click();
                    this.idleTicks = 0;
                    this.scheduleRefresh();
                    this.timer = setTimeout(() => this.tick(), BULK_INTERVAL);
                    return;
                }

                // Nothing givable now. Keep waiting while gives are in flight, or
                // briefly while status lookups resolve - but bail after ~6s so a
                // button stuck loading on a network error can't spin forever.
                const inFlight = document.querySelector(stateSel('giving'));
                const loading = document.querySelector(stateSel('unknown'));
                if (inFlight || (loading && this.idleTicks < 10)) {
                    if (!inFlight) this.idleTicks++;
                    this.timer = setTimeout(() => this.tick(), BULK_INTERVAL);
                    return;
                }

                // Page exhausted.
                this.active = false;
                this.timer = null;
                this.refresh();
                this.goToNextPage();
            },

            goToNextPage() {
                // Legacy "classic" member-list pagination; silently no-ops elsewhere.
                if (!window.location.href.includes('modals/memberlist')) return;

                const pager = document.querySelector('.pagination');
                if (!pager) return;

                const nextLink = Array.from(pager.querySelectorAll('a')).find(a =>
                    /next/i.test(a.className) || /next/i.test(a.textContent));
                const href = nextLink && nextLink.getAttribute('href');
                if (!href) return;

                window.location.href = href + (href.includes('?') ? '&' : '?') + BULK_PARAM;
            },

            maybeAutoStart() {
                // Continue a bulk run that flowed in from the previous page.
                if (!window.location.search.includes(BULK_PARAM)) return;

                const begin = () => {
                    if (!this.el.panel) return;
                    if (document.querySelector(stateSel('unknown'))) {
                        setTimeout(begin, 500); // let status lookups settle first
                        return;
                    }
                    this.start();
                };
                setTimeout(begin, 1000);
            }
        };

        const postParent = obj => {
            window.parent.postMessage(JSON.stringify({ oclb: obj }), '*');
        };

        if (!window.location.host.includes('deviantart.com') && !window.location.host.includes('sta.sh')) {
            window.postMessage('oclb-loaded', window.location.href);

            if (window.location.href.includes('/preferences/')) {
                const inputs = document.querySelectorAll('input.oclb');
                for (const input of inputs) {
                    if (input.type === 'checkbox') {
                        if (setting(input.name) === 'true') input.checked = true;
                        input.onchange = () => setting(input.name, input.checked.toString());
                    } else if (input.type === 'radio') {
                        if (setting(input.name) === input.value) input.checked = true;
                        input.onchange = () => setting(input.name, input.value);
                    }
                }
                addCSS(CSS);
            } else if (window.location.href.includes('/exchangers/')) {
                xdCommunicator = insertInvisibleIframe('//deviantart.com/global/difi/?oclb').contentWindow;
                addStylesAndMsgListener();

                addMessageListener(data => {
                    if (data.loggedInDev) {
                        loggedInDev = data.loggedInDev;
                        window.postMessage('oclb.loggedInDev|' + loggedInDev, window.location.href);
                        for (const button of document.querySelectorAll('span.oclb')) {
                            const devName = button.getAttribute('devName');
                            if (devName) initBadgeButton(BADGES.llama, button, devName);
                        }
                    } else if (data.id) {
                        if (data.data) {
                            xhrCallbacks[data.id].success.call(data.data);
                        } else {
                            xhrCallbacks[data.id].error();
                        }
                        delete xhrCallbacks[data.id];
                    }
                });
            }
        } else if (window.location.href.includes('/modal/badge/give?badgetype=llama')) {
            const fillForm = () => {
                if (!document.give_form) return window.location.reload();
                if (document.give_form.tos) document.give_form.tos.checked = true;
                document.give_form.submit();
            };
            fillForm();
        } else if (window.location.href.includes('/modal/badge/process_trade')) {
            if (document.getElementsByClassName('badge-llama').length > 0) {
                const usernameElement = document.querySelector('.username');
                const successElement = document.querySelector('#badgeReceiptBody > div');
                const errorElement = document.querySelector('#error_messages > ul > li');
                const successText = successElement ? successElement.textContent.replace(/\s+/g, ' ').trim() : '';
                const errorText = errorElement ? errorElement.textContent.replace(/\s+/g, ' ').trim() : '';

                if (usernameElement) {
                    postParent({
                        devName: usernameElement.textContent.toLowerCase(),
                        successText,
                        errorText
                    });
                }
            }
        } else if (window.location.href.includes('://deviantart.com/global/difi/?oclb')) {
            const cookieDev = parseUserinfoCookie();
            if (cookieDev) {
                loggedInDev = cookieDev;
                postParent({ loggedInDev });
            }

            addMessageListener(data => {
                const _ = function() {
                    postParent({
                        id: data.id,
                        data: this
                    });
                };

                if (data.url) {
                    get(data.url, { success: _, error: _ });
                }
            });
        } else if (window.location.host !== 'llamatrade.deviantart.com') {
            if (window.location.href.includes('/notifications')) {
                initOCLB();
            } else {
                loggedInDev = getLoggedInDeviantName();
                if (loggedInDev) {
                    addLlamaButtonsInDA();
                } else {
                    initOCLB();
                }
            }
        }
    } catch (err) {
        const heading = 'One Click Llama Button v' + VERSION + ' encountered an error:\n';
        console.error(heading, err);
        alert(heading + '\n---\n' + err + '\n---\n\nPlease email a screenshot of this to hi@kishan.info, or post it as a comment on deviantart.com/Kishan-Bagaria (unless someone has already posted the same comment).\n\n---\nURL: ' + window.location.href + '\nUser-Agent: ' + navigator.userAgent);
    }
});
