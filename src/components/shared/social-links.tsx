import type { ComponentType, SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1Z" />
    </svg>
  )
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.5 3h6.1l4.3 5.6L17.5 3Zm-1 16h1.7L7.6 4.7H5.8L16.5 19Z" />
    </svg>
  )
}

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2Zm0 6.3a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
      <path d="M16.8 3H7.2A4.2 4.2 0 0 0 3 7.2v9.6A4.2 4.2 0 0 0 7.2 21h9.6a4.2 4.2 0 0 0 4.2-4.2V7.2A4.2 4.2 0 0 0 16.8 3Zm2.9 13.8a2.9 2.9 0 0 1-2.9 2.9H7.2a2.9 2.9 0 0 1-2.9-2.9V7.2a2.9 2.9 0 0 1 2.9-2.9h9.6a2.9 2.9 0 0 1 2.9 2.9v9.6Z" />
      <circle cx="17.2" cy="6.8" r="1" />
    </svg>
  )
}

interface SocialLink {
  label: string
  href: string
  icon: ComponentType<IconProps>
}

export const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://facebook.com/munilosolivos",
    icon: FacebookIcon,
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/munilosolivos",
    icon: XIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/municipalidaddelosolivos",
    icon: InstagramIcon,
  },
]

interface SocialLinksProps {
  className?: string
  iconClassName?: string
}

export function SocialLinks({
  className,
  iconClassName = "size-4",
}: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="inline-flex size-8 items-center justify-center rounded-full text-white/70 dark:text-black/60 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  )
}
