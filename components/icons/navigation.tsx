"use client";

import { IconProps } from "./types";
import { IconWrapper } from "./wrapper";

export const MenuIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <IconWrapper className={className}>
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </IconWrapper>
);

export const ChevronRightIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <IconWrapper className={className}>
    <path d="m9 18 6-6-6-6" />
  </IconWrapper>
);

export const ArrowRightIcon = ({ className = "h-4 w-4 ml-2" }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </IconWrapper>
);

export const ArrowUpIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <IconWrapper className={className}>
    <path d="m18 15-6-6-6 6" />
  </IconWrapper>
);

export const ArrowDownIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <IconWrapper className={className}>
    <path d="m6 9 6 6 6-6" />
  </IconWrapper>
);