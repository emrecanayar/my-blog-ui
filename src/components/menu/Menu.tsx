import MenuCategories from "../menuCategories/MenuCategories";
import MenuPosts from "../menuPosts/MenuPosts";
import Subscription from "../subscription/Subscription";
import styles from "./menu.module.css";

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"En Sıcak"}</h2>
      <h1 className={styles.title}>En Popüler</h1>
      <MenuPosts withImage={true} type={1} />
      <h2 className={styles.subtitle}>Konuya göre keşfet</h2>
      <h1 className={styles.title}>Kategoriler</h1>
      <MenuCategories />
      <h2 className={styles.subtitle}>Editörün seçtiği</h2>
      <h1 className={styles.title}>Editörün Seçimi</h1>
      <MenuPosts withImage={true} type={2} />
      <h2 className={styles.subtitle}>En çok değerlendirilenler</h2>
      <h1 className={styles.title}>En Çok Değerlendirilenler</h1>
      <MenuPosts withImage={true} type={3} />
      <h1 className={styles.title}>Abone Ol</h1>
      <Subscription />
    </div>
  );
};
export default Menu;
