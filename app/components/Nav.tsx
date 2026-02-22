import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <nav className="flex h-16 flex-col justify-center border-b border-[#E2DDD7] px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-12">
      <Link
        href="/"
        className="flex items-center gap-2 font-[family-name:var(--font-playfair)] text-[22px] font-bold italic text-[#1A1714]"
      >
        Earth
        <span className="relative flex h-9 w-9 overflow-hidden rounded bg-transparent">
          <Image
            src="/images/image-1.png"
            alt="Earth logo"
            width={38}
            height={38}
            className="object-cover"
          />
        </span>
      </Link>
      <div className="mt-2 flex gap-6 sm:mt-0 sm:gap-9">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-[family-name:var(--font-literata)] text-[15px] text-[#6B6560] transition-colors hover:text-[#1A1714]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
