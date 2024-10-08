import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="px-4 py-6 border-t">
      <ul className="mx-auto mb-4 flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center">
        <li>
          <Link className="text-sm hover:underline" href="/about">
            コレミナについて
          </Link>
        </li>
        <li>
          <Link className="text-sm hover:underline" href="/history">
            更新履歴
          </Link>
        </li>
        <li>
          <Link className="text-sm hover:underline" href="/policy">
            プライバシーポリシー
          </Link>
        </li>
        <li>
          <Link className="text-sm hover:underline" href="/faq">
            FAQ
          </Link>
        </li>
        <li>
          <Link
            className="text-sm hover:underline"
            href="https://forms.gle/qi3w8h1Ao6HDJbyJA"
            target="_blank"
          >
            お問い合わせ
            <ExternalLink
              className="inline-block ml-1"
              width={12}
              height={12}
            />
          </Link>
        </li>
        <li className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="https://x.com/koremina_app" target="_blank">
              <FaXTwitter size={20} />
            </Link>
          </Button>
          <Link href="https://github.com/HiroshiIgarash/koremina" target="_blank" className="">
            <FaGithub size={32} />
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
