import styles from "./featured.module.css";
import p1 from "../../assets/p1.jpeg";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Yazılım dünyasının </b> derinliklerine bir yolculuk. En yeni
        trendler, ipuçları ve sırlar burada sizi bekliyor.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer} style={{}}>
          <img src={p1} alt="İlk Paragraf Görseli" className={styles.image}/>
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,
            commodi.
          </h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            perferendis voluptatum, repellat labore itaque laborum
            exercitationem accusamus, assumenda aliquid provident incidunt
            quidem quisquam praesentium non ipsa magnam veniam nihil molestias?
          </p>
          <button className={styles.button}>Daha Fazla</button>
        </div>
      </div>
    </div>
  );
};
export default Featured;
