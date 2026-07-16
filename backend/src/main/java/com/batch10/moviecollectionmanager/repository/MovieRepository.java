package com.batch10.moviecollectionmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.batch10.moviecollectionmanager.entity.Movie;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findByGenre(String genre);

    List<Movie> findByDirector(String director);
    
    Page<Movie> findByGenre(String genre, Pageable pageable);

    List<Movie> findByLanguage(String language);

    Page<Movie> findByLanguage(String language, Pageable pageable);

    List<Movie> findByRatingBetween(Double min, Double max);

    @Query("SELECT m FROM Movie m WHERE m.releaseYear > :year")
List<Movie> findMoviesReleasedAfter(Integer year);

}