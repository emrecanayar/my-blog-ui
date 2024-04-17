import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../../../../options/reactQuillOptions";

interface EditCommentModalProps {
  isModalVisible: boolean;
  handleOk: (editedContent: string) => void;
  handleCancel: () => void;
  content: string;
}

const EditCommentModal: React.FC<EditCommentModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  content,
}) => {
  const [editingContent, setEditingContent] = useState<string>(content);

  // Eğer dışarıdan gelen içerik değişirse, modal içindeki state'i güncelle
  useEffect(() => {
    setEditingContent(content);
  }, [content]);

  const handleContentChange = (content: string) => {
    setEditingContent(content);
  };

  return (
    <Modal
      title="Yorum Düzenle"
      visible={isModalVisible}
      onOk={() => handleOk(editingContent)}
      okText="Kaydet"
      onCancel={handleCancel}
      cancelText="İptal"
      width={600}
    >
      <ReactQuill
        theme="snow"
        value={editingContent}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
      />
    </Modal>
  );
};

export default EditCommentModal;
