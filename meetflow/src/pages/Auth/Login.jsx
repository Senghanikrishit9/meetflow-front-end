import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("TOKEN SAVED:", data.token);

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-indigo-600 opacity-10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-600 opacity-10 blur-3xl" />
      </div>

      <nav className="relative z-10 border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold">
              M
            </div>

            <span className="text-xl font-bold">
              Meet<span className="text-indigo-400">Flow</span>
            </span>
          </Link>

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

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

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

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">

            {error && (
              <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <form
              className="space-y-5"
              onSubmit={handleLogin}
            >

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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>

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

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>

            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs text-slate-500">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>

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