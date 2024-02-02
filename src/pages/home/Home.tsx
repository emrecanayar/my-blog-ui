import CardList from "../../components/cardList/CardList";
import CategoryList from "../../components/categoryList/CategoryList";
import Featured from "../../components/featured/Featured";
import Menu from "../../components/menu/Menu";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList />
        <Menu />
      </div>
    </div>
  );
};
export default Home;
