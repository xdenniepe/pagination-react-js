import ClockIcon from "../Icons/ClockIcon";
import Song from "../Song/Song";
import styles from "./SongList.module.css";

const SongList = (props) => {
  const { songs, page, rowsPerPage } = props;

  return (
    <section className={styles.container}>
      {songs.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th width="4%" style={{ textAlign: "right", paddingRight: 16 }}>
                #
              </th>
              <th width="37%">Title</th>
              <th width="33%">Album</th>
              <th width="20%">Genre</th>
              <th width="6%">
                <ClockIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
                <Song key={song.id} index={(index + 1) + ((page - 1)  * rowsPerPage)} song={song} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default SongList;
