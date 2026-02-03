import { Corner } from '../ui'

export function CapacityBox({ value }: { value: string }) {
  return (
    <div
      className="relative w-[60px] h-[60px] sm:w-[81px] sm:h-[81px] flex items-center justify-center font-primary font-medium text-[24px] sm:text-[31px]"
      style={{
        border: '2.25px solid rgba(132, 141, 232, 0.12)',
        background: 'rgba(132, 141, 232, 0.04)',
        lineHeight: '143%',
        letterSpacing: '0.01em',
        color: '#848de8',
      }}
    >
      <Corner className="top-0 left-0" color="#848de8" />
      <Corner className="top-0 right-0 rotate-90" color="#848de8" />
      <Corner className="bottom-0 right-0 rotate-180" color="#848de8" />
      <Corner className="bottom-0 left-0 -rotate-90" color="#848de8" />
      {value}
    </div>
  )
}
