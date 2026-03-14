import Image from "next/image";
import Link from "next/link";
import FEALogo from "@/public/assets/fea-dark.png";

export default function FormHeader() {
  return (
    <header className="w-full z-90 p-6 border-b bg-white">
      <Link href="/">
        <Image src={FEALogo} alt="FEA Logo" className="h-10 w-10" />
      </Link>
    </header>
  );
}
