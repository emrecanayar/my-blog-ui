import { useEffect, useState } from "react";
import styles from "./write.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill'in temel stil dosyası
import categoryStore from "../../stores/category/categoryStore";
import { CategoryListModel } from "../../services/category/dtos/categoryListModel";
import { handleApiError } from "../../helpers/errorHelpers";
import Select from "react-select";
import UploadFile from "../../components/uploadFile/UploadFile";
import TagInput from "../../components/tagInput/TagInput";
import { Image } from "antd";
import { CreateArticleCommand } from "../../services/article/dtos/createArticleCommand";
import { modules, formats } from "./options/reactQuillOptions";
import uploadedFileStore from "../../stores/uploadedFile/uploadedFileStore";
import { observer } from "mobx-react";
import config from "../../config";

export interface OptionsTypes {
  value: string;
  label: string;
}

const WritePage = observer(() => {
  const [createArticle, setCreateArticle] = useState<CreateArticleCommand>({
    title: "",
    content: "",
    categoryId: "",
    tag: [],
    tokens: [],
  });

  const [categories, setCategories] = useState<CategoryListModel>(
    {} as CategoryListModel
  );

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCreateArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuillChange = (content: string) => {
    setCreateArticle((prevState) => ({
      ...prevState,
      content: content,
    }));
  };

  const handleCategoryChange = (selectedOption: any) => {
    const categoryId = selectedOption ? selectedOption.value : "";
    setCreateArticle((prevState) => ({
      ...prevState,
      categoryId: categoryId,
    }));
  };

  const handleTagsChange = (newTags: string[]) => {
    setCreateArticle((prevState) => ({
      ...prevState,
      tag: newTags,
    }));
  };

  const handleSubmit = async (event: any) => {
    event?.preventDefault();
    try {
      if (uploadedFileStore.uploadFile === null) return null;
      createArticle.tokens.push(uploadedFileStore.uploadedFile.token);
    } catch (error) {}

    console.log(createArticle);
  };
  const options: OptionsTypes[] = [];

  categories.items?.forEach((category) => {
    options.push({ value: category.id, label: category.name });
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.cardContainer}>
        <h2>Makale Yaz</h2>
        <div className={styles.thumbnailUpload}>
          {uploadedFileStore.uploadedFilePath ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                width={750}
                height={350}
                src={`${config.FILE_BASE_URL}${uploadedFileStore.uploadedFilePath}`}
                alt="Yüklenen Dosya"
              />
            </div>
          ) : (
            ""
          )}

          <h4 style={{ marginBottom: "5px" }}>Thumbnail Ekle</h4>
          <UploadFile
            uploadText="Thumbnail görseli yüklemek için bu alana tıklayın veya görseli sürükleyin"
            uploadHint="Tek ve toplu dosya yükleme desteği"
          />
        </div>
        <div>
          <h4 style={{ marginBottom: "5px" }}>Kategori Seç</h4>
          <Select
            options={options}
            placeholder="Kategori Seçiniz..."
            onChange={handleCategoryChange}
            value={options.find(
              (option) => option.value === createArticle.categoryId
            )}
          />
        </div>
        <div>
          <h4 style={{ marginBottom: "5px" }}>Etiketler</h4>
          <TagInput
            placeholder="Bir etkiket değeri yazın ve Enter'a basın"
            onTagsChange={handleTagsChange}
          />
        </div>
        <input
          type="text"
          placeholder="Makale Başlığı"
          className={styles.input}
          onChange={handleInputChange}
          value={createArticle.title}
          name="title"
        />
        <div className={styles.editor}>
          <ReactQuill
            modules={modules}
            theme="snow"
            value={createArticle.content}
            onChange={handleQuillChange}
            placeholder="Makale içeriği..."
            formats={formats}
          />
        </div>
        <button type="submit" className={styles.publish}>
          Yayınla
        </button>
      </div>
    </form>
  );
});
export default WritePage;
