import { useEffect, useState } from "react";
import { getAllMovies } from "../../services/movieService";
import MovieTable from "../movies/MovieTable";
import MovieForm from "../movies/MovieForm";
import SearchBar from "../movies/SearchBar";
import "../../styles/dashboard.css";
import MovieDetailsModal from "../movies/MovieDetailsModal";
import { useNavigate } from "react-router-dom";
import MovieAnalytics from "./MovieAnalytics";
const Dashboard = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [viewMovie, setViewMovie] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 5;

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [minRating, setMinRating] = useState("");
    const [sortBy, setSortBy] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {

        try {

            const data = await getAllMovies();

            setMovies(data);

        } catch (error) {

            console.log(error);

            alert("Unable to fetch movies");
        }
    };

    // ==========================
    // Filtering
    // ==========================

    const filteredMovies = movies.filter((movie) => {

        const matchesTitle =
            movie.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesGenre =
            selectedGenre === "" ||
            movie.genre === selectedGenre;

        const matchesLanguage =
            selectedLanguage === "" ||
            movie.language === selectedLanguage;

        const matchesRating =
            minRating === "" ||
            Number(movie.rating) >= Number(minRating);

        return (
            matchesTitle &&
            matchesGenre &&
            matchesLanguage &&
            matchesRating
        );
    });

   // ==========================
// Sorting
// ==========================

