"use client";

import dynamic from "next/dynamic";
import { useRef, forwardRef, useImperativeHandle } from "react";
import "react-quill-new/dist/quill.snow.css"; // Đảm bảo bạn nhập đúng CSS cho phiên bản mới
import { DescriptionProps } from "types/type";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// Bọc ReactQuill trong một component với forwardRef
const QuillEditor = forwardRef((props: any, ref) => {
  const quillRef = useRef<any>(null);

  // Sử dụng useImperativeHandle để truy cập đối tượng Quill từ bên ngoài
  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
  }));

  return <ReactQuill ref={quillRef} {...props} />;
});

QuillEditor.displayName = "QuillEditor";

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Thêm nhiều cấp độ header
      [{ font: [] }], // Thêm font family
      [{ size: ["small", false, "large", "huge"] }], // Thêm kích thước font
      ["bold", "italic", "underline", "strike", "blockquote"], // Các công cụ định dạng cơ bản
      [{ color: [] }, { background: [] }], // Màu chữ và màu nền
      [{ align: [] }], // Căn chỉnh văn bản
      [{ list: "ordered" }, { list: "bullet" }], // Danh sách có thứ tự và không thứ tự
      [{ indent: "-1" }, { indent: "+1" }], // Thụt lề
      ["link", "image", "video"], // Chèn liên kết, ảnh và video
      ["code-block"], // Chèn khối code
      ["clean"], // Xóa định dạng
    ],
    handlers: {
      image: function (this: any) {
        // Xử lý sự kiện chèn ảnh
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const imageUrl = e.target?.result as string;

              // Lấy đối tượng Quill từ ref
              const quill = this.quill; // Sử dụng `this.quill` để truy cập đối tượng Quill
              if (quill) {
                const range = quill.getSelection(true);
                quill.insertEmbed(range.index, "image", imageUrl, "user");
                quill.setSelection(range.index + 1);
              }
            };
            reader.readAsDataURL(file);
          }
        };
      },
    },
  },
};



const Description = ({ data, handleData }: DescriptionProps) => {
  const quillRef = useRef<any>(null); // Khai báo quillRef bằng useRef

  const handleChange = (value: string) => {
    handleData("description", value);
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
      <h1 className="font-semibold">Mô tả</h1>
      <QuillEditor
        ref={quillRef} // Sử dụng ref đã được forward
        value={data?.description || ""} // Cung cấp chuỗi rỗng nếu không có description
        onChange={handleChange}
        modules={modules}
        placeholder="Enter your description here..."
      />
    </section>
  );
};

export default Description;