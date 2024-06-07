import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="px-4 py-6 border-t">
      <ul className="mx-auto mb-4 flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center">
        <li>
          <Link className="text-sm hover:underline" href="/about">
            このサイトについて
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
        <li>
          <Button asChild variant="ghost">
            <Link href="https://x.com/jappaann_2434" target="_blank">
              <FaXTwitter size={20} />
            </Link>
          </Button>
        </li>
      </ul>
      <div className="text-center">
        <small>&copy;2024 Hiroshi Igarashi</small>
      </div>
    </footer>
  );
};

export default Footer;
