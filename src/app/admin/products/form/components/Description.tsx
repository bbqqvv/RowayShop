"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Đảm bảo bạn nhập đúng CSS cho phiên bản mới

// Nhập động phiên bản fork của ReactQuill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["extra-small", "small", "medium", "large"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  },
};

interface DescriptionProps {
  data: {
    description?: string; // description có thể là string hoặc undefined
  } | null;
  handleData: (key: string, value: any) => void;
}

const Description = ({ data, handleData }: DescriptionProps) => {
  const handleChange = (value: string) => {
    handleData("description", value);
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
      <h1 className="font-semibold">Description</h1>
      <ReactQuill
        value={data?.description || ""} // Cung cấp chuỗi rỗng nếu không có description
        onChange={handleChange}
        modules={modules}
        placeholder="Enter your description here..."
      />
    </section>
  );
};

export default Description;
