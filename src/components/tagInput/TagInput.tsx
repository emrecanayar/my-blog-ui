import { Input, Tag } from "antd";
import { useState } from "react";

export interface TagInputProps {
  placeholder: string;
  onTagsChange: (tags: string[]) => void;
}

const TagInput = ({ placeholder, onTagsChange }: TagInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault(); // Bu satırı ekleyin
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      onTagsChange(newTags); // Etiket listesi güncellendiğinde dışarıya bilgi ver
      setInputValue("");
    }
  };

  const removeTag = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    onTagsChange(newTags); // Etiket kaldırıldığında dışarıya bilgi ver
  };

  return (
    <div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder={placeholder}
      />
      <div style={{ marginTop: "10px" }}>
        {tags.map((tag, index) => (
          <Tag key={index} closable onClose={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};
export default TagInput;
