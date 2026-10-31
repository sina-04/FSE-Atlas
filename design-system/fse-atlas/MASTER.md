# FSE Atlas design system

## Direction

Warm scientific editorial design, informed by UI/UX Pro Max Organic Biophilic and Nature Distilled guidance. Combine academic clarity with restrained organic illustration. Avoid fabricated metrics, testimonials, decorative dashboards and restaurant imagery.

## Semantic tokens

Canonical values live in `src/app/globals.css`.

| Role | Light | Dark |
|---|---|---|
| Background | `#FAF8F3` | `#171E19` |
| Surface | `#FFFEFA` | `#212B23` |
| Secondary surface | `#F0EBDF` | `#29352B` |
| Text | `#292D25` | `#F2F1E9` |
| Muted text | `#626B5D` | `#B3BFAE` |
| Primary action | `#4E6335` | `#B5D49A` |
| Text on primary | `#FFFEFA` | `#1B2819` |
| Terracotta | `#A45335` | `#EBA184` |
| Saffron | `#E9B75A` | `#F1C778` |

Check actual text/background combinations in both themes. Decorative values are not automatically suitable for small text.

## Typography and layout

Self-host Manrope Variable for English and Vazirmatn Variable for Persian. Body text is 16 px English / 17 px Persian, with generous line heights and fluid headings. Persian uses no Latin letter spacing. Use logical properties, mirrored directional controls and isolated Latin notation.

Containers range from mobile gutters to 1280 px desktop / 1440 px ultrawide maxima. Directories use one, two or three columns; selected homepage cards use four. At 320 px retain usable search, language, theme and navigation controls.

## Components and composition

Use consistent buttons, icon tiles, source panels and native expandable roadmaps. Homepage sections vary between an asymmetric scientific hero, three numbered navigation paths, course cards, linked learning steps, an olive career panel and country rows.

Every control needs an accessible name and visible focus. Radix dialogs contain focus, close on Escape and restore focus. Labels reflow. Scientific values are formatted without changing their meaning.

## Motion and acceptance

Use CSS for hover/press feedback and Motion for restrained section movement. The theme reveal uses the measured toggle origin, farthest-corner radius and 650 ms View Transition. Cancel interrupted transitions; reduced-motion and unsupported browsers switch immediately.

Review both locales/themes, keyboard and touch operation, 200% scaling and all twelve target widths. Target WCAG 2.2 AA and strong performance. Illustrations are decorative unless accompanied by a meaningful textual explanation.
