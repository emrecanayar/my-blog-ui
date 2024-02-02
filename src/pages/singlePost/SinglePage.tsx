import styles from "./singlePage.module.css";
import p1 from "../../assets/p1.jpeg";
import Menu from "../../components/menu/Menu";
import Comments from "../../components/comments/Comments";

const SinglePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia,
            eum.
          </h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <img src={p1} alt="" className={styles.avatar} />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>Emre Can Ayar</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={p1} alt="" className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <p className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem
            rem quo sed sunt aliquam eaque, quasi optio facilis, ab dolores
            aperiam quidem nihil perspiciatis. Porro unde saepe tempore eaque ad
            dignissimos dolorum numquam est dolor laboriosam aliquid,
            repellendus fugit vero libero vitae eligendi ducimus asperiores hic
            ullam veritatis odit culpa. Placeat excepturi, sed, adipisci
            incidunt, aliquid fugit ipsum perferendis aliquam nesciunt suscipit
            asperiores obcaecati facilis officiis ut expedita? Nobis harum
            corrupti temporibus adipisci dolorum facere magni culpa explicabo
            dolor aliquid distinctio, ipsam neque. Saepe distinctio inventore at
            sit aperiam necessitatibus quisquam, fugit expedita accusantium,
            illum quidem, ratione est error natus commodi doloremque unde. Eum
            et atque sapiente odio commodi sunt libero temporibus. Quos maiores
            quibusdam nisi quo, reiciendis suscipit cupiditate illo eos
            aspernatur a molestiae corrupti ad! Laboriosam quis provident
            voluptates totam culpa maxime, quasi, est numquam modi doloremque
            mollitia earum aliquam inventore, recusandae perferendis. Eos
            quisquam placeat magnam consequuntur suscipit, sint deserunt quas
            inventore exercitationem nostrum. Harum vitae debitis veniam ipsum,
            quia molestias, velit reiciendis quam facilis doloribus voluptatibus
            magnam nesciunt in fugiat sunt, natus animi expedita. Temporibus,
            eum. Sit minima nihil eaque voluptatum, dolores enim quas optio
            esse. Harum eveniet iure, debitis illum iste voluptate qui neque
            natus nisi cum dolores illo officia placeat. Neque aut cupiditate,
            magnam reprehenderit enim, quam veniam iure perferendis fuga quis
            totam ab, repellendus at. Voluptas eligendi eos omnis perspiciatis
            libero molestias exercitationem dolorem? Error alias qui nobis
            architecto accusantium libero labore omnis corporis unde rerum vero
            aspernatur, nesciunt repudiandae doloribus similique consequatur
            minima perspiciatis, nostrum facilis quam ipsa ullam impedit! Quas
            deserunt ratione exercitationem, a nulla nemo! Veniam, natus
            voluptatibus nihil necessitatibus molestias adipisci eligendi sunt
            corrupti eos ratione eius explicabo doloremque rerum in soluta
            cumque. Amet magnam provident culpa adipisci odit! Repellat quis
            minima molestiae illo aspernatur deleniti officiis explicabo
            dolores!
          </p>
          {/* <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          /> */}
          <div className={styles.comment}>
            <Comments />
            
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
