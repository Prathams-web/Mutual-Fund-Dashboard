// src/components/layout/Container.tsx
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-screen-2xl mx-auto">{children}</div>
  );
}
