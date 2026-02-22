import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { markdownComponents } from "@/app/lib/markdown";

interface MarkdownBodyProps {
  content: string;
}

export function MarkdownBody({ content }: MarkdownBodyProps) {
  return (
    <div className="blog-prose space-y-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
