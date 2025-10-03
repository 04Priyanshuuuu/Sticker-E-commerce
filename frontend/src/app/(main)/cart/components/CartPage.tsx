import React from "react";
import Link from "next/link";

export default function CartPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <p className="mt-4">Cart items will appear here.</p>
      <Link href="/" className="text-blue-600 mt-4 block">Back to home</Link>
    </main>
  );
}