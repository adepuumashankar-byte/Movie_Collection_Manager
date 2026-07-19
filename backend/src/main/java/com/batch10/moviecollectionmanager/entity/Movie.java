package com.batch10.moviecollectionmanager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Information
    private String title;
    private String genre;
    private String language;

    // Crew
    private String director;
    private String producer;
    private String hero;
    private String heroine;
    private String musicDirector;

    // Movie Details
    private Integer releaseYear;
    private Integer duration;
    private String certificate;

    // Financial Details
    private Double budget;
    private Double openingDayCollection;
    private Double highestSingleDayCollection;
    private Double indiaCollection;
    private Double overseasCollection;
    private Double worldwideCollection;

    // Rating
    private Double rating;

    // Media
    private String posterUrl;
    private String trailerUrl;

    @Column(length = 3000)
    private String description;

    public Movie() {
    }

    // -------- Getters & Setters --------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getHero() {
        return hero;
    }

    public void setHero(String hero) {
        this.hero = hero;
    }

    public String getHeroine() {
        return heroine;
    }

    public void setHeroine(String heroine) {
        this.heroine = heroine;
    }

    public String getMusicDirector() {
        return musicDirector;
    }

    public void setMusicDirector(String musicDirector) {
        this.musicDirector = musicDirector;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Double getOpeningDayCollection() {
        return openingDayCollection;
    }

    public void setOpeningDayCollection(Double openingDayCollection) {
        this.openingDayCollection = openingDayCollection;
    }

    public Double getHighestSingleDayCollection() {
        return highestSingleDayCollection;
    }

    public void setHighestSingleDayCollection(Double highestSingleDayCollection) {
        this.highestSingleDayCollection = highestSingleDayCollection;
    }

    public Double getIndiaCollection() {
        return indiaCollection;
    }

    public void setIndiaCollection(Double indiaCollection) {
        this.indiaCollection = indiaCollection;
    }

    public Double getOverseasCollection() {
        return overseasCollection;
    }

    public void setOverseasCollection(Double overseasCollection) {
        this.overseasCollection = overseasCollection;
    }

    public Double getWorldwideCollection() {
        return worldwideCollection;
    }

    public void setWorldwideCollection(Double worldwideCollection) {
        this.worldwideCollection = worldwideCollection;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}