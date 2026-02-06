export default function HeaderTicker() {
  return (
    <div
      className="w-full"
      style={{
        backdropFilter: 'blur(10px)',
        boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 12px 32px 0 rgba(132, 141, 232, 0.06), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
        background: 'rgba(1, 1, 14, 0.1)',
        padding: '18px',
      }}
    >
      <p
        className="font-primary font-medium text-[14px] sm:text-[16px] text-center text-[#ebeafa]"
        style={{
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        $Logen token launch coming soon. Contract address will appear here.
      </p>
    </div>
  )
}
