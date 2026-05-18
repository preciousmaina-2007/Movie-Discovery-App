function StatusMessage({ children, tone = 'neutral' }) {
  const toneClass =
    tone === 'error'
      ? 'border-rose-400/40 bg-rose-950/50 text-rose-100'
      : 'border-white/10 bg-white/5 text-slate-300'

  return (
    <div className={`rounded-md border p-4 text-sm ${toneClass}`}>{children}</div>
  )
}

export default StatusMessage
