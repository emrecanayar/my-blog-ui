import { Col, DatePicker, Form, Input, Modal, Row, Button, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../../../../options/reactQuillOptions";
import { GetByIdCommentResponse } from "../../../../../../services/comment/dtos/getByIdCommentResponse";
import dayjs from "dayjs";
import commentStore from "../../../../../../stores/comment/commentStore";
import { ToastContainer, toast } from "react-toastify";
import { handleApiError } from "../../../../../../helpers/errorHelpers";
import { EditCommentCommand } from "../../../../../../services/comment/dtos/editCommentCommand";

interface EditCommentModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  commentDetail: GetByIdCommentResponse;
  onUpdateSuccess: () => void; // Yeni prop eklendi
}

const EditCommentModal: React.FC<EditCommentModalProps> = ({
  isModalVisible,
  handleCancel,
  commentDetail,
  onUpdateSuccess,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    commentDetail?.datePosted ? dayjs(commentDetail.datePosted) : null
  );

  const [editComment, setEditComment] = useState<EditCommentCommand>({
    id: commentDetail?.id,
    authorName: commentDetail?.authorName,
    auhorWebsite: commentDetail?.authorWebsite,
    content: commentDetail?.content,
    datePosted: commentDetail?.datePosted,
  });

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setSelectedDate(
      commentDetail?.datePosted ? dayjs(commentDetail.datePosted) : null
    );
    setEditComment({
      id: commentDetail?.id,
      authorName: commentDetail?.authorName,
      auhorWebsite: commentDetail?.authorWebsite,
      content: commentDetail?.content,
      datePosted: commentDetail?.datePosted,
    });
    setIsModified(false);
  }, [commentDetail]);

  const checkModification = () => {
    const isChanged =
      JSON.stringify({
        id: commentDetail?.id,
        authorName: commentDetail?.authorName,
        authorWebsite: commentDetail?.authorWebsite,
        content: commentDetail?.content,
        datePosted: commentDetail?.datePosted,
      }) !== JSON.stringify(editComment);
    setIsModified(isChanged);
  };

  const handleContentChange = (content: string) => {
    setEditComment((prevState) => ({ ...prevState, content: content }));
    checkModification();
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setEditComment((prevState) => ({
      ...prevState,
      datePosted: date.$d,
    }));
    checkModification();
  };

  const handleNameChange = (name: any) => {
    setEditComment((prevState) => ({
      ...prevState,
      authorName: name.target.value,
    }));
    checkModification();
  };

  const handleUrlChange = (url: any) => {
    setEditComment((prevState) => ({
      ...prevState,
      authorWebsite: url.target.value,
    }));
    checkModification();
  };

  const handleOk = async () => {
    try {
      let response = await commentStore.editComment(editComment);
      if (response.id !== undefined) {
        message.success("Yorum başarıyla güncellendi.");
      }
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      handleCancel();
      onUpdateSuccess();
    }
  };

  return (
    <Modal
      title="Yorum Düzenle"
      visible={isModalVisible}
      onOk={handleOk}
      okText="Kaydet"
      okButtonProps={{ disabled: !isModified }}
      onCancel={handleCancel}
      cancelText="İptal"
      width={800}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="İsim">
              <Input
                placeholder="İsim"
                defaultValue={editComment.authorName}
                onChange={handleNameChange}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="URL">
              <Input
                placeholder="URL"
                defaultValue={editComment.auhorWebsite}
                onChange={handleUrlChange}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tarih">
              <DatePicker
                format="DD.MM.YYYY"
                defaultValue={selectedDate}
                onChange={handleDateChange}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Yorum">
          <ReactQuill
            theme="snow"
            value={editComment.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
          />
        </Form.Item>
      </Form>
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
    </Modal>
  );
};

export default EditCommentModal;
