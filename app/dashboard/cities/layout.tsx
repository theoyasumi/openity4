import AdminGuard from "@/components/auth/AdminGuard";

export default function CitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}