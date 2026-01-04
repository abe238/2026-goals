import { LogOut, User as UserIcon } from 'lucide-react'

interface UserMenuProps {
  user: {
    name: string
    avatarUrl?: string
  }
  onLogout?: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <UserIcon className="w-5 h-5 text-neutral-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-200 truncate">{user.name}</p>
      </div>
      {onLogout && (
        <button
          onClick={onLogout}
          className="p-2 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors"
          aria-label="Log out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
