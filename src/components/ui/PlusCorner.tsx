export function PlusCorner({ className }: { className?: string }) {
  return (
    <svg className={`absolute ${className}`} width="11" height="11" viewBox="0 0 11 11" fill="none">
      <rect x="5" width="1" height="11" fill="#EDEDFA" />
      <rect y="5" width="11" height="1" fill="#EDEDFA" />
    </svg>
  )
}
