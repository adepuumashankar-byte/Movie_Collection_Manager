import { useState, useEffect } from "react";
import {addMovie,updateMovie} from "../../services/movieService";
import "../../styles/movieForm.css";

const MovieForm = ({
    onMovieAdded,
    selectedMovie,
    clearSelectedMovie
}) => {
    const initialState = {
    title: "",
    genre: "",
    language: "",
    director: "",
    producer: "",
    hero: "",
    heroine: "",
    musicDirector: "",
    releaseYear: "",
    duration: "",
    certificate: "",

    openingDayCollection: "",
    highestSingleDayCollection: "",
    worldwideCollection: "",

    rating: "",
    posterUrl: "",
    trailerUrl: "",
    description: ""
};

const [movie, setMovie] = useState(initialState);

useEffect(() => {

    if (selectedMovie) {

        setMovie(selectedMovie);

    } else {

        setMovie(initialState);
    }

}, [selectedMovie]);

const handleChange = (e) => {

    setMovie({

        ...movie,

        [e.target.name]: e.target.value

    });

};

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (selectedMovie) {

            await updateMovie(
                selectedMovie.id,
                movie
            );

            alert("Movie Updated Successfully");

            clearSelectedMovie();

        } else {

            await addMovie(movie);

            alert("Movie Added Successfully");
        }

        setMovie(initialState);

        onMovieAdded();

    } catch (error) {

       

        console.log(error);

        alert("Operation Failed");
    }
};

return (
        <div className="card shadow p-4 mb-4 movie-form-card">
            <h3 className="mb-4 text-center">

    <i className="bi bi-film me-2"></i>

    {selectedMovie
        ? "Edit Movie"
        : "Add New Movie"}

</h3>
            <form onSubmit={handleSubmit}>

                {/* Basic Information */}

                <h5 className="mb-3">
    <i className="bi bi-card-heading me-2"></i>
    Basic Information
</h5>

                <div className="row">

                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Movie Title"
                            name="title"
                            value={movie.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Genre"
                            name="genre"
                            value={movie.genre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Language"
                            name="language"
                            value={movie.language}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Release Year"
                            name="releaseYear"
                            value={movie.releaseYear}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Duration (Minutes)"
                            name="duration"
                            value={movie.duration}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Certificate (U/A, A)"
                            name="certificate"
                            value={movie.certificate}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <hr />

                {/* Cast & Crew */}

                <h5 className="mb-3">
    <i className="bi bi-people-fill me-2"></i>
    Cast & Crew
</h5>

                <div className="row">

                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Director"
                            name="director"
                            value={movie.director}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Producer"
                            name="producer"
                            value={movie.producer}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Hero"
                            name="hero"
                            value={movie.hero}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Heroine"
                            name="heroine"
                            value={movie.heroine}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Music Director"
                            name="musicDirector"
                            value={movie.musicDirector}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <hr />

               {/* Collections */}

<h5 className="mb-3">
    <i className="bi bi-cash-stack me-2"></i>
    Box Office Collections
</h5>

<div className="row">

    <div className="col-md-4 mb-3">
        <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="First Day Collection"
            name="openingDayCollection"
            value={movie.openingDayCollection}
            onChange={handleChange}
            required
        />
    </div>

    <div className="col-md-4 mb-3">
        <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="Highest Day Collection"
            name="highestSingleDayCollection"
            value={movie.highestSingleDayCollection}
            onChange={handleChange}
            required
        />
    </div>

    <div className="col-md-4 mb-3">
        <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="Total Collection"
            name="worldwideCollection"
            value={movie.worldwideCollection}
            onChange={handleChange}
            required
        />
    </div>

</div>

                <hr />

                {/* Rating */}

                <h5 className="mb-3">
    <i className="bi bi-star-fill me-2"></i>
    Rating
</h5>

                <div className="row">

                    <div className="col-md-4 mb-3">
                        <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="10"
                            className="form-control"
                            placeholder="IMDb Rating"
                            name="rating"
                            value={movie.rating}
                            onChange={handleChange}
                            required
                        />
                    </div>

                </div>

                <hr />

                {/* Media */}

                <h5 className="mb-3">
    <i className="bi bi-camera-reels-fill me-2"></i>
    Media
</h5>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Poster URL"
                            name="posterUrl"
                            value={movie.posterUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Trailer URL"
                            name="trailerUrl"
                            value={movie.trailerUrl}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div className="mb-3">

                    <textarea
                        rows="4"
                        className="form-control"
                        placeholder="Movie Description"
                        name="description"
                        value={movie.description}
                        onChange={handleChange}
                    />

                </div>

                <div className="d-flex gap-2">

    <button
        type="submit"
        className={
            selectedMovie
                ? "btn btn-warning flex-fill"
                : "btn btn-success flex-fill"
        }
    >

        <i
            className={
                selectedMovie
                    ? "bi bi-pencil-square me-2"
                    : "bi bi-plus-circle me-2"
            }
        ></i>

        {selectedMovie
            ? "Update Movie"
            : "Add Movie"}

    </button>

    {selectedMovie && (

        <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {

                clearSelectedMovie();

                setMovie(initialState);
            }}
        >
            Cancel
        </button>

    )}

</div>

            </form>

        </div>
    );
};

export default MovieForm;