"use client";

import dynamic from "next/dynamic";
import { useRef, forwardRef, useImperativeHandle } from "react";
import "react-quill-new/dist/quill.snow.css"; // Đảm bảo bạn nhập đúng CSS cho phiên bản mới
import { DescriptionProps } from "types/type";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Định nghĩa kiểu cho QuillEditor props và ref
interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  modules?: object;
  placeholder?: string;
}

// Bọc ReactQuill trong một component với forwardRef
const QuillEditor = forwardRef((props: QuillEditorProps, ref) => {
  const quillRef = useRef<ReactQuill | null>(null);

  // Sử dụng useImperativeHandle để truy cập đối tượng Quill từ bên ngoài
  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
  }));

  return <ReactQuill ref={quillRef} {...props} />;
});

QuillEditor.displayName = "QuillEditor";

// Định nghĩa kiểu cho QuillModules
interface QuillModules {
  toolbar: {
    container: unknown[];
    handlers: {
      image: () => void;
    };
  };
}

// Định nghĩa các modules cho QuillEditor
const modules: QuillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["code-block"],
      ["clean"],
    ],
    handlers: {
      image: function () {
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
              const quill = this.quill;
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
  const quillRef = useRef<ReactQuill | null>(null); // Khai báo quillRef với kiểu rõ ràng

  const handleChange = (value: string) => {
    handleData("description", value);
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
      <h1 className="font-semibold">Mô tả</h1>
      <QuillEditor
        ref={quillRef}
        value={data?.description || ""}
        onChange={handleChange}
        modules={modules}
        placeholder="Enter your description here..."
      />
    </section>
  );
};

export default Description;
