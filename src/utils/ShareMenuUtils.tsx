import React from "react";
import { GetListArticleListItemDto } from "../services/article/dtos/getListArticleListItemDto";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

interface ShareLink {
  icon: React.ReactElement;
  label: string;
  url: string;
}

// Paylaşım linklerini ve sosyal medya platformlarını oluşturmak için bir fonksiyon
export const shareLinks = (
  item: GetListArticleListItemDto,
  detailUrl: string
): ShareLink[] => {
  const currentUrl = window.location.href;
  const urlEncoded = encodeURIComponent(currentUrl + detailUrl);
  const titleEncoded = encodeURIComponent(item.title);

  return [
    {
      icon: <TwitterOutlined />,
      label: "Twitter'da Paylaş",
      url: `https://twitter.com/intent/tweet?url=${urlEncoded}&text=${titleEncoded}`,
    },
    {
      icon: <FacebookOutlined />,
      label: "Facebook'ta Paylaş",
      url: `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`,
    },
    {
      icon: <LinkedinOutlined />,
      label: "LinkedIn'de Paylaş",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${urlEncoded}&title=${titleEncoded}`,
    },
  ];
};
