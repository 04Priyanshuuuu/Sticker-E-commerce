import React from "react";
import Link from "next/link";

interface CartPageProps {
  user: {
    name: string;
    email?: string;
  };
}

export default function CartPage({ user }: CartPageProps) {
  return (
    <main className="p-8">
      <h1 className="text-2xl mt-50 font-bold">Hi {user.name}, Your Cart</h1>
      <p className="mt-4">Cart items will appear here.</p>
      <Link href="/" className="text-blue-600 mt-4 block">
        Back to home
      </Link>
    </main>
  );
}
