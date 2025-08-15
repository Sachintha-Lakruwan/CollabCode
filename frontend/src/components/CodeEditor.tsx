import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";

interface CodeEditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  language?: string;
}

export default function CodeEditor({
  value,
  onChange,
  placeholder = "Type here...",
  language = "javascript",
}: CodeEditorProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const codeDisplayRef = useRef<HTMLDivElement>(null);

  // Handle code changes and highlight syntax
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    onChange(e);

    // Update the highlighted display
    if (codeDisplayRef.current) {
      const highlightedCode = Prism.highlight(
        newCode,
        Prism.languages[language as keyof typeof Prism.languages] ||
          Prism.languages.javascript,
        language
      );

      // Preserve newlines by wrapping in <pre> tags
      codeDisplayRef.current.innerHTML = `<pre style="margin: 0; padding: 0; background: transparent;">${highlightedCode}</pre>`;
    }
  };

  // Focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Update syntax highlighting when value prop changes
  useEffect(() => {
    if (codeDisplayRef.current) {
      const highlightedCode = Prism.highlight(
        value,
        Prism.languages[language as keyof typeof Prism.languages] ||
          Prism.languages.javascript,
        language
      );

      // Preserve newlines by wrapping in <pre> tags
      codeDisplayRef.current.innerHTML = `<pre style="margin: 0; padding: 0; background: transparent;">${highlightedCode}</pre>`;
    }
  }, [value, language]);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      className=" overflow-hidden"
    >
      {/* Hidden textarea for input */}
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleCodeChange}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          fontFamily: "monospace",
          fontSize: "14px",
          lineHeight: "1.5",
          border: "none",
          outline: "none",
          resize: "none",
          background: "transparent",
          color: "transparent",
          caretColor: "black",
          zIndex: 10,
          padding: "0",
          margin: "0",
        }}
        placeholder={placeholder}
        spellCheck={false}
      />
      {/* Syntax highlighted display */}
      <div
        ref={codeDisplayRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          fontFamily: "monospace",
          fontSize: "14px",
          lineHeight: "1.5",
          overflow: "auto",
          padding: "0",
          margin: "0",
          background: "transparent",
          pointerEvents: "none",
        }}
        className={`language-${language}`}
      />
    </div>
  );
}
