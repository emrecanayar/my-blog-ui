import styles from "./about.module.css";
import coding from "../../assets/coding.png";
import { GetListAboutListItemDto } from "../../services/about/dtos/GetListAboutListItemDto";
import { useEffect, useState } from "react";
import aboutStore from "../../stores/about/aboutStore";
import { Link } from "react-router-dom";

const About = () => {
  const [items, setItems] = useState<GetListAboutListItemDto[]>([]);

  useEffect(() => {
    const fetchAboutsData = async () => {
      try {
        const response = await aboutStore.getAbouts();
        setItems(response.data.items);
      } catch (error) {
        console.log("Abouts data not loaded", error);
      }
    };

    fetchAboutsData();
  }, []);
  return (
    <section className={styles.about}>
      <div className={styles.content}>
        <img src={coding} alt="Emre Can Ayar"></img>
        <div className={styles.text}>
          <h1>Hakkımda</h1>
          {items &&
            items.map((item, index) => (
              <div key={index}>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <Link to={item.url}>
                  <button type="button">Bana Ulaş</button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
export default About;
