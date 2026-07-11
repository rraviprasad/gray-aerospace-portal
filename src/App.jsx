import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TopBar from './components/TopBar'
import Dashboard from './components/Dashboard'
import BPCodeModule from './components/BPCodeModule'

const screens = {
  'bp-code': BPCodeModule,
}

export default function App() {
  const [activeModule, setActiveModule] = useState(null)

  const ActiveScreen = activeModule ? screens[activeModule.id] : null

  return (
    <div className="min-h-screen bg-hangar-950">
      <TopBar activeModuleName={activeModule?.name} onBack={() => setActiveModule(null)} />
      <AnimatePresence mode="wait">
        {ActiveScreen ? (
          <motion.div
            key={activeModule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveScreen />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard onOpenModule={setActiveModule} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
