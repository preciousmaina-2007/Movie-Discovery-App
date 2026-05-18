function StatusMessage({ children, tone = 'neutral' }) {
  const toneClass =
    tone === 'error'
      ? 'border-red-300/30 bg-red-950/35 text-red-100'
      : 'border-white/10 bg-white/[0.06] text-zinc-300'

  return (
    <div className={`rounded-md border p-4 text-sm shadow-lg shadow-black/10 ${toneClass}`}>
      {children}
    </div>
  )
}

export default StatusMessage
