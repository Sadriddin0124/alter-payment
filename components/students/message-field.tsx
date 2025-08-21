"use client";

import { Chip } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import Typography from "../ui/typography";

const keywords = [
  { key: "{first_name}", label: "Ism" },
  { key: "{last_name}", label: "Familiya" },
  { key: "{contract_date}", label: "Shartnoma sanasi" },
];

export default function MessageField() {
  const { setValue, watch } = useFormContext();
  const value = watch("message");

  // Create editor once
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[300px] outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2",
      },
    },
  });

  // Sync form value -> editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  // Sync editor -> form value
useEffect(() => {
  if (!editor) return;

  const handler = () => {
    setValue("message", editor.getHTML(), { shouldValidate: true });
  };

  editor.on("update", handler);

  // ✅ return a cleanup function
  return () => {
    editor.off("update", handler);
  };
}, [editor, setValue]);


  const insertKeyword = (keyword: string) => {
    if (editor) {
      editor.chain().focus().insertContent(keyword).run();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6 max-w-[368px] min-h-[512px] h-full w-full border border-gray-200">
      <Typography variant="h5">
        Yubormoqchi bo’lgan smsni quyidagi maydonga yozing
      </Typography>

      {/* Editor */}
      <div className="border max-h-[128px] border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#5B72B5]">
        <EditorContent editor={editor} />
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2">
        {keywords.map((kw) => (
          <Chip
            key={kw.key}
            label={kw.label}
            variant="outlined"
            onClick={() => insertKeyword(kw.key)}
            clickable
          />
        ))}
      </div>
    </div>
  );
}
