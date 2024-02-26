import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import useFileUpload from "../../hooks/useFileUpload";
import { ToastContainer, toast } from "react-toastify";
import uploadedFileStore from "../../stores/uploadedFile/uploadedFileStore";
import { observer } from "mobx-react";

export interface UploadFileProps {
  uploadText: string;
  uploadHint: string;
}

const UploadFile = observer(({ uploadText, uploadHint }: UploadFileProps) => {
  const { handleFileSelect } = useFileUpload();

  // customRequest fonksiyonu, Ant Design'ın Upload bileşenine entegre edilecek
  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;

    try {
      // Dosya seçim işlemini taklit etmek için oluşturulan fake event
      const fakeEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      await handleFileSelect(fakeEvent);

      if (onSuccess) {
        onSuccess("Dosya başarıyla yüklendi.", file);
        toast.success("Dosya başarıyla yüklendi.");
        const token = uploadedFileStore.uploadedFile.token;
        await uploadedFileStore.getFile({ token: token });
        uploadedFileStore.setUploadedFilePath(
          uploadedFileStore.getUploadedFile.path
        );
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  };

  return (
    <div>
      <Upload.Dragger
        name="files"
        customRequest={customRequest}
        showUploadList={true}
        onRemove={(file) => {
          uploadedFileStore.clearUploadedFilePath();
          return true;
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{uploadText}</p>
        <p className="ant-upload-hint">{uploadHint}</p>
      </Upload.Dragger>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
});
export default UploadFile;
