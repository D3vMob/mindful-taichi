import DOMPurify from 'isomorphic-dompurify'

interface SafeHtmlRenderProps {
  content: string;
}

export function SafeHtmlRender({ content }: SafeHtmlRenderProps) {
 
    const cleanHtml = DOMPurify.sanitize(content);
 
    return (
    <div
      dangerouslySetInnerHTML={{
        __html: cleanHtml,
      }}
    />
  );
}