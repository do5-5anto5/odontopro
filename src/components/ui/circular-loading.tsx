export default function CircularLoading({
  borderColor,
  noBorder = false
}: {
  noBorder?: boolean
  borderColor?: string
}) {
  const border = noBorder? '' : `border-2 border-${borderColor}`
  return (
    <div
      className={`w-5 h-5 ${border} rounded-full animate-spin text-sm bg-emerald-500      aria-label="Carregando..."`}
    >
      <div className="w-2 h-2 bg-white rounded-full"></div>
    </div>
  )
}
