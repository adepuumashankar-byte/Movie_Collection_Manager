import { deleteMovie } from "../../services/movieService";

const MovieTable = ({
    movies,
    onEditMovie,
    onMovieDeleted,
    onViewMovie
}) => {

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this movie?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteMovie(id);

            alert("Movie Deleted Successfully");

            onMovieDeleted();

        } catch (error) {

            console.log(error);

            alert("Failed to delete movie");
        }
    };

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-striped table-hover mt-4">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Director</th>
                        <th>Release Year</th>
                        <th>Rating</th>
                        <th>First Day</th>
                        <th>Highest Day</th>
                        <th>Total Collection</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {movies.length > 0 ? (

                        movies.map((movie) => (

                            <tr key={movie.id}>

                                <td>{movie.id}</td>

                                <td>{movie.title}</td>

                                <td>{movie.genre}</td>

                                <td>{movie.director}</td>

                                <td>{movie.releaseYear}</td>

                                <td>
                                    ⭐ {movie.rating}
                                </td>

                                <td>
                                    ₹ {movie.openingDayCollection}
                                </td>

                                <td>
                                    ₹ {movie.highestSingleDayCollection}
                                </td>

                                <td>
                                    ₹ {movie.worldwideCollection}
                                </td>

                                <td>

                                    {/* View */}

                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() =>
                                            onViewMovie(movie)
                                        }
                                    >
                                        <i className="bi bi-eye-fill"></i>
                                    </button>

                                    {/* Edit */}

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            onEditMovie(movie)
                                        }
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>

                                    {/* Delete */}

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(movie.id)
                                        }
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="10"
                                className="text-center"
                            >

                                <div className="no-movies">

                                    <i className="bi bi-film"></i>

                                    <h5>No Movies Found</h5>

                                    <p>
                                        Try adding a movie or searching
                                        with another title.
                                    </p>

                                </div>

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );
};

export default MovieTable;