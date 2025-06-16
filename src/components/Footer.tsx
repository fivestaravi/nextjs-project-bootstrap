"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-12 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-gray-400 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Migration Mirror. All rights reserved.
        </p>
        <p className="mt-2">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2B9CEF] transition"
          >
            GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://data-source-link"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2B9CEF] transition"
          >
            Data Sources
          </a>{" "}
          |{" "}
          <a
            href="mailto:contact@example.com"
            className="hover:text-[#2B9CEF] transition"
          >
            Contact
          </a>
        </p>
      </div>
    </footer>
  );
}
