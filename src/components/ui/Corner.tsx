export function Corner({ className, color = 'white' }: { className?: string; color?: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      className={`absolute ${className}`}
    >
      <rect width="1" height="6" fill={color} />
      <rect width="6" height="1" fill={color} />
    </svg>
  )
}
