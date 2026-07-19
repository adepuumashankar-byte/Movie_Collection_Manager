import axiosInstance from "../api/axiosConfig";

export const getAllMovies = async () => {
    const response = await axiosInstance.get("/movies");
    return response.data;
};

export const addMovie = async (movie) => {
    const response = await axiosInstance.post("/movies", movie);
    return response.data;
};

export const updateMovie = async (id, movie) => {
    const response = await axiosInstance.put(`/movies/${id}`, movie);
    return response.data;
};

export const deleteMovie = async (id) => {
    return await axiosInstance.delete(`/movies/${id}`);
};