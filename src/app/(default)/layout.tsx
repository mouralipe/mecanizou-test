import MainLayout from '@/layouts/MainLayout';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
