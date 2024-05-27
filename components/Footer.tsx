import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-4 py-6 border-t">
      <ul className="mx-auto mb-4 flex flex-col md:flex-row gap-12 justify-center">
        <li>
          <Link className="text-sm hover:underline" href="/about">
            このサイトについて
          </Link>
        </li>
        <li>
          <Link className="text-sm hover:underline" href="/policy">
            プライバシーポリシー
          </Link>
        </li>
        <li>
          <Link
            className="text-sm hover:underline"
            href="https://forms.gle/qi3w8h1Ao6HDJbyJA"
            target="_blank"
          >
            お問い合わせ
          </Link>
        </li>
      </ul>
      <div className="text-center">
        <small>&copy;2024 Hiroshi Igarashi</small>
      </div>
    </footer>
  );
};

export default Footer;
