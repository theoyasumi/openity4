"use client";

import { IconProps } from "./types";
import { IconWrapper } from "./wrapper";

export const SearchIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <IconWrapper className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconWrapper>
);

export const LoaderIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </IconWrapper>
);

export const PlusIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <IconWrapper className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconWrapper>
);

export const XIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconWrapper>
);