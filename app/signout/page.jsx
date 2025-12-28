"use client";
export default function Signout() {
  const handleSignout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Sign Out</h2>
        <button
          onClick={handleSignout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
