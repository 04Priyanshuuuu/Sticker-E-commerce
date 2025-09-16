"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `The Goal is to deliver a quality of stickers.`;

export function Goal() {
  return (
      <div>
        <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
          Goal
        </h1>
        <div className="flex justify-center items-center h-20 w-full">
          <TextGenerateEffect duration={2} filter={false} words={words} />
        </div>
      </div>
    )
}
