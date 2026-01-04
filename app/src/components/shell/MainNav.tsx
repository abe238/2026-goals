import type { NavigationItem } from '@/types'

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.href}>
          <button
            onClick={() => onNavigate?.(item.href)}
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-lg
              text-left text-sm font-medium
              transition-all duration-150
              ${
                item.isActive
                  ? 'bg-yellow-400/10 text-yellow-400'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }
            `}
          >
            <span className={`
              w-5 h-5 flex-shrink-0
              ${item.isActive ? 'text-yellow-400' : 'text-neutral-500'}
            `}>
              {item.icon}
            </span>
            <span>{item.label}</span>
            {item.isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400" />
            )}
          </button>
        </li>
      ))}
    </ul>
  )
}
