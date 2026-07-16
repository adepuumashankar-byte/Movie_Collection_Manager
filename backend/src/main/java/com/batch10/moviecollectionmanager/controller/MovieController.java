package com.batch10.moviecollectionmanager.controller;

import java.util.List;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.batch10.moviecollectionmanager.dto.MovieDto;
import com.batch10.moviecollectionmanager.service.MovieService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.batch10.moviecollectionmanager.response.ApiResponse;

@RestController
@RequestMapping("/movies")
@Tag(
    name = "Movie Management APIs",
    description = "Operations related to Movie Collection Manager"
)
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Operation(
    summary = "Create a new movie",
    description = "Adds a new movie to the Movie Collection Manager."
)

    @PostMapping
public MovieDto saveMovie(@Valid @RequestBody MovieDto movieDto) {
    return movieService.saveMovie(movieDto);
}
    @Operation(
    summary = "Get all movies",
    description = "Retrieves the complete list of movies from the Movie Collection Manager."
)

    @GetMapping
    public List<MovieDto> getAllMovies() {
        return movieService.getAllMovies();
    }


    @Operation(
    summary = "Get movie by ID",
    description = "Retrieves a movie using its unique ID."
)

    @GetMapping("/{id}")
public ApiResponse<MovieDto> getMovieById(@PathVariable Long id) {

    MovieDto movie = movieService.getMovieById(id);

    return new ApiResponse<>(
            true,
            "Movie fetched successfully",
            movie
    );
}

@Operation(
    summary = "Update an existing movie",
    description = "Updates all details of an existing movie using its ID."
)

@PutMapping("/{id}")
public MovieDto updateMovie(@PathVariable Long id,
                            @Valid @RequestBody MovieDto movieDto) {
    return movieService.updateMovie(id, movieDto);
}

@Operation(
    summary = "Delete a movie",
    description = "Deletes a movie from the Movie Collection Manager using its ID."
)

@DeleteMapping("/{id}")
public String deleteMovie(@PathVariable Long id) {

    movieService.deleteMovie(id);

    return "Movie deleted successfully.";
}

@GetMapping("/genre/{genre}")
public List<MovieDto> getMoviesByGenre(@PathVariable String genre) {
    return movieService.getMoviesByGenre(genre);
}

@GetMapping("/director/{director}")
public List<MovieDto> getMoviesByDirector(@PathVariable String director) {
    return movieService.getMoviesByDirector(director);
}

@GetMapping("/page")
public List<MovieDto> getMoviesWithPagination(
        @RequestParam int page,
        @RequestParam int size) {

    return movieService.getMoviesWithPagination(page, size);
}


@GetMapping("/sort")
public List<MovieDto> getMoviesWithSorting(@RequestParam String sortBy) {
    return movieService.getMoviesWithSorting(sortBy);
}

@GetMapping("/page-sort")
public List<MovieDto> getMoviesWithPaginationAndSorting(
        @RequestParam int page,
        @RequestParam int size,
        @RequestParam String sortBy) {

    return movieService.getMoviesWithPaginationAndSorting(page, size, sortBy);
}

@GetMapping("/genre/page")
public List<MovieDto> getMoviesByGenreWithPagination(
        @RequestParam String genre,
        @RequestParam int page,
        @RequestParam int size) {

    return movieService.getMoviesByGenreWithPagination(
            genre, page, size);
}

@GetMapping("/language/{language}")
public List<MovieDto> getMoviesByLanguage(@PathVariable String language) {
    return movieService.getMoviesByLanguage(language);
}

@GetMapping("/language/page")
public List<MovieDto> getMoviesByLanguageWithPagination(
        @RequestParam String language,
        @RequestParam int page,
        @RequestParam int size) {

    return movieService.getMoviesByLanguageWithPagination(language, page, size);
}

@GetMapping("/rating")
public List<MovieDto> getMoviesByRatingRange(
        @RequestParam Double min,
        @RequestParam Double max) {

    return movieService.getMoviesByRatingRange(min, max);
}

@GetMapping("/released-after/{year}")
public List<MovieDto> getMoviesReleasedAfter(@PathVariable Integer year) {
    return movieService.getMoviesReleasedAfter(year);
}

@PatchMapping("/{id}/release-year")
public MovieDto updateReleaseYear(@PathVariable Long id,
                                  @RequestParam Integer releaseYear) {
    return movieService.updateReleaseYear(id, releaseYear);
}

}