'use client';

import Link from "next/link";

export const LocksmithLink = ({ href, cityId, children }) => {
  return (
    <Link
      href={href}
      onClick={() => localStorage.setItem("referringCity", cityId)}
    >
      {children}
    </Link>
  );
};