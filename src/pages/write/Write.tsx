import { useEffect, useState } from "react";
import styles from "./write.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill'in temel stil dosyası
import categoryStore from "../../stores/category/categoryStore";
import { CategoryListModel } from "../../services/category/dtos/categoryListModel";
import { handleApiError } from "../../helpers/errorHelpers";
import Select from "react-select";
import UploadFile from "../../components/uploadFile/UploadFile";

export interface OptionsTypes {
  value: string;
  label: string;
}

const WritePage = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<CategoryListModel>(
    {} as CategoryListModel
  );

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

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    try {
      let categoriesResult = await categoryStore.getCategoriesListByDynamic(
        { pageIndex: 0, pageSize: 1000 },
        { filter: undefined }
      );
      setCategories(categoriesResult);
      console.log(categoriesResult);
    } catch (error) {
      handleApiError(error);
    }
  };

  const options: OptionsTypes[] = [];

  categories.items?.forEach((category) => {
    options.push({ value: category.id, label: category.name });
  });

  return (
    <div className={styles.cardContainer}>
      <h2>Makale Yaz</h2>
      <div className={styles.thumbnailUpload}>
        <UploadFile
          uploadText="Thumbnail görseli yüklemek için bu alana tıklayın veya görseli sürükleyin"
          uploadHint="Tek ve toplu dosya yükleme desteği"
        />
      </div>
      <Select options={options} placeholder="Kategori Seçiniz..." />
      <input
        type="text"
        placeholder="Makale Başlığı"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.editor}>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Makale içeriği..."
          formats={formats}
        />
      </div>
      <button className={styles.publish}>Yayınla</button>
    </div>
  );
};

export default WritePage;
