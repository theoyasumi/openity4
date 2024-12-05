import AdminGuard from "@/components/auth/AdminGuard";

export default function LocksmithsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}