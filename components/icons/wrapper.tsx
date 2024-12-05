"use client";

import { IconWrapperProps } from "./types";

export const IconWrapper = ({ children, className = "h-6 w-6" }: IconWrapperProps) => (
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