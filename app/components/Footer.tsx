const footerLinks = [
  { href: "/rss", label: "RSS" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://github.com", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#E2DDD7] px-4 py-4 sm:flex-row sm:px-6 sm:py-0 sm:h-16 md:px-12">
      <p className="text-center font-[family-name:var(--font-literata)] text-[13px] text-[#A09A94] sm:text-left">
        © 2026 Earth. Made with care in Chiang Rai.
      </p>
      <div className="flex gap-6">
        {footerLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="font-[family-name:var(--font-literata)] text-[13px] text-[#A09A94] transition-colors hover:text-[#6B6560]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
