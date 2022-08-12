---
title: "a (sorta) comprehensive list of Team Xecuter fuck-ups"
date: 2020-10-03T18:25:39+02:00
draft: false
tags: [switch]
---

WARNING! This post is really old and really shit. Wouldn't get too excited about it if I were you. {.text-3xl}

[[toc]]

[Team Xecuter](https://team-xecuter.com/) is a console hacking group that came up in the original Xbox days. These days, though, they've been focusing on the Nintendo Switch and providing a constant stream of bullshit almost since the release of the console. This post is an attempt at documenting most of TX's fuck-ups in celebration of 2 members getting arrested.

This is not a full list. If you know about more fuck-ups, please send them at bandithedoge@protonmail.com or bandithedoge#7040 on Discord. It's also focused mainly on the Switch era but, if someone wants to contribute, I could include fuck-ups from the OG Xbox era as well. I also might have or might have not thought about creating a Telegram channel for the meme.

This list will be updated with future fuck-ups.

# Context

In early 2018, a BootROM exploit was discovered for the Tegra X1 chip used by the Nintendo Switch independently by 3 parties: [ReSwitched](https://github.com/reswitched) (who named it [_Fusée Gelée_](https://www.ktemkin.com/faq-fusee-gelee/), which is the name I'll use for the rest of this post), [fail0verflow](https://fail0verflow.com/blog/) (who named it [_ShofEL2_](https://github.com/fail0verflow/shofel2) after member [shuffle2](https://github.com/shuffle2)) and an anon from 4chan. The exploit allowed for full control over the system. A few custom firmware projects came up, but the two most important ones were [Atmosphère](https://github.com/Atmosphere-NX/Atmosphere) and [SXOS](https://sx.xecuter.com/). The main difference was the license and legality (which we'll get into later): AMS is open-source software licensed under GPLv2 and SXOS is closed-source and costs $20. SXOS had the advantage of being the first one to be publically released and deemed usable, but that's no longer the case, as AMS is a much more mature and stable project.

# List of fuck-ups

-   TX stole open-source code and broke many licenses.

    -   An [easter egg](https://github.com/switchbrew/nx-hbloader/blob/master/source/main.c#L10) from [nx-hbloader](https://github.com/switchbrew/nx-hbloader) [was discovered](https://twitter.com/hexkyz/status/1012146388484755456) when looking at an SXOS binary with a hex editor, essentially proving that TX used code from nx-hbloader. TX did not acknowledge the use of this code and therefore broke the [ISC license](https://github.com/switchbrew/nx-hbloader/blob/master/LICENSE.md).
    -   Part of AMS code was also [found](https://twitter.com/hexkyz/status/1012149398929735681) in SXOS binaries with a hex editor. AMS is licensed under the more restrictive [GPLv2 license](https://github.com/Atmosphere-NX/Atmosphere/blob/master/LICENSE) which allows you to use the code as long as you provide the source code under the same license. TX did not even acknowledge use of AMS code.
    -   [Mike Heskin](https://twitter.com/hexkyz) also [said](https://twitter.com/hexkyz/status/1012363013389774848) that SXOS uses an open-source crypto library for license verification.
    -   Their NSP installer contained code from Nintendo's DevMenu, which is protected by a strict NDA and is illegal to even run on your own console.
    -   The NSP installer was later [proven to use code from](https://twitter.com/hexkyz/status/1023649410993905666) [old Tinfoil](https://github.com/Adubbz/Tinfoil), another open-source project. They broke its [MIT license](https://github.com/Adubbz/Tinfoil/blob/master/LICENSE) by not acknowledging it.

    This actually makes SXOS illegal to sell.

-   TX included brick code as protection from reverse engineering.

    -   If SXOS detected that the user is running any program that could potentially be used for reverse engineering, the console's eMMC would be [locked](https://twitter.com/hexkyz/status/1012363215815282688) with the password _WANNA PLAY? :)_.
    -   The brick code could also [affect](https://twitter.com/hexkyz/status/1012363021124079622) regular users who use certain legitimate homebrew on their console, eg. [hekate](https://github.com/CTCaer/hekate). There was also a chance that the code would [trigger on accident](https://twitter.com/hexkyz/status/1012363017957380096), possibly bricking some random user's console.
    -   After this was discovered, TX went into full damage control mode, removed the brick code in version 1.3 and called it a ["challenge for hackers"](https://www.reddit.com/r/SwitchHacks/comments/8vtwzw/sx_os_v13_announcement/) like a wannabe YouTube prankster.

    This is suspiciously similar to what Gateway did on the 3DS. Pretty ironic how that turned out, eh?

-   TX [tried to bribe](https://twitter.com/libretro/status/1046891214824460293) [m4xw](https://twitter.com/m4xwdev) into making his OpenGL build of RetroArch exclusive to SXOS and breaking the [GPLv3](https://github.com/libretro/RetroArch/blob/master/COPYING) license.

    -   TX also [tried to involve him into their lawsuit](https://www.justice.gov/opa/press-release/file/1324026/download#page=32&zoom=auto,-260,165), possibly as revenge. They claim that m4xw took the money and ran away to [libretro](https://www.libretro.com/) (which is obviously not a "rival hacking group"). m4xw [claims that no money was exchanged](https://twitter.com/m4xwdev/status/1312156388999622656).

    This could mean that TX is willing to drag random people they don't like into the lawsuit. Sue me!

-   TX claimed in 2018 that they had a solution to the new unhackable Switch models.

    -   In 2020 they [announced SX Core and SX Lite](http://wololo.net/2020/02/13/switch-news-team-xecuter-begin-the-testing-phase-for-upcoming-switch-hacking-solution-up-to-300-modders-can-sign-up-to-receive-a-pre-production-unit-names-revealed-to-be-sx-core-and-sx-lite/) - brand new modchips for new Switch consoles (including Lite). Then they [delayed shipping test units by 2 weeks](http://wololo.net/2020/02/16/switch-news-team-xecuters-testing-phase-might-take-another-2-weeks-to-kick-off-due-to-coronavirus-according-to-emails-sent-out-to-accepted-testers-2/) due to the y'know what.

    While this isn't exactly a fuck-up (and their modchips are available to buy), I still decided to include it simply because of the 2 year delay. Personally I don't think they were entirely honest about it in the first place but I'll let you decide.

This is all I currently have to say. I tried to keep this post relatively bias-free but feel free to call me a butthurt SJW fanboy anyway.
