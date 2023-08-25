import { useEffect, useState } from "react";
import Axios from "axios";

import CustomPagination from "../Pagination/CustomPagination";
import SearchBar from "../SearchBar/SearchBar";
import SongList from "../SongList/SongList";
import styles from "./App.module.css";

const axios = Axios.create({ baseURL: "http://localhost:3000" });

const App = () => {
  const [songs, setSongs]             = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage]               = useState(1);
  const [totalPage, setTotalPage]     = useState(0);
  const [searchTerm, setSearchTerm]   = useState("");
  const [activeField, setActiveField] = useState({});

  useEffect(() => {
    handleSearch(activeField.value);
  }, [page])
  

  const handleSearch = (field) => {
    axios
      .get("/songs", {
        params: {
          q    : searchTerm,
          field: field || "",
          limit: rowsPerPage,
          page : page,
        },
      })
      .then((res) => {
        const newSongs = res.data.results.map((songs, index) => {
          const { title, album, artist, year, genre, coverImage, duration } = songs;

          return ({
            index: (index + 1) + ((page - 1)  * rowsPerPage),
            title, album, artist, year, genre, coverImage, duration
          })
        })
        setSongs(newSongs);
        setTotalPage(Math.ceil(res.data.totalResults / rowsPerPage));
      });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  return (
    <div className={styles.App}>
      <SearchBar
        activeField={activeField}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setActiveField={setActiveField}
        setPage={setPage}
        setSearchTerm={setSearchTerm}
      />
      <SongList songs={songs} />
      <CustomPagination
        handleChangePage={handleChangePage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalPage={totalPage}
      />
    </div>
  );
};

export default App;
