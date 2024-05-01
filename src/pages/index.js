import { useEffect } from "react";
import { useRouter } from "next/router";

// Redirects must now be handled client-side
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/homepage");
    } else {
      router.replace("/auth");
    }
  }, [router]);

  return <div></div>;
}
