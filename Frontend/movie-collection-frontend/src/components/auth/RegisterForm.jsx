import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../../styles/register.css";

const RegisterForm = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

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

            const response = await registerUser(formData);

            alert(response);

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page d-flex justify-content-center align-items-center">

            <div className="login-card shadow-lg rounded-4 fade-in">

                <div className="text-center mb-4">

                    <div className="movie-icon mb-3">

                        <i className="bi bi-person-plus-fill"></i>

                    </div>

                    <h2 className="login-title fw-bold">

                        Create Account

                    </h2>

                    <p className="text-light opacity-75">

                        Join Movie Collection Manager 🎬

                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Name */}

                    <div className="mb-4">

                        <label className="form-label fw-semibold">

                            <i className="bi bi-person-fill me-2"></i>

                            Full Name

                        </label>

                        <div className="input-group input-group-lg">

                            <span className="input-group-text">

                                <i className="bi bi-person-fill"></i>

                            </span>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

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

                    <div className="mb-4">

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
                                placeholder="Create Password"
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

                    <button
                        type="submit"
                        className="btn btn-success btn-lg w-100 rounded-3 shadow"
                        disabled={loading}
                    >

                        {

                            loading ?

                                <>

                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                    Creating Account...

                                </>

                                :

                                <>

                                    <i className="bi bi-person-check-fill me-2"></i>

                                    Register

                                </>

                        }

                    </button>

                </form>

                <div className="text-center my-4">

                    <div className="text-light opacity-50">

                        ───── OR ─────

                    </div>

                </div>

                <div className="text-center">

                    <p className="text-light mb-3">

                        Already have an account?

                    </p>

                    <button
                        className="btn btn-outline-info rounded-pill px-4"
                        onClick={() => navigate("/")}
                    >

                        <i className="bi bi-box-arrow-in-right me-2"></i>

                        Login

                    </button>

                </div>

            </div>

        </div>

    );

};

export default RegisterForm;