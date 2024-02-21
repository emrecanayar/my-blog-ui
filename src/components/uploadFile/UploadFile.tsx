import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export interface UploadFileProps {
  uploadText: string;
  uploadHint: string;
}

const UploadFile = ({ uploadText, uploadHint }: UploadFileProps) => {
  return (
    <div>
      <Upload.Dragger name="files" action="/upload.do">
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
