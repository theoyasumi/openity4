"use client";

import dynamic from "next/dynamic";
import { editorModules, editorFormats } from "@/lib/editor/config";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Chargement de l'éditeur...</p>,
});

interface ResizableEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ResizableEditor({ value, onChange, className }: ResizableEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[200px] border rounded-md bg-muted/10 flex items-center justify-center">
        <p className="text-muted-foreground">Chargement de l'éditeur...</p>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "border rounded-md overflow-hidden bg-background",
        className
      )}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={editorModules}
        formats={editorFormats}
        className="h-[200px]"
      />
    </div>
  );
}