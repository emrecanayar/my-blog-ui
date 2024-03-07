import { toast } from "react-toastify";
import uploadedFileStore from "../stores/uploadedFile/uploadedFileStore";
import { useState } from "react";

const useFileUpload = () => {
  const [fileName, setFileName] = useState("");

  const handleFiles = async (files: FileList) => {
    const file = files[0]; // Sadece ilk dosyayı alıyoruz
    if (!file) {
      setFileName("Dosya Seçilmedi");
      return;
    }

    setFileName(file.name);
    await handleFileUpload(file);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFileName("Dosya Seçilmedi");
      return;
    }

    setFileName(file.name);
    await handleFileUpload(file);
  };

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await uploadedFileStore.uploadFile(formData);
    } catch (error: any) {
      toast.error("Dosya yüklenirken bir hata oluştu.");
      console.error("File upload error", error);
    }
  };

  return { fileName, handleFileSelect, handleFiles };
};
export default useFileUpload;
