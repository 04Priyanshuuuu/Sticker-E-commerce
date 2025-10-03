function Footer() {
  return (
    <footer className="bg-black min-h-[500px] text-gray-300 px-6 sm:px-8 md:px-12 py-10 border-t border-gray-400">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-white text-center md:text-left">
          About Us
        </h1>
        <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-3xl text-center md:text-left">
          Welcome to StickE! Dive into the world of Stickers, and experience a
          rollercoaster of emotions.
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
                <strong className="text-white">Phone:</strong> +91 9555669802
              </p>
            </li>
            <li>
              <p>
                <strong className="text-white">Email:</strong>{" "}
                <a
                  href="stickebusiness@gmail.com"
                  className="hover:underline text-blue-400"
                >
                  Stickebusiness@gmail.com
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
              <a href="#" className="text-gray-400 hover:text-white">
                Whatsapp
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Telegram
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                 Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="sm:w-[45%] md:w-auto">
          <h4 className="mb-4 text-lg font-semibold text-white">Sticke</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Jobs
              </a>
            </li>
          </ul>
        </div>

        {/* Account Section */}
        <div className="sm:w-[45%] md:w-auto">
          <h4 className="mb-4 text-lg font-semibold text-white">Account</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Create Account
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Log In
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs sm:text-sm border-t border-gray-700 pt-4 mt-8 text-gray-400">
        <p>&copy; 2025 Sticke. All rights reserved.</p>
        <p>
          Made with <span className="text-red-500">❤️</span> by Zero
        </p>
      </div>
    </footer>
  );
}

export default Footer;
