"use client";
import { PackageCheck, CreditCard, Upload, Pencil } from "lucide-react";
import MotionWrapper from "./MotionWrapper";

const steps = [
  {
    icon: <Pencil className="w-10 h-10 text-purple-400" />,
    title: "Customise Your Product",
    desc: "Choose your sticker type, shape, and finish. Preview combinations and confirm your perfect design.",
  },
  {
    icon: <Upload className="w-10 h-10 text-purple-400" />,
    title: "Upload or Design Online",
    desc: "Upload your ready design or use our built-in design tool to personalize it your way.",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-purple-400" />,
    title: "Payment & Checkout",
    desc: "Add to cart, confirm delivery details, and complete your secure checkout seamlessly.",
  },
  {
    icon: <PackageCheck className="w-10 h-10 text-purple-400" />,
    title: "Receive Your Order",
    desc: "Sit back and relax — your customized stickers will be printed and delivered right to you.",
  },
];

export default function OrderingProcess() {
  return (
    <section className="py-20 px-6 bg-black text-gray-200">
      <div className="max-w-6xl mx-auto">
        <MotionWrapper delay={0.1}>
          <h2 className="text-4xl font-bold text-center mb-14 text-white">
            Our Ordering Process
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {steps.map((step, i) => (
            <MotionWrapper key={i} delay={0.15 * i}>
              <div className="flex flex-col items-center bg-zinc-900 rounded-2xl p-8 hover:bg-zinc-800 transition-colors duration-300 shadow-lg shadow-purple-900/10">
                <div className="mb-5 p-4 bg-zinc-800 rounded-full">{step.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
