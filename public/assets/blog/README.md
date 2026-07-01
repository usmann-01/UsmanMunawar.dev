# Blog hero images

Each blog post gets a full-bleed hero image behind its centered title, using the
**same treatment and dimensions as the home page hero**.

## How to add one (convention-based — no MDX/frontmatter change)

Drop a file here named after the post's slug:

```
public/assets/blog/<slug>.jpg
```

The slug is the MDX filename without extension. Current posts:

- `s01-dbms-01-storage-design.jpg`
- `s01-dbms-02-btree-insert.jpg`

It's picked up automatically at build time (via `lib/assets.ts` → `assetExists`).
Until a file exists, the hero shows the accent-gradient **placeholder** — the
page always renders a hero, it just falls back gracefully.

## Recommended dimensions

Same as the main hero: **16:9, ~1920×1080** (JPG, compressed to < ~300 KB).
The image is `background-size: cover`, so keep the focal point roughly centered —
it crops at the edges on narrow/short viewports.

## Why convention over an MDX frontmatter field

This matches the existing project-cover pattern (`/assets/projects/<slug>.jpg`):
no schema change, no per-post editing, and a built-in placeholder fallback. If we
ever need per-post overrides (custom path, external URL, or opting out of the
hero), we can add an optional `heroImage` field to the Velite post schema later
without breaking this default.
