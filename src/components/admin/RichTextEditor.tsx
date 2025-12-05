import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  placeholder?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  label = "İçerik",
  placeholder = "Buraya blog yazınızı yazmaya başlayın…",
}: RichTextEditorProps) => {
  // Configure toolbar with required formats
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }], // H1, H2, H3
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  // Configure allowed formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="bg-background">
        <ReactQuill
          theme="snow"
          value={value || ""}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="[&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-foreground [&_.ql-container]:border-border [&_.ql-toolbar]:border-border [&_.ql-toolbar]:bg-muted/50 [&_.ql-editor]:prose [&_.ql-editor]:prose-sm [&_.ql-editor]:max-w-none"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
