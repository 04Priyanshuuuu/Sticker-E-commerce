function footer() {
  return (
    <footer className="bg-neutral-900 bg-cover bg-center bg-no-repeat h-[500px] text-gray-300 px-12 py-5 border-t border-gray-400">
      {/* Heading */}
      <h1 className="ml-20 text-2xl font-bold text-white">About Us</h1>
      <p className="ml-20 mt-6 text-gray-300 text-lg max-w-3xl">
        Welcome to Animeflix! Dive into the world of anime, and experience a
        rollercoaster of emotions.
      </p>

      {/* Sections */}
      <div className="flex justify-around flex-wrap mt-24">
        {/* Contact Us */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Contact Us</h4>
          <ul className="space-y-2">
            <li>
              <p>
                <strong className="text-white">Phone:</strong> +91 9555669802
              </p>
            </li>
            <li>
              <p>
                <strong className="text-white">Email:</strong>{" "}
                <a
                  href="business@gmail.com"
                  className="hover:underline text-blue-400"
                >
                  Business@gmail.com
                </a>
              </p>
            </li>
            <li>
              <p>
                <strong className="text-white">Address:</strong> Madan Mohan
                Malaviya University Of Technology,Gorakhpur,Uttar pradesh
              </p>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">
            Connect With Us
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                YouTube
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Animeflix Section */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Animeflix</h4>
          <ul className="space-y-2">
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
        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Account</h4>
          <ul className="space-y-2">
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
      <div className="text-center text-sm border-t border-gray-700 pt-4 mt-8 text-gray-400">
        <p>&copy; 2024 Animeflix. All rights reserved.</p>
        <p>
          Made with <span className="text-red-500">❤️</span> by Priyanshu
        </p>
      </div>
    </footer>
  );
}

export default footer;
