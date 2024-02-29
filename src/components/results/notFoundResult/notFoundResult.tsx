import { Button, Result } from "antd";

interface NotFoundResultProps {
  title: string;
}

const NotFoundResult = ({ title }: NotFoundResultProps) => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle={title}
        extra={<Button type="primary">Ana Sayfa</Button>}
        style={{ backgroundColor: "#f0f2f5" }}
      />
    </div>
  );
};
export default NotFoundResult;
