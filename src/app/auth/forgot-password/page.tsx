export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Enter your email" className="w-full p-2 border rounded-md" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
