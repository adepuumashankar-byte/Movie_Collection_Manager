import axiosInstance from "../api/axiosConfig";

// ===========================
// Login
// ===========================
export const loginUser = async (data) => {

    const response = await axiosInstance.post(
        "/auth/login",
        data
    );

    return response.data;
};

// ===========================
// Register
// ===========================
export const registerUser = async (data) => {

    const response = await axiosInstance.post(
        "/auth/register",
        data
    );

    return response.data;
};

// ===========================
// Forgot Password
// ===========================
export const forgotPassword = async (email) => {

    const response = await axiosInstance.post(
        "/auth/forgot-password",
        {
            email
        }
    );

    return response.data;
};

// ===========================
// Verify OTP
// ===========================
export const verifyOtp = async (email, otp) => {

    const response = await axiosInstance.post(
        "/auth/verify-otp",
        {
            email,
            otp
        }
    );

    return response.data;
};

// ===========================
// Reset Password
// ===========================
export const resetPassword = async (
    email,
    newPassword
) => {

    const response = await axiosInstance.post(
        "/auth/reset-password",
        {
            email,
            newPassword
        }
    );

    return response.data;
};