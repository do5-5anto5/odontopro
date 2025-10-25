export default function CircularLoading({
  borderColor,
}: {
  borderColor: string
}) {
  return (
    <div
      className={`w-5 h-5 border-2 border-${borderColor} border-t-transparent rounded-full animate-spin text-sm bg-emerald-500      aria-label="Carregando..."`}
    >
      <div className="w-2 h-2 bg-white rounded-full"></div>
    </div>
  )
}
