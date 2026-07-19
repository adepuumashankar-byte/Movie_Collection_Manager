import "../../styles/movieDetailsModal.css";

const MovieDetailsModal = ({ movie, onClose }) => {

    if (!movie) return null;

    return (

        <div className="modal-overlay">

            <div className="movie-modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✖
                </button>

                <div className="modal-header">

                    {movie.posterUrl && (

                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="movie-poster"
                        />

                    )}

                    <div>

                        <h2>{movie.title}</h2>

                        <p>
                            ⭐ {movie.rating} / 10
                        </p>

                        <span className="badge bg-primary me-2">
                            {movie.genre}
                        </span>

                        <span className="badge bg-success">
                            {movie.language}
                        </span>

                    </div>

                </div>

                <hr />

                <div className="movie-info">

                    <p><strong>Director:</strong> {movie.director}</p>

                    <p><strong>Producer:</strong> {movie.producer}</p>

                    <p><strong>Hero:</strong> {movie.hero}</p>

                    <p><strong>Heroine:</strong> {movie.heroine}</p>

                    <p><strong>Music Director:</strong> {movie.musicDirector}</p>

                    <p><strong>Release Year:</strong> {movie.releaseYear}</p>

                    <p><strong>Duration:</strong> {movie.duration} mins</p>

                    <p><strong>Certificate:</strong> {movie.certificate}</p>

                </div>

                <hr />

                <div className="collection-section">

                    <div>
                        <h6>Opening Day</h6>
                        <p>₹ {movie.openingDayCollection}</p>
                    </div>

                    <div>
                        <h6>Highest Day</h6>
                        <p>₹ {movie.highestSingleDayCollection}</p>
                    </div>

                    <div>
                        <h6>Worldwide</h6>
                        <p>₹ {movie.worldwideCollection}</p>
                    </div>

                </div>

                <hr />

                <div>

                    <h5>Description</h5>

                    <p>{movie.description}</p>

                </div>

                {movie.trailerUrl && (

                    <a
                        href={movie.trailerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-danger mt-3"
                    >
                        ▶ Watch Trailer
                    </a>

                )}

            </div>

        </div>

    );
};

export default MovieDetailsModal;