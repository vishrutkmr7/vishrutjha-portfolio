import styles from "./not-found.module.css";

import Link from "next/link";
import { FaUnlink } from "react-icons/fa";

export default function NotFound() {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white ${styles.notFound}`}
    >
      <FaUnlink className="text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="mb-8">
        Oops! IDK what you&rsquo;re looking for, but the page you&rsquo;re
        looking for doesn&rsquo;t exist.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Home
      </Link>
    </div>
  );
}
