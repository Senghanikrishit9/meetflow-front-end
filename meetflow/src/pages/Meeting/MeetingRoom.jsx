import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function MeetingRoom() {
  const { meetingId } = useParams();
  const navigate = useNavigate();

  // --------------------------------------------------
  // Refs
  // --------------------------------------------------

  const videoRef = useRef(null);
  const screenVideoRef = useRef(null);

  const streamRef = useRef(null);
  const screenStreamRef = useRef(null);

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [copied, setCopied] = useState(false);
  const [cameraError, setCameraError] = useState("");

  // --------------------------------------------------
  // Start camera when meeting opens
  // --------------------------------------------------

  useEffect(() => {
    startMedia();

    return () => {
      stopAllStreams();
    };
  }, []);

  // --------------------------------------------------
  // Reconnect stream whenever camera state changes
  // --------------------------------------------------

  useEffect(() => {
    if (
      cameraOn &&
      videoRef.current &&
      streamRef.current
    ) {
      videoRef.current.srcObject = streamRef.current;

      videoRef.current.play().catch(() => {});
    }
  }, [cameraOn]);

  // --------------------------------------------------
  // Start camera + microphone
  // --------------------------------------------------

  const startMedia = async () => {
    try {
      setCameraError("");

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play().catch(() => {});
      }

      setCameraOn(true);
      setMicOn(true);
    } catch (error) {
      console.error("Media error:", error);

      setCameraOn(false);
      setMicOn(false);

      setCameraError(
        "Camera or microphone permission was denied. Please allow access in your browser."
      );
    }
  };

  // --------------------------------------------------
  // Stop everything
  // --------------------------------------------------

  const stopAllStreams = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      screenStreamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (screenVideoRef.current) {
      screenVideoRef.current.srcObject = null;
    }
  };

  // --------------------------------------------------
  // CAMERA
  // --------------------------------------------------

  const toggleCamera = async () => {
    try {
      // ----------------------------------------------
      // No stream exists
      // ----------------------------------------------

      if (!streamRef.current) {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          await videoRef.current.play().catch(() => {});
        }

        setCameraOn(true);
        setCameraError("");

        return;
      }

      // ----------------------------------------------
      // Find current video track
      // ----------------------------------------------

      let videoTrack =
        streamRef.current.getVideoTracks()[0];

      // ----------------------------------------------
      // Track doesn't exist or has ended
      // ----------------------------------------------

      if (
        !videoTrack ||
        videoTrack.readyState === "ended"
      ) {
        const newStream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
          });

        const newVideoTrack =
          newStream.getVideoTracks()[0];

        // Remove old tracks
        streamRef.current
          .getVideoTracks()
          .forEach((track) => {
            track.stop();
            streamRef.current.removeTrack(track);
          });

        // Add new track
        streamRef.current.addTrack(
          newVideoTrack
        );

        // Connect stream again
        if (videoRef.current) {
          videoRef.current.srcObject =
            streamRef.current;

          await videoRef.current.play().catch(() => {});
        }

        setCameraOn(true);
        setCameraError("");

        return;
      }

      // ----------------------------------------------
      // NORMAL CAMERA ON / OFF
      //
      // IMPORTANT:
      // We DON'T call track.stop().
      // ----------------------------------------------

      videoTrack.enabled = !videoTrack.enabled;

      setCameraOn(videoTrack.enabled);

      // Make sure video has stream
      if (videoRef.current) {
        videoRef.current.srcObject =
          streamRef.current;

        if (videoTrack.enabled) {
          await videoRef.current.play().catch(() => {});
        }
      }
    } catch (error) {
      console.error("Camera error:", error);

      setCameraOn(false);

      setCameraError(
        "Unable to access the camera. Please check browser permissions."
      );
    }
  };

  // --------------------------------------------------
  // MICROPHONE
  // --------------------------------------------------

  const toggleMic = async () => {
    try {
      // No stream
      if (!streamRef.current) {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setCameraOn(true);
        setMicOn(true);

        return;
      }

      let audioTrack =
        streamRef.current.getAudioTracks()[0];

      // Audio track ended
      if (
        !audioTrack ||
        audioTrack.readyState === "ended"
      ) {
        const newStream =
          await navigator.mediaDevices.getUserMedia({
            audio: true,
          });

        const newAudioTrack =
          newStream.getAudioTracks()[0];

        streamRef.current.addTrack(
          newAudioTrack
        );

        if (videoRef.current) {
          videoRef.current.srcObject =
            streamRef.current;
        }

        setMicOn(true);

        return;
      }

      // Normal mic toggle
      audioTrack.enabled = !audioTrack.enabled;

      setMicOn(audioTrack.enabled);
    } catch (error) {
      console.error("Microphone error:", error);

      setMicOn(false);

      setCameraError(
        "Unable to access the microphone."
      );
    }
  };

  // --------------------------------------------------
  // SCREEN SHARE
  // --------------------------------------------------

  const toggleScreenShare = async () => {
    if (screenSharing) {
      stopScreenShare();
      return;
    }

    try {
      const screenStream =
        await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

      screenStreamRef.current = screenStream;

      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject =
          screenStream;

        await screenVideoRef.current
          .play()
          .catch(() => {});
      }

      setScreenSharing(true);

      const screenTrack =
        screenStream.getVideoTracks()[0];

      if (screenTrack) {
        screenTrack.onended = () => {
          stopScreenShare();
        };
      }
    } catch (error) {
      console.log(
        "Screen sharing cancelled:",
        error
      );

      setScreenSharing(false);
    }
  };

  // --------------------------------------------------
  // STOP SCREEN SHARE
  // --------------------------------------------------

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      screenStreamRef.current = null;
    }

    if (screenVideoRef.current) {
      screenVideoRef.current.srcObject = null;
    }

    setScreenSharing(false);
  };

  // --------------------------------------------------
  // COPY MEETING LINK
  // --------------------------------------------------

  const copyMeetingLink = async () => {
    const link =
      `${window.location.origin}/meeting/${meetingId}`;

    try {
      await navigator.clipboard.writeText(link);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Unable to copy link:",
        error
      );
    }
  };

  // --------------------------------------------------
  // CHAT
  // --------------------------------------------------

  const sendMessage = (event) => {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      sender: "You",
    };

    setMessages((previous) => [
      ...previous,
      newMessage,
    ]);

    setMessage("");
  };

  // --------------------------------------------------
  // LEAVE MEETING
  // --------------------------------------------------

  const leaveMeeting = () => {
    stopAllStreams();

    navigate("/dashboard");
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#080b14] text-white">

      {/* ==============================================
          MAIN MEETING
      ============================================== */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* ============================================
            HEADER
        ============================================ */}

        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#0b0f1a] px-3 sm:px-6">

          {/* Logo */}

          <div className="flex min-w-0 items-center gap-3">

            <Link
              to="/dashboard"
              className="flex shrink-0 items-center gap-2"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 font-bold">
                M
              </div>

              <span className="hidden text-lg font-bold sm:block">
                Meet
                <span className="text-indigo-400">
                  Flow
                </span>
              </span>

            </Link>

            <div className="hidden h-6 w-px bg-white/10 sm:block" />

            <div className="min-w-0">

              <p className="hidden text-xs text-slate-500 sm:block">
                Meeting ID
              </p>

              <p className="max-w-[130px] truncate font-mono text-xs text-slate-300 sm:max-w-none sm:text-sm">
                {meetingId}
              </p>

            </div>

          </div>

          {/* Header buttons */}

          <div className="flex items-center gap-2">

            <button
              onClick={copyMeetingLink}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 sm:px-4 sm:text-sm"
            >
              {copied ? "Copied!" : "Invite"}
            </button>

            <button
              onClick={leaveMeeting}
              className="rounded-xl bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 sm:px-4 sm:text-sm"
            >
              Leave
            </button>

          </div>

        </header>

        {/* ============================================
            VIDEO AREA
        ============================================ */}

        <main className="relative flex min-h-0 flex-1 items-center justify-center p-2 sm:p-4">

          {/* ==========================================
              SCREEN SHARE
          ========================================== */}

          {screenSharing && (
            <div className="absolute inset-2 z-20 overflow-hidden rounded-2xl border border-white/10 bg-black sm:inset-4">

              <video
                ref={screenVideoRef}
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />

              <div className="absolute left-3 top-3 rounded-lg bg-black/70 px-3 py-2 text-xs backdrop-blur sm:left-4 sm:top-4">
                You are sharing your screen
              </div>

              <button
                onClick={stopScreenShare}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500"
              >
                Stop Sharing
              </button>

            </div>
          )}

          {/* ==========================================
              VIDEO GRID
          ========================================== */}

          <div
            className={`grid h-full w-full gap-2 sm:gap-3 ${
              screenSharing
                ? "pointer-events-none opacity-0"
                : "opacity-100"
            }`}
          >

            {/* ========================================
                MY VIDEO
            ======================================== */}

            <div className="relative min-h-0 overflow-hidden rounded-xl border border-white/10 bg-[#111827] sm:rounded-2xl">

              {/* IMPORTANT:
                  Video is ALWAYS mounted.
                  We only hide it when camera is off.
              */}

              <div className="relative h-full w-full">

                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className={`h-full w-full object-cover ${
                    cameraOn
                      ? "block"
                      : "hidden"
                  }`}
                />

                {/* Camera OFF UI */}

                {!cameraOn && (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#111827]">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-xl font-bold sm:h-20 sm:w-20 sm:text-2xl">
                      Y
                    </div>

                    <p className="mt-3 text-xs text-slate-400 sm:text-sm">
                      Camera is off
                    </p>

                  </div>
                )}

              </div>

              {/* Name */}

              <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1.5 text-xs backdrop-blur sm:bottom-4 sm:left-4 sm:px-3 sm:py-2 sm:text-sm">
                You
              </div>

              {/* Mic status */}

              <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-sm backdrop-blur sm:bottom-4 sm:right-4 sm:h-9 sm:w-9">
                {micOn ? "🎤" : "🔇"}
              </div>

            </div>

            {/* ========================================
                OTHER PARTICIPANT
            ======================================== */}

            <div className="relative hidden min-h-0 overflow-hidden rounded-xl border border-white/10 bg-[#111827] md:block sm:rounded-2xl">

              <div className="flex h-full flex-col items-center justify-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-xl font-bold sm:h-20 sm:w-20 sm:text-2xl">
                  ?
                </div>

                <p className="mt-3 text-xs text-slate-400 sm:text-sm">
                  Waiting for someone to join...
                </p>

              </div>

            </div>

          </div>

          {/* ==========================================
              ERROR
          ========================================== */}

          {cameraError && (
            <div className="absolute bottom-3 left-1/2 z-30 w-[calc(100%-24px)] max-w-md -translate-x-1/2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-xs text-red-300 backdrop-blur sm:bottom-5 sm:text-sm">

              {cameraError}

              <button
                onClick={startMedia}
                className="ml-2 font-semibold text-red-200 underline"
              >
                Try again
              </button>

            </div>
          )}

        </main>

        {/* ============================================
            CONTROLS
        ============================================ */}

        <footer className="flex h-18 shrink-0 items-center justify-center border-t border-white/10 bg-[#0b0f1a] px-2 sm:h-20 sm:px-4">

          <div className="flex items-center gap-1.5 sm:gap-3">

            {/* MIC */}

            <button
              onClick={toggleMic}
              title={
                micOn
                  ? "Mute microphone"
                  : "Unmute microphone"
              }
              className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                micOn
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-red-500 text-white hover:bg-red-400"
              }`}
            >
              {micOn ? "🎤" : "🔇"}
            </button>

            {/* CAMERA */}

            <button
              onClick={toggleCamera}
              title={
                cameraOn
                  ? "Turn camera off"
                  : "Turn camera on"
              }
              className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                cameraOn
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-red-500 text-white hover:bg-red-400"
              }`}
            >
              {cameraOn ? "📹" : "🚫"}
            </button>

            {/* SCREEN SHARE */}

            <button
              onClick={toggleScreenShare}
              title={
                screenSharing
                  ? "Stop sharing"
                  : "Share screen"
              }
              className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-auto sm:gap-2 sm:px-4 ${
                screenSharing
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >

              <span>🖥️</span>

              <span className="hidden text-sm sm:inline">
                {screenSharing
                  ? "Stop Sharing"
                  : "Share Screen"}
              </span>

            </button>

            {/* PARTICIPANTS */}

            <button
              onClick={() => {
                setParticipantsOpen(
                  !participantsOpen
                );

                setChatOpen(false);
              }}
              title="Participants"
              className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-auto sm:gap-2 sm:px-4 ${
                participantsOpen
                  ? "bg-indigo-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >

              <span>👥</span>

              <span className="hidden text-sm sm:inline">
                People
              </span>

            </button>

            {/* CHAT */}

            <button
              onClick={() => {
                setChatOpen(!chatOpen);
                setParticipantsOpen(false);
              }}
              title="Chat"
              className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-auto sm:gap-2 sm:px-4 ${
                chatOpen
                  ? "bg-indigo-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >

              <span>💬</span>

              <span className="hidden text-sm sm:inline">
                Chat
              </span>

            </button>

            {/* LEAVE */}

            <button
              onClick={leaveMeeting}
              title="Leave meeting"
              className="flex h-11 items-center justify-center rounded-full bg-red-600 px-4 text-sm font-semibold hover:bg-red-500 sm:h-12 sm:gap-2 sm:px-5"
            >

              <span>☎</span>

              <span className="hidden sm:inline">
                Leave
              </span>

            </button>

          </div>

        </footer>

      </div>

      {/* ==============================================
          CHAT / PARTICIPANTS SIDEBAR
      ============================================== */}

      {(chatOpen || participantsOpen) && (
        <aside className="absolute inset-x-0 bottom-0 top-0 z-50 flex w-full flex-col border-l border-white/10 bg-[#0b0f1a] shadow-2xl sm:relative sm:w-[360px]">

          {/* Sidebar header */}

          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">

            <h2 className="font-semibold">
              {chatOpen
                ? "Meeting Chat"
                : "Participants"}
            </h2>

            <button
              onClick={() => {
                setChatOpen(false);
                setParticipantsOpen(false);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-lg text-slate-400 hover:bg-white/10 hover:text-white"
            >
              ×
            </button>

          </div>

          {/* ==========================================
              PARTICIPANTS
          ========================================== */}

          {participantsOpen && (
            <div className="flex-1 overflow-y-auto p-4">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-sm text-slate-400">
                  In this meeting
                </p>

                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400">
                  1 person
                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl p-3 hover:bg-white/5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold">
                    Y
                  </div>

                  <div>

                    <p className="text-sm font-medium">
                      You
                    </p>

                    <p className="text-xs text-slate-500">
                      Host
                    </p>

                  </div>

                </div>

                <span>
                  {micOn ? "🎤" : "🔇"}
                </span>

              </div>

            </div>
          )}

          {/* ==========================================
              CHAT
          ========================================== */}

          {chatOpen && (
            <>
              <div className="flex-1 overflow-y-auto p-4">

                {messages.length === 0 ? (

                  <div className="flex h-full flex-col items-center justify-center text-center">

                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                      💬
                    </div>

                    <p className="font-medium">
                      No messages yet
                    </p>

                    <p className="mt-1 max-w-xs text-sm text-slate-500">
                      Send a message to everyone in the meeting.
                    </p>

                  </div>

                ) : (

                  <div className="space-y-4">

                    {messages.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl bg-white/5 p-3"
                      >

                        <p className="mb-1 text-xs font-medium text-indigo-400">
                          {item.sender}
                        </p>

                        <p className="wrap-break-word text-sm text-slate-300">
                          {item.text}
                        </p>

                      </div>
                    ))}

                  </div>

                )}

              </div>

              {/* Chat input */}

              <form
                onSubmit={sendMessage}
                className="border-t border-white/10 p-4"
              >

                <div className="flex gap-2">

                  <input
                    type="text"
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                    placeholder="Type a message..."
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                  />

                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-4 text-sm font-semibold hover:bg-indigo-500"
                  >
                    Send
                  </button>

                </div>

              </form>
            </>
          )}

        </aside>
      )}

    </div>
  );
}

export default MeetingRoom;