import Image from "next/image";
import Link from "next/link";
import FEALogo from "@/public/assets/fea-light.png";

export default function FormHeader() {
  return (
    <header className="w-full bg-[#111111] px-8 md:px-16 lg:px-24 py-6">
      <Link href="/">
        <Image src={FEALogo} alt="FEA Logo" className="h-10 w-10" />
      </Link>
    </header>
  );
}
