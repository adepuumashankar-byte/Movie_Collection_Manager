package com.batch10.moviecollectionmanager.service;

import java.util.List;

import com.batch10.moviecollectionmanager.dto.MovieDto;

public interface MovieService {

    MovieDto saveMovie(MovieDto movieDto);

    List<MovieDto> getAllMovies();

    MovieDto getMovieById(Long id);

    MovieDto updateMovie(Long id, MovieDto movieDto);

    void deleteMovie(Long id);

    List<MovieDto> getMoviesByGenre(String genre);

    List<MovieDto> getMoviesByDirector(String director);

    List<MovieDto> getMoviesWithPagination(int page, int size);

    List<MovieDto> getMoviesWithSorting(String sortBy);

    List<MovieDto> getMoviesWithPaginationAndSorting(int page, int size, String sortBy);

    List<MovieDto> getMoviesByGenreWithPagination(String genre, int page, int size);

    List<MovieDto> getMoviesByLanguage(String language);

    List<MovieDto> getMoviesByLanguageWithPagination(String language, int page, int size);

    List<MovieDto> getMoviesByRatingRange(Double min, Double max);

    List<MovieDto> getMoviesReleasedAfter(Integer year);

    MovieDto updateReleaseYear(Long id, Integer releaseYear);
}