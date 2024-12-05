import LocksmithGuard from "@/components/auth/LocksmithGuard";

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocksmithGuard>{children}</LocksmithGuard>;
}