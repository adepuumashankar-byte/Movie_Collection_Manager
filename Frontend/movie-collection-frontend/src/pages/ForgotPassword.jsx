import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {forgotPassword,verifyOtp,resetPassword} from "../services/authService";
import "../styles/forgotPassword.css";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ===========================
    // Send OTP
    // ===========================
    const handleSendOtp = async () => {

        try {

            setLoading(true);

            const message = await forgotPassword(email);

            alert(message);

            setStep(2);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Account does not exist."
            );

        } finally {

            setLoading(false);
        }
    };

    // ===========================
    // Verify OTP
    // ===========================
    const handleVerifyOtp = async () => {

        try {

            setLoading(true);

            const message = await verifyOtp(email, otp);

            alert(message);

            setStep(3);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid OTP"
            );

        } finally {

            setLoading(false);
        }
    };

    // ===========================
    // Reset Password
    // ===========================
    const handleResetPassword = async () => {

        if (newPassword !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }

        try {

            setLoading(true);

            const message = await resetPassword(
                email,
                newPassword
            );

            alert(message);

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Password reset failed."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

<div className="forgot-page">

    <div className="forgot-card">

        <div className="text-center mb-4">

            <div className="forgot-icon">

                <i className="bi bi-shield-lock-fill"></i>

            </div>

            <h2 className="forgot-title mt-3">

                Forgot Password

            </h2>

            <p className="text-light">

                Reset your password in three simple steps

            </p>

        </div>

        {/* Progress */}

        <div className="progress mb-4">

            <div
                className={`progress-bar ${
                    step === 1
                        ? "w-25"
                        : step === 2
                        ? "w-50"
                        : "w-100"
                }`}
            ></div>

        </div>

        {/* STEP 1 */}

        {step === 1 && (

            <div className="fade-step">

                <div className="mb-4">

                    <label className="form-label">

                        Email Address

                    </label>

                    <div className="input-group">

                        <span className="input-group-text">

                            <i className="bi bi-envelope-fill"></i>

                        </span>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter registered email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                    </div>

                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={handleSendOtp}
                    disabled={loading}
                >

                    {

                        loading ?

                        <>

                            <span className="spinner-border spinner-border-sm me-2"></span>

                            Sending OTP...

                        </>

                        :

                        <>

                            <i className="bi bi-send-fill me-2"></i>

                            Send OTP

                        </>

                    }

                </button>

            </div>

        )}

        {/* STEP 2 */}

        {step===2 && (

            <div className="fade-step">

                <div className="mb-4">

                    <label className="form-label">

                        OTP

                    </label>

                    <div className="input-group">

                        <span className="input-group-text">

                            <i className="bi bi-key-fill"></i>

                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e)=>setOtp(e.target.value)}
                        />

                    </div>

                </div>

                <button
                    className="btn btn-success w-100"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                >

                    {

                        loading ?

                        <>

                            <span className="spinner-border spinner-border-sm me-2"></span>

                            Verifying...

                        </>

                        :

                        <>

                            <i className="bi bi-patch-check-fill me-2"></i>

                            Verify OTP

                        </>

                    }

                </button>

            </div>

        )}

        {/* STEP 3 */}

        {step===3 && (

            <div className="fade-step">

                <div className="mb-3">

                    <label className="form-label">

                        New Password

                    </label>

                    <div className="input-group">

                        <span className="input-group-text">

                            <i className="bi bi-lock-fill"></i>

                        </span>

                        <input
                            type={showPassword?"text":"password"}
                            className="form-control"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                        />

                        <button
                            className="btn btn-outline-light"
                            type="button"
                            onClick={()=>setShowPassword(!showPassword)}
                        >

                            <i className={
                                showPassword
                                ?"bi bi-eye-slash-fill"
                                :"bi bi-eye-fill"
                            }></i>

                        </button>

                    </div>

                </div>

                <div className="mb-4">

                    <label className="form-label">

                        Confirm Password

                    </label>

                    <input
                        type={showPassword?"text":"password"}
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />

                </div>

                <button
                    className="btn btn-danger w-100"
                    onClick={handleResetPassword}
                    disabled={loading}
                >

                    {

                        loading ?

                        <>

                            <span className="spinner-border spinner-border-sm me-2"></span>

                            Updating...

                        </>

                        :

                        <>

                            <i className="bi bi-arrow-repeat me-2"></i>

                            Reset Password

                        </>

                    }

                </button>

            </div>

        )}

        <hr className="my-4"/>

        <div className="text-center">

            <button
                className="btn btn-outline-info rounded-pill px-4"
                onClick={()=>navigate("/login")}
            >

                <i className="bi bi-arrow-left me-2"></i>

                Back to Login

            </button>

        </div>

    </div>

</div>

);
};

export default ForgotPassword;