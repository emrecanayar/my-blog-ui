import { useState } from "react";
import styles from "./write.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill'in temel stil dosyası

const WritePage = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["image"],
    ["video"],
    ["link"],
    ["clean"],
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "code-block",
  ];

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Başlık"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="category-select" className={styles.label}>
        Kategori Seç
      </label>

      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">Style</option>
        <option value="fashion">Fashion</option>
        <option value="food">Food</option>
        <option value="culture">Culture</option>
        <option value="travel">Travel</option>
        <option value="coding">Coding</option>
      </select>
      <div className={styles.editor}>
        <ReactQuill
          className={styles.textArea}
          modules={modules}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Hikayeni yaz..."
          formats={formats}
        />
      </div>
      <button className={styles.publish}>Publish</button>
    </div>
  );
};

export default WritePage;
