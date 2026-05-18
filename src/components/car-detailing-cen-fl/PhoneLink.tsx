import { FiPhone } from "react-icons/fi";

export default function PhoneLink() {
  return (
    <a
      href="tel:3863073785"
      className="flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase hover:text-[#d39a4d] transition-colors duration-300"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <FiPhone size={18} className="text-white" />
      (386) 307-3785
    </a>
  );
}
