export default function TickerBar() {
  return (
    <div className="relative w-full h-[36px] md:h-[50px] flex items-center ticketBar overflow-hidden">
      <div className="flex items-center justify-center w-full px-2 md:px-4 overflow-hidden">
        <span className="text-[#ebeafa] text-center text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-primary font-medium line-clamp-1">
          $Logen token launch coming soon. Contract address will appear here.
        </span>
      </div>
    </div>
  )
}
