import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/mac.png"
            alt="Mac Icon"
            width={50}
            height={50}
            className="mr-2"
          />
          <Link href="/" className="font-bold text-xl">
            Vishrut Jha
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/journey">Journey</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/achievements">Achievements</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
