import { ThemeToggle } from '@/components/ThemeToggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Mecanizou</h1>
        <ThemeToggle />
      </header>

      <div className="flex flex-col h-full">{children}</div>
    </div>
  );
}
