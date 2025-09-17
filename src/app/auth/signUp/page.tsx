export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-2 border rounded-md" required />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" required />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" required />
          <input type="password" placeholder="Confirm Password" className="w-full p-2 border rounded-md" required />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md">
            Create Account
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          Already have an account? <a href="/auth/login" className="text-blue-600">Login</a>
        </div>
      </div>
    </div>
  );
}
