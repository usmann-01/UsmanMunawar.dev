// Single source of truth for the Giscus (GitHub Discussions) comment/guestbook
// backend. These values come from giscus.app's configurator for THIS repo's
// Discussions — they are public by design (Giscus embeds them client-side), so
// there's no secret to protect here.
//
// repoId / category / categoryId are generated per-repo by giscus.app and cannot
// be derived — paste them in below. Until all four are set, isGiscusConfigured()
// is false and the comment/guestbook widgets render nothing (no broken iframe).

// `repo` must be "owner/name"; the template-literal type enforces the slash.
type Repo = `${string}/${string}`

export const giscusConfig = {
  // Derived from the site's git remote (github.com/usmann-01/UsmanMunawar.dev).
  // Confirm this matches the "repo" field in your giscus.app config.
  repo: 'usmann-01/UsmanMunawar.dev' as Repo,
  // TODO: paste from giscus.app ("repo-id").
  repoId: '',
  // TODO: paste from giscus.app (category name, e.g. "General" or "Comments").
  category: '',
  // TODO: paste from giscus.app ("category-id").
  categoryId: ''
}

// Built-in Giscus theme that best matches the site's dark palette. Swap for a
// custom theme URL (https://…/giscus-theme.css) later if a pixel-exact match to
// the --color-* tokens is wanted; dark_dimmed is the closest built-in for now.
export const giscusTheme = 'dark_dimmed'

// True only when every required value is filled in. Pages guard the widget (and
// its heading) on this so an unconfigured deploy shows no empty "Comments"
// section rather than a broken Giscus error frame.
export function isGiscusConfigured(): boolean {
  return Boolean(giscusConfig.repoId && giscusConfig.category && giscusConfig.categoryId)
}
