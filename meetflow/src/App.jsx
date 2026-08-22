import { BrowserRouter, Routes, Route } from "react-router-dom";

// ==================== HOME ====================
import Home from "./pages/Home/Home";

// ==================== AUTH ====================
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// ==================== DASHBOARD ====================
import Dashboard from "./pages/Dashboard/Dashboard";

// ==================== MEETING ====================
import CreateMeeting from "./pages/Meeting/CreateMeeting";
import JoinMeeting from "./pages/Meeting/JoinMeeting";
import MeetingRoom from "./pages/Meeting/MeetingRoom";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================================
            HOME
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================================
            AUTHENTICATION
        ========================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================================
            DASHBOARD
        ========================================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* =========================================
            MEETING
        ========================================= */}

        {/* Create a new meeting */}
        <Route
          path="/meeting/create"
          element={<CreateMeeting />}
        />


        {/* Join an existing meeting */}
        <Route
          path="/meeting/join"
          element={<JoinMeeting />}
        />


        {/* Actual meeting room */}
        <Route
          path="/meeting/:meetingId"
          element={<MeetingRoom />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;