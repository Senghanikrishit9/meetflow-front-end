import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinMeeting() {
  const navigate = useNavigate();

  const [meetingInput, setMeetingInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoinMeeting = (e) => {
    e.preventDefault();

    setError("");

    const input = meetingInput.trim();

    if (!input) {
      setError("Please enter a meeting ID or meeting link.");
      return;
    }

    let meetingId = input;

    /*
      If user enters:

      http://localhost:5173/meeting/ABC123

      we extract:

      ABC123
    */

    if (input.includes("/meeting/")) {
      try {
        const url = new URL(input);
        const parts = url.pathname.split("/").filter(Boolean);

        const meetingIndex = parts.indexOf("meeting");

        if (
          meetingIndex !== -1 &&
          parts[meetingIndex + 1]
        ) {
          meetingId = parts[meetingIndex + 1];
        }
      } catch {
        setError("Please enter a valid meeting link.");
        return;
      }
    }

    if (!meetingId) {
      setError("Invalid meeting ID.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate(`/meeting/${meetingId}`, {
        state: {
          joinedFrom: "join-page",
        },
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-10 text-white sm:px-6 lg:px-8">

      {/* Background */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />

        <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />

      </div>

      {/* Main */}

      <div className="relative mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-xl font-bold shadow-lg shadow-indigo-600/30">
            M
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Join a Meeting
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Enter a meeting ID or paste the meeting link
            shared with you.
          </p>

        </div>

        {/* Card */}

        <form
          onSubmit={handleJoinMeeting}
          className="mx-auto max-w-3xl"
        >

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">

            {/* Input */}

            <div>

              <label
                htmlFor="meetingInput"
                className="mb-3 block text-sm font-semibold text-slate-200 sm:text-base"
              >
                Meeting ID or meeting link
              </label>

              <input
                id="meetingInput"
                type="text"
                value={meetingInput}
                onChange={(e) => {
                  setMeetingInput(e.target.value);
                  setError("");
                }}
                placeholder="Example: ABC123-456789"
                className="h-16 w-full rounded-2xl border border-white/10 bg-[#020617] px-5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-base"
              />

            </div>

            {/* Error */}

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex h-16 w-full items-center justify-center rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 text-base font-bold text-white shadow-xl shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:from-indigo-400 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <div className="flex items-center gap-3">

                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Joining Meeting...

                </div>
              ) : (
                <>
                  Join Meeting

                  <span className="ml-2 text-lg">
                    →
                  </span>
                </>
              )}

            </button>

          </div>

        </form>

        {/* Help */}

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-6">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-xl">
              🔗
            </div>

            <div>

              <h3 className="font-semibold text-white">
                How to join
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ask the meeting host for the meeting ID
                or meeting link. Paste it above and click
                Join Meeting.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default JoinMeeting;