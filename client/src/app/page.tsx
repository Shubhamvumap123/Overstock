"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
        Track Your Job Search <span className="text-blue-600">Smarter</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl">
        Organize your applications, track interview statuses, and get insights into your job hunt all in one powerful dashboard.
      </p>
      <div className="flex gap-4">
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
