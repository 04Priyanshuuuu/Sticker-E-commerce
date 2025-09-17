export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form className="space-y-4">
          <input type="password" placeholder="New Password" className="w-full p-2 border rounded-md" required />
          <input type="password" placeholder="Confirm New Password" className="w-full p-2 border rounded-md" required />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
