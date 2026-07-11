import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FilePlus2, Save, RefreshCw, Download, Search, Check } from 'lucide-react'

const seedRecords = [
  { bpCode: 'BP-1001', name: 'Titan Alloys Pvt Ltd', city: 'Pune', country: 'India', type: 'Supplier' },
  { bpCode: 'BP-1002', name: 'Skyline Freight Co.', city: 'Mumbai', country: 'India', type: 'Customer' },
  { bpCode: 'BP-1003', name: 'Meridian Components', city: 'Bengaluru', country: 'India', type: 'Supplier' },
]

const emptyForm = { name: '', address: '', zip: '', city: '', country: '', isSupplier: false, isCustomer: false }

function ToolbarButton({ icon: Icon, label, onClick, tone = 'default' }) {
  const tones = {
    default: 'border-hangar-600 text-ink-300 hover:border-signal-amber hover:text-signal-amber',
    primary: 'border-signal-amber/50 text-signal-amber hover:bg-signal-amber/10',
  }
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md border bg-hangar-850 px-3 py-2 text-xs font-medium transition-colors ${tones[tone]}`}
    >
      <Icon size={14} strokeWidth={2} />
      {label}
    </button>
  )
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-md border border-hangar-600 bg-hangar-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 outline-none transition-colors focus:border-signal-amber focus:ring-1 focus:ring-signal-amber/40'

export default function BPCodeModule() {
  const [form, setForm] = useState(emptyForm)
  const [records, setRecords] = useState(seedRecords)
  const [toast, setToast] = useState(null)
  const [citySearch, setCitySearch] = useState('')

  const cityOptions = ['Mumbai', 'Pune', 'Bengaluru', 'Chennai', 'Hyderabad', 'Delhi', 'Ahmedabad']
  const filteredCities = useMemo(
    () => cityOptions.filter((c) => c.toLowerCase().includes(citySearch.toLowerCase())),
    [citySearch]
  )

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  const handleNew = () => {
    setForm(emptyForm)
    setCitySearch('')
    showToast('Form cleared — ready for new entry')
  }

  const handleSave = () => {
    if (!form.name || !form.address || !form.city || !form.country) {
      showToast('Fill required fields before saving')
      return
    }
    const nextCode = `BP-${1000 + records.length + 1}`
    const type = form.isSupplier && form.isCustomer ? 'Supplier / Customer' : form.isSupplier ? 'Supplier' : form.isCustomer ? 'Customer' : '—'
    setRecords((prev) => [{ bpCode: nextCode, name: form.name, city: form.city, country: form.country, type }, ...prev])
    showToast(`Saved as ${nextCode}`)
    setForm(emptyForm)
    setCitySearch('')
  }

  const handleRefresh = () => showToast('Grid refreshed')
  const handleExport = () => showToast('Exporting BP records…')

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex flex-col gap-1">
        <span className="font-mono text-[11px] tracking-[0.25em] text-signal-amber">MODULE 01</span>
        <h1 className="font-display text-2xl font-semibold text-ink-100">BP Code — Business Partner</h1>
        <p className="text-sm text-ink-500">Create supplier or customer records. Saved records feed Purchase &amp; Sales Orders.</p>
      </div>

      {/* Toolbar */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <ToolbarButton icon={FilePlus2} label="New" onClick={handleNew} />
        <ToolbarButton icon={Save} label="Save" onClick={handleSave} tone="primary" />
        <ToolbarButton icon={RefreshCw} label="Refresh" onClick={handleRefresh} />
        <ToolbarButton icon={Download} label="Export" onClick={handleExport} />
      </div>

      {/* Form */}
      <div className="hud-corners rounded-xl border border-hangar-700 bg-hangar-850 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Name *">
            <input
              className={inputClass}
              placeholder="Business partner name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>

          <Field label="Address *">
            <input
              className={inputClass}
              placeholder="Street, area"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </Field>

          <Field label="Zip Code">
            <input
              className={inputClass}
              placeholder="e.g. 421201"
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
            />
          </Field>

          <Field label="City *">
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                className={`${inputClass} pl-8`}
                placeholder="Search city"
                value={citySearch || form.city}
                onChange={(e) => {
                  setCitySearch(e.target.value)
                  setForm({ ...form, city: e.target.value })
                }}
              />
              {citySearch && filteredCities.length > 0 && !filteredCities.includes(form.city) && (
                <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-hangar-600 bg-hangar-900 shadow-xl">
                  {filteredCities.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setForm({ ...form, city: c })
                        setCitySearch(c)
                      }}
                      className="block w-full px-3 py-2 text-left text-sm text-ink-300 hover:bg-hangar-800 hover:text-signal-amber"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Field>

          <Field label="Country *">
            <input
              className={inputClass}
              placeholder="e.g. India"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </Field>

          <Field label="Type">
            <div className="flex items-center gap-4 pt-2">
              {['isSupplier', 'isCustomer'].map((key) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-ink-300">
                  <span
                    onClick={() => setForm({ ...form, [key]: !form[key] })}
                    className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                      form[key] ? 'border-signal-amber bg-signal-amber/20 text-signal-amber' : 'border-hangar-600'
                    }`}
                  >
                    {form[key] && <Check size={11} strokeWidth={3} />}
                  </span>
                  {key === 'isSupplier' ? 'Supplier' : 'Customer'}
                </label>
              ))}
            </div>
          </Field>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8">
        <p className="mb-3 font-mono text-[11px] tracking-widest text-ink-500">SAVED RECORDS ({records.length})</p>
        <div className="overflow-hidden rounded-xl border border-hangar-700">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-hangar-700 bg-hangar-850 font-mono text-[10px] uppercase tracking-widest text-ink-500">
                <th className="px-4 py-3">BP Code</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, idx) => (
                <tr key={r.bpCode} className={`border-b border-hangar-800 ${idx % 2 === 0 ? 'bg-hangar-900' : 'bg-hangar-950'} hover:bg-hangar-800/70`}>
                  <td className="px-4 py-3 font-mono text-signal-cyan">{r.bpCode}</td>
                  <td className="px-4 py-3 text-ink-100">{r.name}</td>
                  <td className="px-4 py-3 text-ink-300">{r.city}</td>
                  <td className="px-4 py-3 text-ink-300">{r.country}</td>
                  <td className="px-4 py-3 text-ink-300">{r.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-md border border-signal-amber/40 bg-hangar-850 px-4 py-2.5 font-mono text-xs text-signal-amber shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
