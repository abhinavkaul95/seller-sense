export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left branding */}
      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <h1 className="text-4xl font-extrabold mb-4">Seller Sense</h1>
        <p className="text-xl opacity-90 max-w-md">
          One AI-powered intelligence layer for Amazon, eBay & modern e-commerce
          sellers.
        </p>
      </div>

      {/* Right auth */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
