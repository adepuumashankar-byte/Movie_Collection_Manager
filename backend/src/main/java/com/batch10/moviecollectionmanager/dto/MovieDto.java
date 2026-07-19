package com.batch10.moviecollectionmanager.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import io.swagger.v3.oas.annotations.media.Schema;

public class MovieDto {

    private Long id;

    @Schema(
            description = "Title of the movie",
            example = "Interstellar"
    )
    @NotBlank(message = "Title is required")
    private String title;

    @Schema(
            description = "Director of the movie",
            example = "Christopher Nolan"
    )
    @NotBlank(message = "Director is required")
    private String director;

    @Schema(
            description = "Genre of the movie",
            example = "Sci-Fi"
    )
    @NotBlank(message = "Genre is required")
    private String genre;

    @Schema(
            description = "Year in which the movie was released",
            example = "2014"
    )
    @NotNull(message = "Release year is required")
    private Integer releaseYear;

    @Schema(
            description = "Movie rating out of 10",
            example = "8.8"
    )
    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 10, message = "Rating must not exceed 10")
    private Double rating;

    @Schema(
            description = "Language of the movie",
            example = "English"
    )
    @NotBlank(message = "Language is required")
    private String language;

    @Schema(
            description = "Duration in minutes",
            example = "169"
    )
    @NotNull(message = "Duration is required")
    private Integer duration;

    @Schema(
            description = "Short description of the movie",
            example = "A team travels through a wormhole to save humanity."
    )
    private String description;
// ==========================
// COLLECTION FIELDS
// ==========================

@Schema(
        description = "Opening Day Collection (Crores)",
        example = "65"
)
@NotNull(message = "Opening Day Collection is required")
private Double openingDayCollection;

@Schema(
        description = "Highest Single Day Collection (Crores)",
        example = "92"
)
@NotNull(message = "Highest Single Day Collection is required")
private Double highestSingleDayCollection;

@Schema(
        description = "Worldwide Collection (Crores)",
        example = "1200"
)
@NotNull(message = "Worldwide Collection is required")
private Double worldwideCollection;

    public MovieDto() {
    }

    // ==========================
    // GETTERS & SETTERS
    // ==========================

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

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

public Double getWorldwideCollection() {
    return worldwideCollection;
}

public void setWorldwideCollection(Double worldwideCollection) {
    this.worldwideCollection = worldwideCollection;
}
}