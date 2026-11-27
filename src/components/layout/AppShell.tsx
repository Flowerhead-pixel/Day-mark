import { NavLink, Outlet } from 'react-router-dom'
import { TimerBar } from '../TimerBar'
import { UpdateBanner } from '../UpdateBanner'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/goals', label: 'Goals' },
  { to: '/time', label: 'Time' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/settings', label: 'Settings' },
]

export function AppShell() {
  return (
    <div className="min-h-screen md:flex">
      {/* Desktop: compact sidebar */}
      <aside className="hidden w-44 shrink-0 border-r border-line md:block">
        <div className="sticky top-0 flex h-screen flex-col px-5 py-8">
          <div className="mb-10 font-serif text-2xl tracking-tight">Daymark</div>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'bg-ink text-paper' : 'text-mute hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-8 md:px-10 md:pb-16 md:pt-12">
        <TimerBar />
        <Outlet />
      </main>

      <UpdateBanner />

      {/* Mobile: bottom navigation */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-line bg-paper md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `py-3.5 text-center text-[11px] ${
                isActive ? 'font-semibold text-ink underline underline-offset-8' : 'text-mute'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
