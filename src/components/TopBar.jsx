import { motion } from 'framer-motion'
import { ChevronLeft, Radar } from 'lucide-react'

export default function TopBar({ activeModuleName, onBack }) {
  return (
    <header className="sticky top-0 z-20 border-b border-hangar-700 bg-hangar-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {activeModuleName ? (
            <button
              onClick={onBack}
              className="hud-corners flex items-center gap-1.5 rounded-md border border-hangar-600 px-2.5 py-1.5 text-xs font-medium text-ink-300 transition-colors hover:border-signal-amber hover:text-signal-amber"
            >
              <ChevronLeft size={14} />
              Dashboard
            </button>
          ) : (
            <motion.div
              initial={{ rotate: -8, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-signal-amber/40 bg-signal-amber/10 text-signal-amber"
            >
              <Radar size={17} strokeWidth={2} />
            </motion.div>
          )}
          <div className="leading-tight">
            <p className="font-display text-[13px] font-semibold tracking-[0.18em] text-ink-100 uppercase">
              Gray Aerospace <span className="text-signal-amber">Portal</span>
            </p>
            <p className="font-mono text-[10px] tracking-widest text-ink-500">
              {activeModuleName ? `MODULE / ${activeModuleName.toUpperCase()}` : 'ADMIN CONSOLE'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-hangar-700 bg-hangar-850 px-3 py-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-green shadow-[0_0_8px_rgba(61,220,151,0.8)]" />
            <span className="font-mono text-[10px] tracking-wider text-ink-300">SYSTEM ONLINE</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hangar-600 bg-hangar-800 font-mono text-[11px] text-ink-300">
            RP
          </div>
        </div>
      </div>
    </header>
  )
}
