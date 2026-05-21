function Footer() {
  return (
    <footer className="bg-black min-h-[650px] text-gray-300 px-6 sm:px-8 md:px-12 py-14 border-t border-gray-400">
      <div className="mb-50">
      <h1 className="mb-4 text-4xl font-semibold text-white">
        About Us
      </h1>
      <p className="max-w-5xl text-1.5xl text-gray-300">
        Welcome to StickE! Dive into the world of Stickers, and experience a rollercoaster of emotions. Discover unique stickers, posters, and creative designs specially curated for college students to add personality, style, and expression to their spaces and moments.
       </p>
       </div>
       
        {/* Sections */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-8 mt-16 md:mt-24">
        {/* Contact Us */}
        <div className="sm:w-[45%] md:w-auto">
          <h4 className="mb-4 text-lg font-semibold text-white">Contact Us</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <p>
                <strong className="text-white">Phone:</strong>{" "}
                <a
                  href="https://wa.me/919555669802"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  +91 9555669802
                </a>
              </p>
            </li>
            <li>
              <p>
                <strong className="text-white">Email:</strong>{" "}
                <a
                  href="mailto:04priyanshuuuu@gmail.com"
                  className="hover:underline text-blue-400"
                >
                  04priyanshuuuu@gmail.com
                </a>
              </p>
            </li>
            <li>
              <p>
                <strong className="text-white">Address:</strong> Madan Mohan
                Malaviya University Of Technology, Gorakhpur, Uttar Pradesh
              </p>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div className="sm:w-[45%] md:w-auto">
          <h4 className="mb-4 text-lg font-semibold text-white">
            Connect With Us
          </h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a
                href="https://wa.me/919555669802"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://t.me/sticke_official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/sticke_official?utm_source=qr&igsh=MTliaWpsaXN4NjFxNA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/04Priyanshuuuu/Sticke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Sticke Info */}
        <div className="sm:w-[45%] md:w-auto">
          <h4 className="mb-4 text-lg font-semibold text-white">Sticke</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="/contactus" className="text-gray-400 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a
                href="/termsofuse"
                className="text-gray-400 hover:text-white"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="/privacypolicy"
                className="text-gray-400 hover:text-white"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/refundpolicy" className="text-gray-400 hover:text-white">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Account Section */}
        <div className="sm:w-[45%] md:w-auto">
          <h4 className="mb-4 text-lg font-semibold text-white">Account</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="/auth/signUp" className="text-gray-400 hover:text-white">
                Create Account
              </a>
            </li>
            <li>
              <a href="/auth/login" className="text-gray-400 hover:text-white">
                Log In
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs sm:text-sm border-t border-gray-700 pt-4 mt-8  text-gray-400">
        <p>&copy; 2026 Sticke. All rights reserved.</p>
        <p>
          Made with <span className="text-red-500">❤️</span> by Zero
        </p>
      </div>
    </footer>
  );
}

export default Footer;
