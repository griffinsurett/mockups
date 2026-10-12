import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function SocialIcons() {
  return (
    <div className="flex space-x-3">
      <a
        href="#"
        aria-label="Facebook"
        className="w-9 h-9 flex items-center justify-center border border-white/20 text-white hover:border-[#d39a4d] hover:text-[#d39a4d] transition-colors duration-200"
      >
        <FaFacebookF size={15} />
      </a>
      <a
        href="#"
        aria-label="X / Twitter"
        className="w-9 h-9 flex items-center justify-center border border-white/20 text-white hover:border-[#d39a4d] hover:text-[#d39a4d] transition-colors duration-200"
      >
        <FaXTwitter size={15} />
      </a>
    </div>
  );
}
