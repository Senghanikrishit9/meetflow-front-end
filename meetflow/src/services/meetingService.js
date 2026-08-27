const API_URL = "http://localhost:5000/api";


// ==========================================
// GET TOKEN
// ==========================================

const getToken = () => {
    return localStorage.getItem("token");
};


// ==========================================
// CREATE MEETING
// ==========================================

export const createMeeting = async (title) => {

    const token = getToken();

    const response = await fetch(`${API_URL}/meetings`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
            title
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create meeting"
        );
    }

    return data;
};


// ==========================================
// GET MY MEETINGS
// ==========================================

export const getMyMeetings = async () => {

    const token = getToken();

    const response = await fetch(`${API_URL}/meetings`, {
        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to get meetings"
        );
    }

    return data;
};


// ==========================================
// GET MEETING BY CODE
// ==========================================

export const getMeetingByCode = async (meetingCode) => {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/meetings/${meetingCode}`,
        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Meeting not found"
        );
    }

    return data;
};


// ==========================================
// START MEETING
// ==========================================

export const startMeeting = async (meetingId) => {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/meetings/${meetingId}/start`,
        {
            method: "PUT",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to start meeting"
        );
    }

    return data;
};


// ==========================================
// END MEETING
// ==========================================

export const endMeeting = async (meetingId) => {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/meetings/${meetingId}/end`,
        {
            method: "PUT",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to end meeting"
        );
    }

    return data;
};