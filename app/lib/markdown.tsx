import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="font-[family-name:var(--font-literata)] text-base leading-[1.8] text-[#1A1714] sm:text-[17px]">
      {children}
    </p>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1A1714] sm:text-[26px]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1A1714]">
      {children}
    </h3>
  ),
  pre: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded">
      <pre className="bg-[#1E1E1B] p-5 pr-6 font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.6] text-[#A8C49A] sm:p-6 sm:pr-8">
        {children}
      </pre>
    </div>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="rounded bg-[#E8F0E1] px-1.5 py-0.5 font-[family-name:var(--font-jetbrains)] text-[13px] text-[#2D5016]"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-6 font-[family-name:var(--font-literata)] text-base text-[#1A1714] sm:text-[17px]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 font-[family-name:var(--font-literata)] text-base text-[#1A1714] sm:text-[17px]">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-[#2D5016] pl-4 font-[family-name:var(--font-literata)] italic text-[#6B6560]">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#2D5016] underline transition-colors hover:text-[#1A1714]"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
};
