export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-screen flex items-stretch justify-center overflow-hidden">
      {children}
    </div>
  );
}
