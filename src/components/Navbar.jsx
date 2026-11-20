export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#5A3E2B]/10 bg-[#F6F3EC]/95 px-6 py-5 shadow-sm backdrop-blur-xl md:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#668A4E] text-lg font-bold text-white shadow-md">
            R
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight">RSA SecureSign</h2>
            <p className="text-[10px] tracking-widest text-[#668A4E]">
              DIGITAL SECURITY
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium sm:gap-4 sm:text-sm md:gap-6">
          <a
            href="#about-rsa"
            className="rounded-full px-3 py-2 text-[#5A3E2B]/75 transition-colors hover:text-[#718E59] sm:px-4"
          >
            About RSA
          </a>

          <a
            href="#workspace"
            className="rounded-full bg-[#DCE8D2] px-3 py-2 text-[#405A30] transition-all hover:bg-[#C9DDBB] sm:px-4"
          >
            Secure Workspace
          </a>
        </div>
      </nav>
  );
}
