import styles from "./not-found.module.css";
import Link from "next/link";
import { FaUnlink } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-background text-foreground ${styles.notFound}`}
    >
      <FaUnlink className="text-6xl mb-4 text-muted-foreground" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="mb-8 text-muted-foreground">
        Oops! IDK what you&rsquo;re looking for, but the page you&rsquo;re
        looking for doesn&rsquo;t exist.
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
