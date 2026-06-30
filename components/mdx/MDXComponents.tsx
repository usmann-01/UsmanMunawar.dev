import Link from 'next/link'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import type { ComponentPropsWithoutRef } from 'react'

// Custom elements available inside every .mdx post. Prose typography is handled by
// the `.prose` styles in globals.css; these overrides cover behaviour that CSS can't,
// like client-side routing for internal links.
export const mdxComponents: MDXRemoteProps['components'] = {
  a: ({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) => {
    const isInternal = href.startsWith('/') || href.startsWith('#')
    if (isInternal) {
      return <Link href={href} {...props} />
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
  }
}
