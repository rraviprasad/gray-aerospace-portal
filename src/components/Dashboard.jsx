import { motion } from 'framer-motion'
import { modules } from '../data/modules'
import { ArrowUpRight, Lock } from 'lucide-react'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function Dashboard({ onOpenModule }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 blueprint-grid" />

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-2"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-signal-amber">
            OPERATIONS DASHBOARD
          </span>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-100 text-glow-amber sm:text-4xl">
            Select a module
          </h1>
          <p className="max-w-xl text-sm text-ink-500">
            Business partners, procurement, inventory, and shipping — all in one console.
            10 modules configured, 1 online.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {modules.map((m) => {
            const Icon = m.icon
            return (
              <motion.button
                key={m.id}
                variants={item}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => m.ready && onOpenModule(m)}
                disabled={!m.ready}
                className={`hud-corners group relative flex flex-col items-start gap-4 overflow-hidden rounded-xl border p-5 text-left transition-colors ${
                  m.ready
                    ? 'border-hangar-700 bg-hangar-850 hover:border-signal-amber/60 hover:bg-hangar-800 cursor-pointer'
                    : 'border-hangar-800 bg-hangar-900/60 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex w-full items-start justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-ink-500">
                    {m.code}
                  </span>
                  {m.ready ? (
                    <ArrowUpRight
                      size={14}
                      className="text-ink-500 transition-colors group-hover:text-signal-amber"
                    />
                  ) : (
                    <Lock size={12} className="text-ink-500" />
                  )}
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                    m.ready
                      ? 'border-signal-amber/30 bg-signal-amber/10 text-signal-amber'
                      : 'border-hangar-600 bg-hangar-800 text-ink-500'
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="font-display text-sm font-semibold text-ink-100">{m.name}</p>
                  <p className="mt-0.5 text-[11px] text-ink-500">{m.sub}</p>
                </div>

                {!m.ready && (
                  <span className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-widest text-ink-500">
                    Coming soon
                  </span>
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
