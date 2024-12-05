import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}