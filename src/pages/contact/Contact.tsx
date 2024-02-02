import { Link } from "react-router-dom";
import styles from "./contact.module.css";
import { useEffect, useState } from "react";
import email from "../../assets/email.png";
import phone from "../../assets/phone.png";
import location from "../../assets/location.png";
import githubLogo from "../../assets/github-logo.png";
import linkedinLogo from "../../assets/linkedin.png";
import xLogo from "../../assets/twitter.png";
import whatsappLogo from "../../assets/whatsapp.png";
import { GetListContactUsInformationListItemDto } from "../../services/contactUsInformation/dtos/GetListContactUsInformationListItemDto";
import contactUsInformationStore from "../../stores/contactUsInformation/contactUsInformationStore";
import { CreateContactCommand } from "../../services/contact/dtos/CreateContactCommand";
import contactStore from "../../stores/contact/contactStore";

const ContactPage = () => {
  const [focusedInputFullName, setFocusedInputFullName] = useState(null);
  const [focusedInputEmail, setFocusedInputEmail] = useState(null);
  const [focusedInputPhoneNumber, setFocusedInputPhoneNumber] = useState(null);
  const [focusedInputMessage, setFocusedInputMessage] = useState(null);
  const [items, setItems] = useState<GetListContactUsInformationListItemDto[]>(
    []
  );
  const [contact, setContact] = useState<CreateContactCommand>({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleFocus = (inputName: any) => {
    switch (inputName) {
      case "fullName":
        setFocusedInputFullName(inputName);
        break;
      case "email":
        setFocusedInputEmail(inputName);
        break;
      case "phoneNumber":
        setFocusedInputPhoneNumber(inputName);
        break;
      case "message":
        setFocusedInputMessage(inputName);
        break;
    }
  };

  const handleBlur = (inputName: any) => {
    switch (inputName) {
      case "fullName":
        console.log(isActiveFullName(inputName));
        if (isActiveFullName(inputName) === false) {
          setFocusedInputFullName(null);
        }
        break;
      case "email":
        if (isActiveEmail(inputName) === false) {
          setFocusedInputEmail(null);
        }
        break;
      case "phoneNumber":
        if (isActivePhoneNumber(inputName) === false) {
          setFocusedInputPhoneNumber(null);
        }
        break;
      case "message":
        if (isActiveMessage(inputName) === false) {
          setFocusedInputMessage(null);
        }

        break;
    }
  };

  const isActiveFullName = (inputName: keyof CreateContactCommand) => {
    var result = inputName.toString() === "fullName";
    if (result === true && contact.fullName.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const isActiveEmail = (inputName: keyof CreateContactCommand) => {
    var result = inputName.toString() === "email";
    if (result === true && contact.email.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const isActivePhoneNumber = (inputName: keyof CreateContactCommand) => {
    var result = inputName.toString() === "phoneNumber";
    if (result === true && contact.phoneNumber.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const isActiveMessage = (inputName: keyof CreateContactCommand) => {
    var result = inputName.toString() === "message";
    if (result === true && contact.message.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await contactStore.createContact(contact);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchContactUsInformationData = async () => {
      try {
        const response =
          await contactUsInformationStore.getContactUsInformations();
        setItems(response.data.items);
      } catch (error) {
        console.log("ContactUsInformations data not loaded", error);
      }
    };
    fetchContactUsInformationData();
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.bigCircle}></span>
      <img src="img/shape.png" className={styles.square} alt="" />
      <div className={styles.form}>
        <div className={styles.contactInfo}>
          <h3 className={styles.title}>İletişime Geçelim</h3>
          {items && items.length > 0 && (
            <>
              <p className={styles.text}>{items[0].description}</p>

              <div className={styles.info}>
                <div className={styles.information}>
                  <img src={location} className={styles.icon} alt="" />
                  <p>{items[0].addressText}</p>
                </div>
                <div className={styles.information}>
                  <img src={email} className={styles.icon} alt="" />
                  <p>{items[0].email}</p>
                </div>
                <div className={styles.information}>
                  <img src={phone} className={styles.icon} alt="" />
                  <p>{items[0].phoneNumber}</p>
                </div>
              </div>
            </>
          )}
          <div className={styles.socialMedia}>
            <p>Bizimle iletişime geçin:</p>
            {items && items.length > 0 && (
              <div className={styles.socialIcons}>
                <Link to={items[0].gitHublink}>
                  <img src={githubLogo} alt="github" width={24} height={24} />
                </Link>
                <Link to={items[0].linkedInLink}>
                  <img
                    src={linkedinLogo}
                    alt="linkedin"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link to={items[0].twitterLink}>
                  <img src={xLogo} alt="twitter" width={24} height={24} />
                </Link>
                <Link to={items[0].whatsAppLink}>
                  <img
                    src={whatsappLogo}
                    alt="whatsapp"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={styles.contactForm}>
          <span className={styles.circleOne}></span>
          <span className={styles.circleTwo}></span>

          <form onSubmit={handleSubmit}>
            <h3 className={styles.title}>Bize Ulaşın</h3>
            <div
              className={`${styles.inputContainer} ${
                focusedInputFullName === "fullName" ? styles.focus : ""
              }`}
            >
              <input
                type="text"
                name="fullName"
                className={styles.input}
                onFocus={() => handleFocus("fullName")}
                onBlur={() => handleBlur("fullName")}
                onChange={handleInputChange}
              />
              <label>Ad Soyad</label>
              <span>Ad Soyad</span>
            </div>
            <div
              className={`${styles.inputContainer} ${
                focusedInputEmail === "email" ? styles.focus : ""
              }`}
            >
              <input
                type="email"
                name="email"
                className={styles.input}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                onChange={handleInputChange}
              />
              <label>E-Posta</label>
              <span>E-Posta</span>
            </div>
            <div
              className={`${styles.inputContainer} ${
                focusedInputPhoneNumber === "phoneNumber" ? styles.focus : ""
              }`}
            >
              <input
                type="tel"
                name="phoneNumber"
                className={styles.input}
                onFocus={() => handleFocus("phoneNumber")}
                onBlur={() => handleBlur("phoneNumber")}
                onChange={handleInputChange}
              />
              <label>Telefon</label>
              <span>Telefon</span>
            </div>
            <div
              className={`${styles.inputContainer} ${
                focusedInputMessage === "message" ? styles.focus : ""
              }`}
            >
              <textarea
                name="message"
                className={styles.input}
                onFocus={() => handleFocus("message")}
                onBlur={() => handleBlur("message")}
                onChange={handleInputChange}
              ></textarea>
              <label>Mesaj</label>
              <span>Mesaj</span>
            </div>
            <input type="submit" value="Gönder" className={styles.btn} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
