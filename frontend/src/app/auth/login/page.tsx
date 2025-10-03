export default function LoginPage() {
  return (
    <div className="flex w-full h-full items-center justify-center bg-black">
      <div className="w-full h-full max-w-md bg-black text-white p-8 rounded-2xl shadow-2xl border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Sign in</h2>
          <span className="text-sm text-gray-400">Welcome back</span>
        </div>

        <form className="space-y-5" aria-label="login form">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full bg-transparent border border-gray-800 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-3 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H8m8 0a4 4 0 10-8 0m8 0v6m-8-6v6"
                />
              </svg>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Your password"
                className="w-full bg-transparent border border-gray-800 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
              />
              <button
                type="button"
                aria-label="toggle password"
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M10 3C5.454 3 1.73 6.02.5 10c1.23 3.98 4.954 7 9.5 7s8.27-3.02 9.5-7C18.27 6.02 14.546 3 10 3zm0 11a4 4 0 110-8 4 4 0 010 8z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-300 hover:cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded bg-transparent border-gray-600 text-white hover:cursor-pointer focus:ring-0"
              />
              Remember me
            </label>
            <a
              href="/auth/forgot-password"
              className="text-gray-400 hover:text-white hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-white text-black font-semibold shadow-sm hover:brightness-95 hover:cursor-pointer active:scale-98 transition-transform"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/auth/signUp" className="text-gray-200 underline">
            Create one
          </a>
        </div>
      </div>
    </div>
  );
}
