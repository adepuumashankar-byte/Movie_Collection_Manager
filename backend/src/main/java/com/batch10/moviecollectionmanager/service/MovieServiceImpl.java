package com.batch10.moviecollectionmanager.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.batch10.moviecollectionmanager.dto.MovieDto;
import com.batch10.moviecollectionmanager.entity.Movie;
import com.batch10.moviecollectionmanager.exception.MovieNotFoundException;
import com.batch10.moviecollectionmanager.repository.MovieRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MovieServiceImpl implements MovieService {


    private static final Logger logger =
        LoggerFactory.getLogger(MovieServiceImpl.class);

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MovieDto saveMovie(MovieDto movieDto) {

        logger.info("Saving a new movie: {}", movieDto.getTitle());

        Movie movie = modelMapper.map(movieDto, Movie.class);

        Movie savedMovie = movieRepository.save(movie);

        return modelMapper.map(savedMovie, MovieDto.class);
    }

    @Override
    public List<MovieDto> getAllMovies() {

        List<Movie> movies = movieRepository.findAll();

        List<MovieDto> movieDtos = new ArrayList<>();

        for (Movie movie : movies) {

           movieDtos.add(modelMapper.map(movie, MovieDto.class));
        }

        return movieDtos;
    }


    @Override
public List<MovieDto> getMoviesByGenre(String genre) {

    List<Movie> movies = movieRepository.findByGenre(genre);

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : movies) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}


@Override
public List<MovieDto> getMoviesByDirector(String director) {

    List<Movie> movies = movieRepository.findByDirector(director);

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : movies) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}

    @Override
    public MovieDto getMovieById(Long id) {

        Movie movie = movieRepository.findById(id)
                .orElseThrow(() ->
                        new MovieNotFoundException(
                                "Movie not found with id : " + id));

            return modelMapper.map(movie, MovieDto.class);
    }

    @Override
    public MovieDto updateMovie(Long id, MovieDto movieDto) {

        Movie movie = movieRepository.findById(id)
                .orElseThrow(() ->
                        new MovieNotFoundException(
                                "Movie not found with id : " + id));

            modelMapper.map(movieDto, movie);

        Movie updatedMovie = movieRepository.save(movie);

        return modelMapper.map(updatedMovie, MovieDto.class);
    }

    @Override
    public void deleteMovie(Long id) {

        Movie movie = movieRepository.findById(id)
                .orElseThrow(() ->
                        new MovieNotFoundException(
                                "Movie not found with id : " + id));

        movieRepository.delete(movie);
    }


    @Override
public List<MovieDto> getMoviesWithPagination(int page, int size) {

    Page<Movie> moviePage = movieRepository.findAll(PageRequest.of(page, size));

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : moviePage.getContent()) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}

@Override
public List<MovieDto> getMoviesWithSorting(String sortBy) {

    List<Movie> movies = movieRepository.findAll(Sort.by(sortBy));

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : movies) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}

@Override
public List<MovieDto> getMoviesWithPaginationAndSorting(int page, int size, String sortBy) {

    Page<Movie> moviePage = movieRepository.findAll(
            PageRequest.of(page, size, Sort.by(sortBy)));

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : moviePage.getContent()) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}

@Override
public List<MovieDto> getMoviesByGenreWithPagination(String genre, int page, int size) {

    Page<Movie> moviePage = movieRepository.findByGenre(
            genre,
            PageRequest.of(page, size));

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : moviePage.getContent()) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}


@Override
public List<MovieDto> getMoviesByLanguage(String language) {

    List<Movie> movies = movieRepository.findByLanguage(language);

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : movies) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}

@Override
public List<MovieDto> getMoviesByLanguageWithPagination(String language, int page, int size) {

    Page<Movie> moviePage = movieRepository.findByLanguage(
            language,
            PageRequest.of(page, size));

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : moviePage.getContent()) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}

@Override
public List<MovieDto> getMoviesByRatingRange(Double min, Double max) {

    List<Movie> movies = movieRepository.findByRatingBetween(min, max);

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : movies) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}

@Override
public List<MovieDto> getMoviesReleasedAfter(Integer year) {

    List<Movie> movies = movieRepository.findMoviesReleasedAfter(year);

    List<MovieDto> movieDtos = new ArrayList<>();

    for (Movie movie : movies) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setGenre(movie.getGenre());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRating(movie.getRating());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setDescription(movie.getDescription());

        movieDtos.add(dto);
    }

    return movieDtos;
}

@Override
public MovieDto updateReleaseYear(Long id, Integer releaseYear) {

    Movie movie = movieRepository.findById(id)
            .orElseThrow(() ->
                    new MovieNotFoundException(
                            "Movie not found with id : " + id));

    movie.setReleaseYear(releaseYear);

    Movie updatedMovie = movieRepository.save(movie);

    return modelMapper.map(updatedMovie, MovieDto.class);
}



}