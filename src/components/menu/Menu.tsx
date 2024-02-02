import MenuCategories from "../menuCategories/MenuCategories";
import MenuPosts from "../menuPosts/MenuPosts";
import styles from "./menu.module.css";

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"En Sıcak"}</h2>
      <h1 className={styles.title}>En Popüler</h1>
      <MenuPosts withImage={true} />
      <h2 className={styles.subtitle}>Konuya göre keşfet</h2>
      <h1 className={styles.title}>Kategoriler</h1>
      <MenuCategories />
      <h2 className={styles.subtitle}>Editörün seçtiği</h2>
      <h1 className={styles.title}>Editörün Seçimi</h1>
      <MenuPosts withImage={true} />
    </div>
  );
};
export default Menu;
