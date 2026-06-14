import { ReactNode } from 'react';
import DashboardHeader from './DashboardHeader';
import TickerBar from '../layout/TickerBar';
import { Corner } from '../ui';

function GridCorner({ className }: { className?: string }) {
  return (
    <svg className={`absolute ${className || ''}`} width="6" height="11" viewBox="0 0 6 11" fill="none">
      <rect y="6" width="1" height="6" transform="rotate(-90 0 6)" fill="white" />
      <mask id="path-2-inside-1_2_12234" fill="white">
        <path d="M0 11L1.31174e-07 0L1 1.19249e-08L1 11L0 11Z" />
      </mask>
      <path d="M0 11L1 11L1 1.19249e-08L1.31174e-07 0L-1 -1.19249e-08L-1 11L0 11Z" fill="white" mask="url(#path-2-inside-1_2_12234)" />
    </svg>
  );
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#02030e] overflow-x-hidden">
      <DashboardHeader />
      <TickerBar />

      <div className="relative">
        <div className="relative max-w-[1310px] mx-auto px-0">
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />

          <div className="hidden md:block absolute left-[40px] top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
          <div className="hidden md:block absolute right-[40px] top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />

          <div className="h-4 sm:h-6 md:h-[40px]" />

          <div className="relative">
            <div className="absolute top-0 left-[-50vw] right-[-50vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

            <GridCorner className="hidden sm:block top-0 left-0" />
            <GridCorner className="hidden sm:block top-0 right-0 rotate-180" />

            <div className="relative">{children}</div>

            <div className="absolute bottom-0 left-[-50vw] right-[-50vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

            <GridCorner className="hidden sm:block bottom-0 left-0" />
            <GridCorner className="hidden sm:block bottom-0 right-0 rotate-180" />

            <Corner className="hidden md:block bottom-0 left-[36px]" />
            <Corner className="hidden md:block bottom-0 right-[36px]" />
          </div>

          <div className="h-4 sm:h-6 md:h-[40px]" />
        </div>
      </div>
    </div>
  );
}
