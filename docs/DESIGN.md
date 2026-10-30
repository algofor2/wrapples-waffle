# Wrapples — editorial food direction

Reviewed 30 October 2026 against https://www.mysweetwaffle.com.tr/ and the supplied recording, preserved in `docs/video-evidence/contact-sheet.jpg`. The existing REA 6.5.0 reports and Sweet Waffle computed-style evidence were re-evaluated. No live REA tool or executable was available in this environment. Firecrawl fetched the reference homepage and branding; the supplied video contact sheet was visually inspected. Fresh screenshot pixels were not used as evidence of animation behavior.

## Observed reference principles

The recorded desktop reference uses a full-window food photograph, a header over the photo that becomes cream below it, generous blank space, photo/text pairs, asymmetric photo collections, circular category images, and a dark brown footer. Existing REA measurements report a 104px desktop header, 900px hero at a 1440×900 viewport, 72/90px heading, Roboto body and #FBF7F0 background with #2A1A10 text. Fresh Firecrawl branding returned the same background/text colors and a coral #E8604C accent. Video spacing and transitions remain visual estimates, not recovered source code.

## Original Wrapples interpretation

| Role | Implementation choice |
| --- | --- |
| Background | #FAF7F0 cream; #F0E9DE alternating surfaces |
| Text | #30221A cocoa |
| Accent | #A34D32 terracotta; #8E402B hover/emphasis |
| Display typography | Self-hosted Cormorant Garamond, 500 upright / 400 italic |
| Body and navigation | Self-hosted DM Sans, 400 / 600 / 800, Latin + Turkish glyph coverage |
| Desktop container | max 1328px; 56px side inset at standard desktop widths |
| Rhythm | approximately 110–145px vertical desktop section padding, 75–90px mobile |
| Hero | One original 16:9 photograph at a time; three manual scenes; no autoplay |
| Gallery | Tall chocolate close-up against landscape table photograph and editorial text |
| Product imagery | Consistent original 4:5 still lifes, dedicated square category variants |
| Motion | IntersectionObserver reveal, image clip mask, stagger, bounded desktop parallax |

The typography, terracotta palette, composition, copy and photographs are original implementation decisions. No competitor code, photographs, logos, slogans or distinctive brand assets were copied. Reference image URLs are not application assets. Mood photographs are explicitly labeled AI concepts and are not presented as the actual premises.

## Evidence and limits

Before/after desktop (1440×900) and mobile (390×844 CSS pixels) captures are under `docs/premium-evidence/`. Browser tests use Chromium against the actual production build. The managed Sites preview could not launch Next.js because it appended Vite-specific `--host` / `--strictPort` arguments; no hosting deployment was requested or performed. The user-requested Playwright production checks were used for visual verification instead.
