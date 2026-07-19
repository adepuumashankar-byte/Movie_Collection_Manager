import "../../styles/searchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {

    return (

        <div className="search-container mb-4">

            <div className="input-group search-box">

                <span className="input-group-text">
                    <i className="bi bi-search"></i>
                </span>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search movie by title..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

                {searchTerm && (

                    <button
                        className="btn btn-outline-light"
                        onClick={() => setSearchTerm("")}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                )}

            </div>

        </div>

    );
};

export default SearchBar;