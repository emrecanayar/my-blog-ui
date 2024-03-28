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
import { Card, Image } from "antd";
import { CreateArticleCommand } from "../../services/article/dtos/createArticleCommand";
import { modules, formats } from "../../options/reactQuillOptions";
import uploadedFileStore from "../../stores/uploadedFile/uploadedFileStore";
import { observer } from "mobx-react";
import config from "../../config";
import articleStore from "../../stores/article/articleStore";
import { toast } from "react-toastify";

export interface OptionsTypes {
  value: string;
  label: string;
}

const WritePage = observer(() => {
  const [createArticle, setCreateArticle] = useState<CreateArticleCommand>({
    title: "",
    content: "",
    categoryId: "",
    tags: [],
    tokens: [],
  });

  const [categories, setCategories] = useState<CategoryListModel>(
    {} as CategoryListModel
  );

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const toolbar = document.querySelector('.ql-toolbar') as HTMLElement | null;
    
    const handleScroll = () => {
      if (toolbar) {
        if (window.scrollY > toolbar.offsetTop) {
          toolbar.classList.add(`${styles.fixedToolbar}`);
        } else {
          toolbar.classList.remove(`${styles.fixedToolbar}`);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Boş bağımlılık listesi, bu efektin bileşen yüklendiğinde bir kez çalıştırılmasını sağlar.

  const fetchCategoriesData = async () => {
    try {
      let categoriesResult = await categoryStore.getCategoriesListByDynamic(
        { pageIndex: 0, pageSize: 1000 },
        { filter: undefined }
      );
      setCategories(categoriesResult);
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
      tags: newTags,
    }));
  };

  const clearCategoryTokens = () => {
    setCreateArticle((prevState) => ({
      ...prevState,
      tokens: [],
    }));
  };

  const handleSubmit = async (event: any) => {
    setLoadingSubmit(true);
    event?.preventDefault();
    try {
      clearCategoryTokens();
      if (!uploadedFileStore.uploadFile) {
        toast.error("Lütfen bir dosya yükleyin.");
        setLoadingSubmit(false);
        return;
      }
      createArticle.tokens.push(uploadedFileStore.uploadedFile.token);
      await articleStore.createArticle(createArticle);
      toast.success("Makale başarıyla oluşturuldu. Yönleniyorsunuz...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoadingSubmit(false);
    }
  };
  const options: OptionsTypes[] = [];

  categories.items?.forEach((category) => {
    options.push({ value: category.id, label: category.name });
  });

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: "5px" }}>Makale Ekle</h2>
      <div className={styles.cardContainer}>
        <div className={styles.thumbnailUpload}>
          <Card title="Thumbnail">
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
          </Card>
          <Card title="Thumbnail Ekle" style={{marginTop:"10px"}}>
            <UploadFile
              uploadText="Thumbnail görseli yüklemek için bu alana tıklayın veya görseli sürükleyin"
              uploadHint="Tek ve toplu dosya yükleme desteği"
            />
          </Card>
        </div>

        <Card title="Kategori Seç">
          <Select
            options={options}
            placeholder="Kategori Seçiniz..."
            onChange={handleCategoryChange}
            value={options.find(
              (option) => option.value === createArticle.categoryId
            )}
          />
        </Card>
        <Card title="Etkiketler">
          <TagInput
            placeholder="Bir etkiket değeri yazın ve Enter'a basın"
            onTagsChange={handleTagsChange}
          />
        </Card>
        <Card title="Makale Detayı">
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
        </Card>
        <button
          type="submit"
          className={styles.publish}
          disabled={loadingSubmit}
        >
          Yayınla
        </button>
      </div>
    </form>
  );
});
export default WritePage;
