import AuthLayoutComponent from '@/layouts/AuthLayout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
}
