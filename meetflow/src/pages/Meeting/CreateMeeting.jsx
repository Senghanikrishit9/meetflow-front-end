import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateMeeting() {
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMeetingId = () => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let firstPart = "";
    let secondPart = "";

    for (let i = 0; i < 4; i++) {
      firstPart += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    for (let i = 0; i < 4; i++) {
      secondPart += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return `MF-${firstPart}-${secondPart}`;
  };


  const handleCreateMeeting = (event) => {
    event.preventDefault();

    const newMeetingId = generateMeetingId();

    const newMeetingLink =
      `${window.location.origin}/meeting/${newMeetingId}`;

    setMeetingId(newMeetingId);
    setMeetingLink(newMeetingLink);
    setCopied(false);
  };


  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.log("Could not copy the link", error);
    }
  };


  const handleStartMeeting = () => {
    if (!meetingId) {
      return;
    }

    navigate(`/meeting/${meetingId}`);
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

          <Link to="/" className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold">
              M
            </div>

            <span className="text-xl font-bold">
              Meet<span className="text-indigo-400">Flow</span>
            </span>

          </Link>


          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
          >
            Back to Dashboard
          </Link>

        </div>

      </nav>


      {/* Main */}

      <main className="relative z-10 mx-auto flex max-w-3xl justify-center px-6 py-16">

        <div className="w-full">


          {/* Header */}

          <div className="mb-10 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-3xl">
              +
            </div>

            <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
              Create a Meeting
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Create a meeting room and invite your friends,
              teammates, or anyone you want to talk with.
            </p>

          </div>


          {/* Create form */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">

            <form
              onSubmit={handleCreateMeeting}
              className="space-y-6"
            >

              {/* Meeting name */}

              <div>

                <label
                  htmlFor="meetingName"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Meeting name
                </label>

                <input
                  id="meetingName"
                  type="text"
                  value={meetingName}
                  onChange={(event) =>
                    setMeetingName(event.target.value)
                  }
                  placeholder="Example: Team Meeting"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>


              {/* Meeting type */}

              <div>

                <p className="mb-3 text-sm font-medium text-slate-200">
                  Meeting type
                </p>

                <div className="grid gap-3 sm:grid-cols-2">

                  <label className="cursor-pointer rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        name="meetingType"
                        value="instant"
                        defaultChecked
                        className="h-4 w-4 accent-indigo-600"
                      />

                      <div>

                        <p className="font-medium">
                          Instant Meeting
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Start immediately
                        </p>

                      </div>

                    </div>

                  </label>


                  <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        name="meetingType"
                        value="scheduled"
                        className="h-4 w-4 accent-indigo-600"
                      />

                      <div>

                        <p className="font-medium">
                          Scheduled
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Coming soon
                        </p>

                      </div>

                    </div>

                  </label>

                </div>

              </div>


              {/* Create button */}

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Create Meeting
              </button>

            </form>


            {/* Generated meeting */}

            {meetingId && (
              <div className="mt-8 border-t border-white/10 pt-8">

                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6">

                  <div className="mb-6">

                    <p className="text-sm text-indigo-300">
                      Meeting created successfully
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      {meetingName}
                    </h2>

                  </div>


                  {/* Meeting ID */}

                  <div className="mb-4">

                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                      Meeting ID
                    </p>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950 px-4 py-3">

                      <span className="font-mono text-lg font-semibold tracking-wider">
                        {meetingId}
                      </span>

                    </div>

                  </div>


                  {/* Meeting link */}

                  <div>

                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                      Meeting link
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row">

                      <input
                        type="text"
                        value={meetingLink}
                        readOnly
                        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none"
                      />

                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
                      >
                        {copied ? "Copied!" : "Copy Link"}
                      </button>

                    </div>

                  </div>


                  {/* Start meeting */}

                  <button
                    type="button"
                    onClick={handleStartMeeting}
                    className="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold hover:bg-indigo-500"
                  >
                    Start Meeting →
                  </button>

                </div>

              </div>
            )}

          </div>


          {/* Information */}

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">

            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                ✓
              </div>

              <div>

                <h3 className="font-semibold">
                  Free to use
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  MeetFlow will use browser-based technology for
                  video and audio communication. No paid video API
                  is required for our core project.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CreateMeeting;