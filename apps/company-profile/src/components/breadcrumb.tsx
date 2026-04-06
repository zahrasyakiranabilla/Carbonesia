import { Link } from '@tanstack/react-router'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="px-15 py-6 text-sm text-[#213E88] text-shadow-2xs">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-1">{'>>'}</span>}
          {item.href ? (
            <Link to={item.href} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}