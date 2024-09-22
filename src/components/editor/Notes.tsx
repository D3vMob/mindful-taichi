import DOMPurify from "isomorphic-dompurify";

interface SafeHtmlRenderProps {
  content: string;
}

export function SafeHtmlRender({ content }: SafeHtmlRenderProps) {
  const cleanHtml = DOMPurify.sanitize(content, {
    ADD_TAGS: ["ul", "ol"],
    ADD_ATTR: ["style"],
    ALLOWED_ATTR: ["style"],
    ALLOW_DATA_ATTR: true,
  });

  return (
    <div
      className="ProseMirror"
      style={{ whiteSpace: "pre-line" }}
      dangerouslySetInnerHTML={{
        __html: cleanHtml,
      }}
    />
  );
}
