"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

interface BreadcrumbSegment {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
  className?: string;
}

export function Breadcrumb({ segments, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {segments.map((segment, index) => (
          <li key={segment.href} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-muted-foreground mx-1" />
            )}
            {index === segments.length - 1 ? (
              <span className="text-muted-foreground">{segment.name}</span>
            ) : (
              <Link
                href={segment.href}
                className="text-primary hover:text-primary/80"
              >
                {segment.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}