import { WarningOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Tooltip } from "antd";
import styles from "./reportPopever.module.css";

const { TextArea } = Input;

interface ReportPopoverProps {
  commentId: string;
  reason: string;
  onReasonChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmitReport: (commentId: string) => void;
}

const ReportPopover: React.FC<ReportPopoverProps> = ({
  commentId,
  reason,
  onReasonChange,
  onSubmitReport,
}) => {
  return (
    <Popover
      content={
        <div className={styles.reportPopoverContainer}>
          <TextArea
            placeholder="Raporlama nedenini yazın"
            className={styles.reportInput}
            value={reason}
            onChange={onReasonChange}
            rows={4}
          />
          <Button type="primary" onClick={() => onSubmitReport(commentId)}>
            Rapor Et
          </Button>
        </div>
      }
      title="Yorumu Rapor Et"
      trigger="click"
      onVisibleChange={(visible) => {
        if (!visible) {
          onReasonChange({
            target: { value: "" },
          } as React.ChangeEvent<HTMLTextAreaElement>); // Popover kapanırken input'u sıfırla
        }
      }}
    >
      <Tooltip title="Rapor Et" color="pink" key="pink" placement="bottom">
        <Button icon={<WarningOutlined />}></Button>
      </Tooltip>
    </Popover>
  );
};

export default ReportPopover;
