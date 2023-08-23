import styles from "./SearchBar.module.css";

import SearchIcon from "../Icons/SearchIcon";
import ClearIcon from "../Icons/ClearIcon";

const FIELDS = [
  { label: "Title", value: "title" },
  { label: "Artist", value: "artist" },
  { label: "Album", value: "album" },
  { label: "Genre", value: "genre" },
  { label: "Year", value: "year" },
];

function SearchBar(props) {
  const { onSearch, searchTerm, setSearchTerm, activeField, setActiveField, setPage } =
    props;

  return (
    <header className={styles.header}>
      <div>
        <div className={styles.searchWrapper}>
          <div className={styles.inputWrapper}>
            <div className={styles.searchIcon}>
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="What do you want to listen to?"
              className={styles.input}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            {!!searchTerm.trim() && (
              <button
                className={styles.clearIcon}
                onClick={() => {
                  setSearchTerm("");
                  setActiveField({});
                }}
              >
                <ClearIcon />
              </button>
            )}
          </div>
          <button
            className={styles.searchButton}
            onClick={() => {setPage(1); onSearch(activeField.value)}}
          >
            Search
          </button>
        </div>
        <div className={styles.fieldsWrapper}>
          {FIELDS.map((field) => {
            const active = field.value === activeField.value;
            return (
              <button
                className={(active
                  ? [styles.activeChip, styles.chip]
                  : [styles.chip]
                ).join(" ")}
                role="checkbox"
                aria-checked={active}
                tabIndex={-1}
                key={field.value}
                onClick={() => {
                  setActiveField(({ value }) =>
                    value === field.value ? {} : field
                  )
                  if (searchTerm != "") { onSearch(activeField.value) }
                }
                }
              >
                {field.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default SearchBar;
