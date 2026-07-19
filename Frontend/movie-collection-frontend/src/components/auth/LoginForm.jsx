import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "../../styles/login.css";

const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await loginUser(formData);

            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            if (error.response) {

                alert(error.response.data.message || "Login Failed");

            } else {

                alert("Server Error");
            }

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="login-page d-flex justify-content-center align-items-center">

            <div className="login-card shadow-lg rounded-4 fade-in">

                <div className="text-center mb-4">

                    <div className="movie-icon mb-3">

                        <i className="bi bi-film"></i>

                    </div>

                    <h2 className="login-title fw-bold">
                        Movie Collection Manager
                    </h2>

                    <p className="text-light opacity-75">
                        Welcome Back 👋
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Email */}

                    <div className="mb-4">

                        <label className="form-label fw-semibold">

                            <i className="bi bi-envelope-fill me-2"></i>

                            Email

                        </label>

                        <div className="input-group input-group-lg">

                            <span className="input-group-text">

                                <i className="bi bi-envelope-fill"></i>

                            </span>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    {/* Password */}

                    <div className="mb-3">

                        <label className="form-label fw-semibold">

                            <i className="bi bi-lock-fill me-2"></i>

                            Password

                        </label>

                        <div className="input-group input-group-lg">

                            <span className="input-group-text">

                                <i className="bi bi-lock-fill"></i>

                            </span>

                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="btn btn-outline-light"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >

                                <i
                                    className={
                                        showPassword
                                            ? "bi bi-eye-slash-fill"
                                            : "bi bi-eye-fill"
                                    }
                                ></i>

                            </button>

                        </div>

                    </div>

                    {/* Forgot Password */}

                    <div className="d-flex justify-content-end mb-4">

                        <button
                            type="button"
                            className="btn btn-link text-decoration-none"
                            onClick={() =>
                                navigate("/forgot-password")
                            }
                        >

                            <i className="bi bi-key-fill me-2"></i>

                            Forgot Password?

                        </button>

                    </div>

                    {/* Login Button */}

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 rounded-3 shadow"

                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                ></span>

                                Logging In...
                            </>

                        ) : (

                            <>
                                <i className="bi bi-box-arrow-in-right me-2"></i>

                                Login
                            </>

                        )}

                    </button>

                </form>

                <div className="text-center my-4">

                    <div className="text-light opacity-50">
                        ───── OR ─────
                    </div>

                </div>

                <div className="text-center">

                    <p className="text-light mb-3">

                        Don't have an account?

                    </p>

                    <button
                        className="btn btn-outline-info rounded-pill px-4"
                        onClick={() =>
                            navigate("/register")
                        }
                    >

                        <i className="bi bi-person-plus-fill me-2"></i>

                        Create Account

                    </button>

                </div>

            </div>

        </div>

    );

};

export default LoginForm;