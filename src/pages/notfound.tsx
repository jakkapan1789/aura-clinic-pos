import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    console.error(
      "404 Error: User attempted to access non-existent route:",
      router.asPath,
    );
  }, [router.isReady, router.asPath]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground">
          404
        </h1>

        <p className="mb-6 text-lg text-muted-foreground">
          Oops! The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
