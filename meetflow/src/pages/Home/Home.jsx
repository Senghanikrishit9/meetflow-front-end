import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold shadow-lg">
              M
            </div>

            <span className="text-xl font-bold">
              Meet<span className="text-indigo-400">Flow</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-slate-300 hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-slate-300 hover:text-white"
            >
              How it works
            </a>

            <a
              href="#about"
              className="text-sm text-slate-300 hover:text-white"
            >
              About
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white sm:block"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32">

        {/* Background decorations */}
        <div className="pointer-events-none absolute left-10 top-32 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="pointer-events-none absolute right-10 top-40 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16">

          {/* Hero Text */}
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />

              <span className="text-sm text-indigo-200">
                The simple way to meet online
              </span>
            </div>


            <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Meet.
              <span className="text-indigo-400"> Talk.</span>
              <br />
              Connect.
            </h1>


            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              MeetFlow brings video calls, real-time conversations, and
              collaboration together in one simple place.
            </p>


            {/* Hero Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <Link
                to="/register"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 sm:w-auto"
              >
                Start a Meeting

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>


              <Link
                to="/join"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-center text-sm font-semibold text-slate-200 hover:bg-white/10 sm:w-auto"
              >
                Join a Meeting
              </Link>

            </div>


            <p className="mt-5 text-sm text-slate-500">
              No complicated setup • No unnecessary steps
            </p>

          </div>


          {/* ================= MEETING PREVIEW ================= */}
          <div className="mx-auto mt-20 max-w-5xl">

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-3 shadow-2xl">

              {/* Browser header */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950">

                <div className="flex h-12 items-center justify-between border-b border-white/10 px-5">

                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                  </div>

                  <div className="rounded-lg bg-white/5 px-4 py-1.5 text-xs text-slate-400">
                    MeetFlow • Team Meeting
                  </div>

                  <span className="text-xs text-slate-500">
                    04:32
                  </span>

                </div>


                {/* Participants */}
                <div className="p-4">

                  <div className="grid grid-cols-2 gap-3">

                    {/* Person 1 */}
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-indigo-950">

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-xl font-bold">
                        K
                      </div>

                      <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium">
                        Krishit
                      </div>

                      <div className="absolute right-3 top-3 h-3 w-3 rounded-full bg-green-400" />

                    </div>


                    {/* Person 2 */}
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-purple-950">

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-xl font-bold">
                        R
                      </div>

                      <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium">
                        Rahul
                      </div>

                    </div>


                    {/* Person 3 */}
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-emerald-950">

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold">
                        J
                      </div>

                      <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium">
                        Jay
                      </div>

                    </div>


                    {/* Person 4 */}
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-orange-950">

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-xl font-bold">
                        P
                      </div>

                      <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium">
                        Priya
                      </div>

                    </div>

                  </div>


                  {/* Meeting controls */}
                  <div className="mt-5 flex items-center justify-center gap-3">

                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
                    >
                      🎤
                    </button>

                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
                    >
                      📷
                    </button>

                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
                    >
                      🖥️
                    </button>

                    <button
                      type="button"
                      className="flex h-11 w-14 items-center justify-center rounded-full bg-red-500 hover:bg-red-600"
                    >
                      ☎
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="border-t border-white/5 bg-slate-900 py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Everything you need
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              One place for every conversation
            </h2>

            <p className="mt-5 text-lg text-slate-400">
              Simple tools designed to keep your meetings focused and productive.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-3">

            {/* Feature 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
                🎥
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Video Meetings
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Talk face-to-face with your team using video and audio.
              </p>

            </div>


            {/* Feature 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                💬
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Real-time Chat
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Send messages without leaving your meeting.
              </p>

            </div>


            {/* Feature 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">
                🖥️
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Screen Sharing
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Present your screen and collaborate instantly.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="bg-slate-950 py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Start a meeting in three steps
            </h2>

          </div>


          <div className="mt-16 grid gap-10 md:grid-cols-3">

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 font-bold">
                1
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Create
              </h3>

              <p className="mt-3 text-slate-400">
                Create your meeting and receive a unique meeting link.
              </p>
            </div>


            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 font-bold">
                2
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Share
              </h3>

              <p className="mt-3 text-slate-400">
                Send the meeting link to your friends or teammates.
              </p>
            </div>


            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-600 font-bold">
                3
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Connect
              </h3>

              <p className="mt-3 text-slate-400">
                Join the room and start your conversation.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section
        id="about"
        className="border-t border-white/5 bg-indigo-950 py-24"
      >

        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-4xl font-bold sm:text-5xl">
            Your next conversation
            <span className="block text-indigo-400">
              starts here.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            Create your first MeetFlow room and connect with the people who matter.
          </p>

          <Link
            to="/register"
            className="mt-9 inline-flex rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Get Started →
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/5 bg-slate-950 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold">
              M
            </div>

            <span className="font-bold">
              Meet<span className="text-indigo-400">Flow</span>
            </span>

          </div>

          <p className="text-sm text-slate-500">
            © 2026 MeetFlow. Built for better conversations.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;