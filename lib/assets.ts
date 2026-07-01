import { existsSync } from 'fs'
import { join } from 'path'

// Server-only: checks whether a real asset file has been dropped into public/
// for a given public path (e.g. "/assets/projects/mini-dbms.jpg"). Lets
// components render the real image once it exists and fall back to a
// labeled placeholder until then, without hardcoding per-asset booleans.
export function assetExists(publicPath: string): boolean {
  return existsSync(join(process.cwd(), 'public', publicPath))
}
