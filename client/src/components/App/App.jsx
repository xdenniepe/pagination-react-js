import { useEffect, useState } from "react";
import Axios from "axios";

import CustomPagination from "../Pagination/CustomPagination";
import SearchBar from "../SearchBar/SearchBar";
import SongList from "../SongList/SongList";
import styles from "./App.module.css";

const axios = Axios.create({ baseURL: "http://localhost:3000" });

const App = () => {
  const [songs, setSongs] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeField, setActiveField] = useState({});

  // USEEFFECT: to trigger state change onClick search
  useEffect(() => {
    handleChangePage(1);
  }, [rowsPerPage]);

  useEffect(() => {
    handleSearch(activeField.value);
  }, [page]);

  const handleSearch = (field) => {
    axios
      .get("/songs", {
        params: {
          q: searchTerm,
          field: field || "",
          limit: rowsPerPage,
          page: page,
        },
      })
      .then((res) => {
        setSongs(res.data.results);
        setTotalPage(Math.ceil(res.data.totalResults / rowsPerPage));
      });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    handleSearch(activeField.value);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
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
      <SongList songs={songs} page={page} rowsPerPage={rowsPerPage} />
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
