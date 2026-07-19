import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

const MovieAnalytics = ({ movies }) => {

    // Movies by Genre

    const genreData = Object.values(

        movies.reduce((acc, movie) => {

            if (!acc[movie.genre]) {

                acc[movie.genre] = {
                    genre: movie.genre,
                    count: 0
                };
            }

            acc[movie.genre].count++;

            return acc;

        }, {})
    );

    // Movies by Language

    const languageData = Object.values(

        movies.reduce((acc, movie) => {

            if (!acc[movie.language]) {

                acc[movie.language] = {
                    name: movie.language,
                    value: 0
                };
            }

            acc[movie.language].value++;

            return acc;

        }, {})
    );

    const COLORS = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#06b6d4"
    ];

    return (

        <div className="row g-4 mb-5">

            {/* Genre Chart */}

            <div className="col-lg-6">

                <div className="analytics-card">

                    <h4 className="mb-3">
                        🎭 Movies by Genre
                    </h4>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart data={genreData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="genre" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                fill="#6366f1"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* Language Chart */}

            <div className="col-lg-6">

                <div className="analytics-card">

                    <h4 className="mb-3">
                        🌎 Movies by Language
                    </h4>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <PieChart>

                            <Pie
                                data={languageData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >

                                {languageData.map(
                                    (entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                    index %
                                                    COLORS.length
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );
};

export default MovieAnalytics;