"use client";
import { FaGithub, FaReact, FaPython } from "react-icons/fa";
import {
  SiNextdotjs,
  SiDjango,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiMysql,
} from "react-icons/si";

export default function TechStack() {
  return (
    <section className="border-t border-white/10 mt-20">
      <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
        Tech Stack
      </h1>
      <div className="bg-black text-white py-20 flex flex-col items-center justify-center px-4 ">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Built With ❤️ and Open for Developers
        </h2>

        <p className="text-gray-400 text-center mb-10 max-w-3xl">
          Sticke is crafted with a modern full-stack setup to deliver a smooth,
          fast, and scalable sticker e-commerce experience. We’re an open and
          growing project — if you’re passionate about building cool web stuff,
          join us or contribute to make Sticke even better!
        </p>

        {/* Tech Stack Icons */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="flex flex-col items-center">
            <SiHtml5 className="text-4xl text-orange-500 mb-2" />
            <span className="text-gray-400 text-sm">HTML</span>
          </div>

          <div className="flex flex-col items-center">
            <SiCss className="text-4xl text-blue-500 mb-2" />
            <span className="text-gray-400 text-sm">CSS</span>
          </div>

          <div className="flex flex-col items-center">
            <SiJavascript className="text-4xl text-yellow-400 mb-2" />
            <span className="text-gray-400 text-sm">JavaScript</span>
          </div>

          <div className="flex flex-col items-center">
            <SiTypescript className="text-4xl text-blue-400 mb-2" />
            <span className="text-gray-400 text-sm">TypeScript</span>
          </div>
          <div className="flex flex-col items-center">
            <FaReact className="text-4xl text-blue-400 mb-2" />
            <span className="text-gray-400 text-sm">React</span>
          </div>
          <div className="flex flex-col items-center">
            <SiTailwindcss className="text-4xl text-cyan-400 mb-2" />
            <span className="text-gray-400 text-sm">Tailwind CSS</span>
          </div>
          <div className="flex flex-col items-center">
            <SiNextdotjs className="text-4xl text-white mb-2" />
            <span className="text-gray-400 text-sm">Next.js</span>
          </div>
          <div className="flex flex-col items-center">
            <FaPython className="text-4xl text-yellow-400 mb-2" />
            <span className="text-gray-400 text-sm">Python</span>
          </div>
          <div className="flex flex-col items-center">
            <SiDjango className="text-4xl text-green-500 mb-2" />
            <span className="text-gray-400 text-sm">Django</span>
          </div>

          <div className="flex flex-col items-center">
            <SiMysql className="text-4xl text-sky-500 mb-2" />
            <span className="text-gray-400 text-sm">SQL</span>
          </div>
        </div>

        {/* GitHub Button */}
        <a
          href="https://github.com/04Priyanshuuuu/Sticke"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-md font-semibold text-lg transition-all duration-300"
        >
          <FaGithub className="text-2xl" />
          View Project on GitHub
        </a>
      </div>
    </section>
  );
}
