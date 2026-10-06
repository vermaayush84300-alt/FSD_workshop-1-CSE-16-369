function SearchStudent({
    searchTerm,
    setSearchTerm
}) {

    return (

        <div className="search-box">

            <label htmlFor="search">
                Search Student
            </label>


            <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(event) =>
                    setSearchTerm(
                        event.target.value
                    )
                }
                placeholder="Search by Student ID or Name"
            />


            <p>
                Search by ID or name.
                Name search is case-insensitive.
            </p>

        </div>
    );
}


export default SearchStudent;