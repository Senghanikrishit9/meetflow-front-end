import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-indigo-600 opacity-10 blur-3xl" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-600 opacity-10 blur-3xl" />

      </div>


      {/* ================= NAVBAR ================= */}

      <header className="relative z-20 border-b border-white/10 bg-slate-950">

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


          {/* Right side */}

          <div className="flex items-center gap-4">

            {/* Notification */}

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            >
              🔔

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500" />

            </button>


            {/* User */}

            <button
              type="button"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold">
                K
              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-semibold">
                  Krishit
                </p>

                <p className="text-xs text-slate-500">
                  Free Account
                </p>

              </div>

              <span className="hidden text-xs text-slate-500 sm:block">
                ▼
              </span>

            </button>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10">


        {/* Welcome */}

        <section className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-400">
            Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Good morning, Krishit 👋
          </h1>

          <p className="mt-2 text-slate-400">
            Ready to connect with your team?
          </p>

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className="grid gap-5 md:grid-cols-2">


          {/* Create Meeting */}

          <Link
            to="/meeting/create"
            className="group rounded-2xl border border-indigo-500/20 bg-indigo-600/10 p-6 transition hover:-translate-y-1 hover:bg-indigo-600/15"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-2xl">
              +
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Start a New Meeting
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Create a meeting and invite your friends or teammates.
            </p>

            <div className="mt-5 text-sm font-semibold text-indigo-400">
              Create meeting
              <span className="ml-2 transition group-hover:ml-3">
                →
              </span>
            </div>

          </Link>


          {/* Join Meeting */}

          <Link
            to="/meeting/join"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 text-2xl text-purple-300">
              ↗
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Join a Meeting
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Enter a meeting code and join your meeting instantly.
            </p>

            <div className="mt-5 text-sm font-semibold text-purple-400">
              Join meeting
              <span className="ml-2 transition group-hover:ml-3">
                →
              </span>
            </div>

          </Link>

        </section>


        {/* ================= STATS ================= */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


          {/* Stat 1 */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-sm text-slate-500">
              Meetings this month
            </p>

            <p className="mt-3 text-3xl font-bold">
              24
            </p>

            <p className="mt-2 text-xs text-emerald-400">
              ↑ 12% from last month
            </p>

          </div>


          {/* Stat 2 */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-sm text-slate-500">
              Meeting time
            </p>

            <p className="mt-3 text-3xl font-bold">
              18h
            </p>

            <p className="mt-2 text-xs text-slate-500">
              This month
            </p>

          </div>


          {/* Stat 3 */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-sm text-slate-500">
              People connected
            </p>

            <p className="mt-3 text-3xl font-bold">
              87
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Total participants
            </p>

          </div>


          {/* Stat 4 */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-sm text-slate-500">
              Meetings hosted
            </p>

            <p className="mt-3 text-3xl font-bold">
              16
            </p>

            <p className="mt-2 text-xs text-indigo-400">
              Keep connecting 🚀
            </p>

          </div>

        </section>


        {/* ================= UPCOMING ================= */}

        <section className="mt-12">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Upcoming Meetings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your scheduled meetings
              </p>

            </div>

            <button
              type="button"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              View all →
            </button>

          </div>


          {/* Meeting 1 */}

          <div className="mb-3 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-xl">
                📹
              </div>

              <div>

                <h3 className="font-semibold">
                  Team Standup
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Today • 10:30 AM • 5 participants
                </p>

              </div>

            </div>

            <button
              type="button"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold hover:bg-indigo-500"
            >
              Join
            </button>

          </div>


          {/* Meeting 2 */}

          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 text-xl">
                📹
              </div>

              <div>

                <h3 className="font-semibold">
                  Project Discussion
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Tomorrow • 2:00 PM • 8 participants
                </p>

              </div>

            </div>

            <button
              type="button"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              Details
            </button>

          </div>

        </section>


        {/* ================= RECENT MEETINGS ================= */}

        <section className="mt-12 pb-12">

          <div className="mb-5">

            <h2 className="text-xl font-bold">
              Recent Meetings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest meeting activity
            </p>

          </div>


          <div className="grid gap-4 md:grid-cols-3">


            {/* Recent 1 */}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10">

              <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20">
                  📹
                </div>

                <button
                  type="button"
                  className="text-lg text-slate-500 hover:text-white"
                >
                  ⋮
                </button>

              </div>

              <h3 className="mt-5 font-semibold">
                Frontend Discussion
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Yesterday
              </p>

              <p className="mt-1 text-sm text-slate-500">
                42 min • 4 people
              </p>

            </div>


            {/* Recent 2 */}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10">

              <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20">
                  📹
                </div>

                <button
                  type="button"
                  className="text-lg text-slate-500 hover:text-white"
                >
                  ⋮
                </button>

              </div>

              <h3 className="mt-5 font-semibold">
                Project Meeting
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Aug 20
              </p>

              <p className="mt-1 text-sm text-slate-500">
                1 hr 12 min • 6 people
              </p>

            </div>


            {/* Recent 3 */}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10">

              <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/20">
                  📹
                </div>

                <button
                  type="button"
                  className="text-lg text-slate-500 hover:text-white"
                >
                  ⋮
                </button>

              </div>

              <h3 className="mt-5 font-semibold">
                Team Planning
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Aug 18
              </p>

              <p className="mt-1 text-sm text-slate-500">
                35 min • 5 people
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;