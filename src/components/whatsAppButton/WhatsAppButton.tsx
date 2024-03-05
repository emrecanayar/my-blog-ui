interface WhatsAppButtonProps {
  phone: string;
  message: string;
  icon: string;
  width?: number;
  height?: number;
}

const WhatsAppButton = ({ phone, message, icon,width,height }: WhatsAppButtonProps) => {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt="WhatsApp" width={width} height={height} />
    </a>
  );
};
export default WhatsAppButton;
