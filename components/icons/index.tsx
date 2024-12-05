"use client";

import { SVGProps } from "react";

const IconWrapper = ({ children, className = "h-6 w-6" }: { children: React.ReactNode; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const LoaderIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </IconWrapper>
);

export const SearchIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconWrapper>
);

export const ArrowRightIcon = ({ className = "h-4 w-4 ml-2" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </IconWrapper>
);

export const ArrowUpIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="m18 15-6-6-6 6" />
  </IconWrapper>
);

export const ArrowDownIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="m6 9 6 6 6-6" />
  </IconWrapper>
);

export const PlusIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconWrapper>
);

export const XIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconWrapper>
);

export const MapPinIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </IconWrapper>
);

export const KeyIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="m21 2-9.6 9.6"/>
    <path d="m15.5 7.5 3 3L22 7l-3-3"/>
  </IconWrapper>
);

export const ChevronRightIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="m9 18 6-6-6-6" />
  </IconWrapper>
);

export const MenuIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </IconWrapper>
);

export const DoorIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="M13 4h3a2 2 0 0 1 2 2v14"/>
    <path d="M2 20h3"/>
    <path d="M13 20h9"/>
    <path d="M10 12v.01"/>
    <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"/>
  </IconWrapper>
);

export const FileTextIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </IconWrapper>
);

export const CampaignIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="M19 4v16" />
    <path d="M12 4v16" />
    <path d="M5 4v16" />
  </IconWrapper>
);

export const PriceTagIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </IconWrapper>
);

export const HelpCircleIcon = ({ className = "h-6 w-6" }: SVGProps<SVGSVGElement>) => (
  <IconWrapper className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </IconWrapper>
);