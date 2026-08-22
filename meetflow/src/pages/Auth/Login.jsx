import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Temporary frontend navigation.
    // Real authentication will be connected to the backend later.
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-indigo-600 opacity-10 blur-3xl" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-600 opacity-10 blur-3xl" />
      </div>


      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/10 bg-slate-950">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold">
              M
            </div>

            <span className="text-xl font-bold">
              Meet<span className="text-indigo-400">Flow</span>
            </span>

          </Link>


          {/* Register link */}
          <div className="text-sm text-slate-400">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Register
            </Link>

          </div>

        </div>

      </nav>


      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">


          {/* Heading */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold">
              M
            </div>

            <h1 className="text-3xl font-bold">
              Welcome back
            </h1>

            <p className="mt-3 text-slate-400">
              Sign in to continue to MeetFlow.
            </p>

          </div>


          {/* Login Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">

            <form
              className="space-y-5"
              onSubmit={handleLogin}
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>


              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </button>

                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>


              {/* Remember me */}
              <div className="flex items-center gap-3">

                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 accent-indigo-600"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-400"
                >
                  Remember me
                </label>

              </div>


              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Sign In
              </button>

            </form>


            {/* Divider */}
            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs text-slate-500">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>


            {/* Google button */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >

              <span className="font-bold">
                G
              </span>

              Continue with Google

            </button>

          </div>


          {/* Register */}
          <p className="mt-6 text-center text-sm text-slate-500">

            Don't have an account?

            <Link
              to="/register"
              className="ml-1 font-medium text-indigo-400 hover:text-indigo-300"
            >
              Create account
            </Link>

          </p>

        </div>

      </main>

    </div>
  );
}

export default Login;