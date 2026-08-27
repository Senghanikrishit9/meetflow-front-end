import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createMeeting,
  getMyMeetings,
} from "../../services/meetingService";


function Dashboard() {

  const navigate = useNavigate();


  // ==========================================
  // STATE
  // ==========================================

  const [meetings, setMeetings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [creatingMeeting, setCreatingMeeting] = useState(false);

  const [meetingTitle, setMeetingTitle] = useState("");

  const [showCreateMeeting, setShowCreateMeeting] = useState(false);

  const [error, setError] = useState("");


  // ==========================================
  // GET USER
  // ==========================================

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const userName = user?.name || "Krishit";

  const firstLetter = userName.charAt(0).toUpperCase();


  // ==========================================
  // LOAD MEETINGS
  // ==========================================

  useEffect(() => {

    const loadMeetings = async () => {

      try {

        setLoading(true);

        setError("");

        const data = await getMyMeetings();

        setMeetings(data.meetings || []);

      } catch (err) {

        console.error("LOAD MEETINGS ERROR:", err);

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };


    loadMeetings();

  }, []);


  // ==========================================
  // CREATE MEETING
  // ==========================================

  const handleCreateMeeting = async (e) => {

    e.preventDefault();


    if (!meetingTitle.trim()) {

      setError("Please enter a meeting title.");

      return;

    }


    try {

      setCreatingMeeting(true);

      setError("");


      const data = await createMeeting(
        meetingTitle.trim()
      );


      console.log(
        "REAL MEETING CREATED:",
        data
      );


      const meetingCode =
        data?.meeting?.meetingCode;


      if (!meetingCode) {

        throw new Error(
          "Meeting was created but no meeting code was returned."
        );

      }


      // Close popup
      setShowCreateMeeting(false);

      // Clear title
      setMeetingTitle("");


      // Go to real meeting
      navigate(
        `/meeting/${meetingCode}`
      );


    } catch (err) {

      console.error(
        "CREATE MEETING ERROR:",
        err
      );

      setError(err.message);

    } finally {

      setCreatingMeeting(false);

    }

  };


  // ==========================================
  // JOIN MEETING
  // ==========================================

  const handleJoinMeeting = (meetingCode) => {

    navigate(
      `/meeting/${meetingCode}`
    );

  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };


  // ==========================================
  // STATS
  // ==========================================

  const meetingsHosted = meetings.length;


  const meetingsThisMonth =
    meetings.filter((meeting) => {

      if (!meeting.created_at) {
        return false;
      }

      const date =
        new Date(meeting.created_at);

      const now =
        new Date();

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );

    }).length;


  const peopleConnected =
    meetings.reduce(
      (total, meeting) =>
        total +
        Number(
          meeting.participant_count || 0
        ),
      0
    );


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="min-h-screen bg-slate-950 text-white">


      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-indigo-600 opacity-10 blur-3xl" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-600 opacity-10 blur-3xl" />

      </div>


      {/* ==========================================
          NAVBAR
      ========================================== */}

      <header className="relative z-20 border-b border-white/10 bg-slate-950">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">


          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold">
              M
            </div>

            <span className="text-xl font-bold">
              Meet<span className="text-indigo-400">
                Flow
              </span>
            </span>

          </Link>


          {/* RIGHT SIDE */}

          <div className="flex items-center gap-4">


            {/* NOTIFICATION */}

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            >

              🔔

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500" />

            </button>


            {/* USER */}

            <button
              type="button"
              onClick={handleLogout}
              title="Click to logout"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold">
                {firstLetter}
              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-semibold">
                  {userName}
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


      {/* ==========================================
          MAIN
      ========================================== */}

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10">


        {/* ==========================================
            WELCOME
        ========================================== */}

        <section className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-400">
            Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Good morning, {userName} 👋
          </h1>

          <p className="mt-2 text-slate-400">
            Ready to connect with your team?
          </p>

        </section>


        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (

          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">

            {error}

          </div>

        )}


        {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <section className="grid gap-5 md:grid-cols-2">


          {/* CREATE MEETING */}

          <button
            type="button"
            onClick={() => {
              setError("");
              setShowCreateMeeting(true);
            }}
            className="group rounded-2xl border border-indigo-500/20 bg-indigo-600/10 p-6 text-left transition hover:-translate-y-1 hover:bg-indigo-600/15"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-2xl">
              +
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Start a New Meeting
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Create a real meeting and invite your friends or teammates.
            </p>

            <div className="mt-5 text-sm font-semibold text-indigo-400">

              Create meeting

              <span className="ml-2 transition group-hover:ml-3">
                →
              </span>

            </div>

          </button>


          {/* JOIN MEETING */}

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


        {/* ==========================================
            STATS
        ========================================== */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


          {/* STAT 1 */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-sm text-slate-500">
              Meetings this month
            </p>

            <p className="mt-3 text-3xl font-bold">

              {loading
                ? "..."
                : meetingsThisMonth}

            </p>

            <p className="mt-2 text-xs text-slate-500">
              Real meetings from database
            </p>

          </div>


          {/* STAT 2 */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-sm text-slate-500">
              Meeting time
            </p>

            <p className="mt-3 text-3xl font-bold">
              0h
            </p>

            <p className="mt-2 text-xs text-slate-500">
              We'll calculate this next
            </p>

          </div>


          {/* STAT 3 */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-sm text-slate-500">
              People connected
            </p>

            <p className="mt-3 text-3xl font-bold">

              {loading
                ? "..."
                : peopleConnected}

            </p>

            <p className="mt-2 text-xs text-slate-500">
              Total participants
            </p>

          </div>


          {/* STAT 4 */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-sm text-slate-500">
              Meetings hosted
            </p>

            <p className="mt-3 text-3xl font-bold">

              {loading
                ? "..."
                : meetingsHosted}

            </p>

            <p className="mt-2 text-xs text-indigo-400">
              Keep connecting 🚀
            </p>

          </div>

        </section>


        {/* ==========================================
            UPCOMING MEETINGS
        ========================================== */}

        <section className="mt-12">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Upcoming Meetings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your real meetings
              </p>

            </div>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-500">

              Loading meetings...

            </div>

          )}


          {/* EMPTY */}

          {!loading &&
            meetings.length === 0 && (

              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center">

                <div className="text-4xl">
                  📹
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  No meetings yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Create your first meeting to get started.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowCreateMeeting(true)
                  }
                  className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold hover:bg-indigo-500"
                >
                  Create Meeting
                </button>

              </div>

            )}


          {/* REAL MEETINGS */}

          {!loading &&
            meetings.map((meeting) => (

              <div
                key={meeting.id}
                className="mb-3 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-xl">
                    📹
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {meeting.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">

                      Code:{" "}

                      <span className="font-mono text-indigo-400">
                        {meeting.meeting_code}
                      </span>

                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    handleJoinMeeting(
                      meeting.meeting_code
                    )
                  }
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold hover:bg-indigo-500"
                >
                  Join
                </button>

              </div>

            ))}

        </section>


        {/* ==========================================
            RECENT MEETINGS
        ========================================== */}

        <section className="mt-12 pb-12">

          <div className="mb-5">

            <h2 className="text-xl font-bold">
              Recent Meetings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest real meeting activity
            </p>

          </div>


          {loading && (

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-500">

              Loading...

            </div>

          )}


          {!loading &&
            meetings.length === 0 && (

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-500">

                No recent meetings.

              </div>

            )}


          {!loading &&
            meetings.length > 0 && (

              <div className="grid gap-4 md:grid-cols-3">

                {meetings
                  .slice(0, 3)
                  .map((meeting) => (

                    <div
                      key={meeting.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10"
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20">
                          📹
                        </div>

                        <span className="text-xs text-slate-500">
                          #{meeting.id}
                        </span>

                      </div>


                      <h3 className="mt-5 font-semibold">
                        {meeting.title}
                      </h3>


                      <p className="mt-2 text-sm text-slate-500">
                        Meeting code:
                      </p>


                      <p className="mt-1 font-mono text-sm text-indigo-400">
                        {meeting.meeting_code}
                      </p>


                      <button
                        type="button"
                        onClick={() =>
                          handleJoinMeeting(
                            meeting.meeting_code
                          )
                        }
                        className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-sm font-semibold hover:bg-white/10"
                      >
                        Open Meeting
                      </button>

                    </div>

                  ))}

              </div>

            )}

        </section>

      </main>


      {/* ==========================================
          CREATE MEETING MODAL
      ========================================== */}

      {showCreateMeeting && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">


          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">


            {/* HEADER */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Create Meeting
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a real meeting in MeetFlow.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowCreateMeeting(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleCreateMeeting}
              className="mt-6"
            >

              <label className="text-sm font-medium text-slate-300">
                Meeting title
              </label>


              <input
                type="text"
                value={meetingTitle}
                onChange={(e) =>
                  setMeetingTitle(e.target.value)
                }
                placeholder="e.g. Team Discussion"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                autoFocus
              />


              {error && (

                <p className="mt-2 text-sm text-red-400">
                  {error}
                </p>

              )}


              <button
                type="submit"
                disabled={creatingMeeting}
                className="mt-5 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {creatingMeeting
                  ? "Creating Meeting..."
                  : "Create Meeting"}

              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  );
}


export default Dashboard;