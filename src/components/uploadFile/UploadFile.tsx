import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import useFileUpload from "../../hooks/useFileUpload";

export interface UploadFileProps {
  uploadText: string;
  uploadHint: string;
}

const UploadFile = ({ uploadText, uploadHint }: UploadFileProps) => {
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
        showUploadList={false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{uploadText}</p>
        <p className="ant-upload-hint">{uploadHint}</p>
      </Upload.Dragger>
    </div>
  );
};
export default UploadFile;
