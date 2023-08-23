import styles from "./Song.module.css";

function Song({ song, index }) {
  return (
    <tr className={styles.row}>
      <td style={{ textAlign: "right", paddingRight: 16 }}>{index}</td>
      <td>
        <div className={styles.titleContent}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={song.coverImage} alt="" />
          </div>
          <div>
            <div className={styles.songTitle}>{song.title}</div>
            <div>{song.artist}</div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <div>
            {song.album} ({song.year})
          </div>
        </div>
      </td>
      <td>{song.genre.join(", ")}</td>
      <td>{song.duration}</td>
    </tr>
  );
}

export default Song;