const sortedMovies = [...filteredMovies].sort((a, b) => {

    if (sortBy === "title") {

        return a.title.localeCompare(
            b.title
        );
    }

    if (sortBy === "rating") {

        return b.rating - a.rating;
    }

    if (sortBy === "year") {

        return b.releaseYear -
               a.releaseYear;
    }

    if (sortBy === "collection") {

        return (
            b.worldwideCollection -
            a.worldwideCollection
        );
    }

    return 0;
});

    const handleEditMovie = (movie) => {

        setSelectedMovie(movie);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const clearSelectedMovie = () => {
        setSelectedMovie(null);
    };

    const handleViewMovie = (movie) => {
        setViewMovie(movie);
    };

    const closeModal = () => {
        setViewMovie(null);
    };


    // ==========================
// Pagination
// ==========================

const indexOfLastMovie =
    currentPage * moviesPerPage;

const indexOfFirstMovie =
    indexOfLastMovie - moviesPerPage;

const currentMovies =
    sortedMovies.slice(
        indexOfFirstMovie,
        indexOfLastMovie
    );

const totalPages = Math.ceil(
    sortedMovies.length / moviesPerPage
);

    // ==========================
    // Dashboard Statistics
    // ==========================

    const totalMovies = movies.length;

    const averageRating =
        movies.length > 0
            ? (
                  movies.reduce(
                      (sum, movie) =>
                          sum + Number(movie.rating || 0),
                      0
                  ) / movies.length
              ).toFixed(1)
            : 0;

    const totalCollection = movies.reduce(
        (sum, movie) =>
            sum + Number(movie.worldwideCollection || 0),
        0
    );

    const languageCount = new Set(
        movies.map((movie) => movie.language)
    ).size;

    const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
};

    return (

        <div className="container mt-5">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

    <div>

        <h2 className="dashboard-title">
            🎬 Movie Collection Dashboard
        </h2>

        <p className="dashboard-subtitle">
            Manage, Search, Edit and Explore Movies
        </p>

    </div>

    <button
        className="btn btn-danger px-4"
        onClick={handleLogout}
    >
        <i className="bi bi-box-arrow-right me-2"></i>
        Logout
    </button>

</div>

            {/* Statistics */}

            <div className="row g-4 mb-4">

                <div className="col-md-3">
                    <div className="stats-card stats-blue">
                        <i className="bi bi-film stats-icon"></i>
                        <h6>Total Movies</h6>
                        <h2>{totalMovies}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="stats-card stats-yellow">
                        <i className="bi bi-star-fill stats-icon"></i>
                        <h6>Average Rating</h6>
                        <h2>{averageRating}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="stats-card stats-green">
                        <i className="bi bi-cash-stack stats-icon"></i>
                        <h6>Collections</h6>
                        <h2>
                            ₹ {totalCollection.toLocaleString()}
                        </h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="stats-card stats-purple">
                        <i className="bi bi-globe stats-icon"></i>
                        <h6>Languages</h6>
                        <h2>{languageCount}</h2>
                    </div>
                </div>

            </div>


            {/* Top Rated Movies */}

<div className="dashboard-card mb-4">

    <h4 className="card-header-custom">
        ⭐ Top Rated Movies
    </h4>

    <div className="row">

        {[...movies]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
            .map((movie) => (

                <div
                    key={movie.id}
                    className="col-md-4 mb-3"
                >

                    <div className="p-3 border rounded">

                        <h5>{movie.title}</h5>

                        <p>
                            Rating:
                            <strong>
                                {" "}
                                ⭐ {movie.rating}
                            </strong>
                        </p>

                        <p>
                            {movie.language}
                        </p>

                    </div>

                </div>

            ))}

    </div>

</div>

{/* Highest Collection Movies */}

<div className="dashboard-card mb-4">

    <h4 className="card-header-custom">
        💰 Highest Collection Movies
    </h4>

    <div className="row">

        {[...movies]
            .sort(
                (a, b) =>
                    b.worldwideCollection -
                    a.worldwideCollection
            )
            .slice(0, 5)
            .map((movie) => (

                <div
                    key={movie.id}
                    className="col-md-4 mb-3"
                >

                    <div className="p-3 border rounded">

                        <h5>{movie.title}</h5>

                        <p>
                            ₹{" "}
                            {movie.worldwideCollection.toLocaleString()}
                        </p>

                    </div>

                </div>

            ))}

    </div>

</div>

<MovieAnalytics movies={movies} />

            {/* Movie Form */}

            <MovieForm
                onMovieAdded={fetchMovies}
                selectedMovie={selectedMovie}
                clearSelectedMovie={clearSelectedMovie}
            />

            {/* Search */}

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* Filters */}

            <div className="filter-section mb-4">

                <div className="row g-3">

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={selectedGenre}
                            onChange={(e) =>
                                setSelectedGenre(e.target.value)
                            }
                        >
                            <option value="">
                                All Genres
                            </option>

                            {[...new Set(
                                movies.map(movie => movie.genre)
                            )].map((genre, index) => (

                                <option
                                    key={index}
                                    value={genre}
                                >
                                    {genre}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={selectedLanguage}
                            onChange={(e) =>
                                setSelectedLanguage(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                All Languages
                            </option>

                            {[...new Set(
                                movies.map(movie => movie.language)
                            )].map((language, index) => (

                                <option
                                    key={index}
                                    value={language}
                                >
                                    {language}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-md-3">

                        <input
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            className="form-control"
                            placeholder="Minimum Rating"
                            value={minRating}
                            onChange={(e) =>
                                setMinRating(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-3">

    <select
        className="form-select"
        value={sortBy}
        onChange={(e) =>
            setSortBy(e.target.value)
        }
    >

        <option value="">
            Sort By
        </option>

        <option value="title">
            Title (A → Z)
        </option>

        <option value="rating">
            Rating (High → Low)
        </option>

        <option value="year">
            Release Year (Newest)
        </option>

        <option value="collection">
            Collection (Highest)
        </option>

    </select>

</div>

                </div>

            </div>


            <div className="dashboard-card mb-4">

    <h4 className="card-header-custom">
        🎭 Genre Analytics
    </h4>

    <div className="row">

        {[...new Set(
            movies.map(movie => movie.genre)
        )].map((genre, index) => {

            const count = movies.filter(
                movie => movie.genre === genre
            ).length;

            return (

                <div
                    key={index}
                    className="col-md-3 mb-3"
                >

                    <div className="stats-card stats-purple">

                        <h5>{genre}</h5>

                        <h2>{count}</h2>

                        <small>Movies</small>

                    </div>

                </div>

            );

        })}

    </div>

</div>


<div className="dashboard-card mb-4">

    <h4 className="card-header-custom">
        🌎 Language Analytics
    </h4>

    <div className="row">

        {[...new Set(
            movies.map(movie => movie.language)
        )].map((language, index) => {

            const count = movies.filter(
                movie => movie.language === language
            ).length;

            return (

                <div
                    key={index}
                    className="col-md-3 mb-3"
                >

                    <div className="stats-card stats-blue">

                        <h5>{language}</h5>

                        <h2>{count}</h2>

                        <small>Movies</small>

                    </div>

                </div>

            );

        })}

    </div>

</div>


<div className="dashboard-card mb-4">

    <h4 className="card-header-custom">
        🔥 Recently Released Movies
    </h4>

    <ul className="list-group">

        {[...movies]
            .sort(
                (a, b) =>
                    b.releaseYear -
                    a.releaseYear
            )
            .slice(0, 5)
            .map(movie => (

                <li
                    key={movie.id}
                    className="list-group-item d-flex justify-content-between"
                >

                    <span>
                        {movie.title}
                    </span>

                    <strong>
                        {movie.releaseYear}
                    </strong>

                </li>

            ))}

    </ul>

</div>

            {/* Movies */}

            <MovieTable
    movies={currentMovies}
    onEditMovie={handleEditMovie}
    onMovieDeleted={fetchMovies}
    onViewMovie={handleViewMovie}
/>

<div className="d-flex justify-content-center mt-4">

    <nav>

        <ul className="pagination">

            <li
                className={`page-item ${
                    currentPage === 1
                        ? "disabled"
                        : ""
                }`}
            >

                <button
                    className="page-link"
                    onClick={() =>
                        setCurrentPage(
                            currentPage - 1
                        )
                    }
                >
                    Previous
                </button>

            </li>

            {[...Array(totalPages)].map(
                (_, index) => (

                    <li
                        key={index}
                        className={`page-item ${
                            currentPage ===
                            index + 1
                                ? "active"
                                : ""
                        }`}
                    >

                        <button
                            className="page-link"
                            onClick={() =>
                                setCurrentPage(
                                    index + 1
                                )
                            }
                        >
                            {index + 1}
                        </button>

                    </li>

                )
            )}

            <li
                className={`page-item ${
                    currentPage === totalPages
                        ? "disabled"
                        : ""
                }`}
            >

                <button
                    className="page-link"
                    onClick={() =>
                        setCurrentPage(
                            currentPage + 1
                        )
                    }
                >
                    Next
                </button>

            </li>

        </ul>

    </nav>

</div>
            {/* Movie Modal */}

            {viewMovie && (

                <MovieDetailsModal
                    movie={viewMovie}
                    onClose={closeModal}
                />

            )}

        </div>
    );
};

export default Dashboard;