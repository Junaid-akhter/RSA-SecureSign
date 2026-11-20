export default function Footer() {
  return (
    <>
      <section className="mt-10 flex flex-col justify-between gap-4 rounded-2xl border border-[#668A4E]/30 bg-[#E5EDD9] p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-bold">Security through mathematics.</h3>
          <p className="mt-1 text-sm text-[#5A3E2B]/65">
            Powered by the browser's Web Crypto API.
          </p>
        </div>

        <span className="text-xs font-semibold tracking-wider text-[#405A30]">
          RSA-PSS · SHA-256
        </span>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#5A3E2B]/10 py-7 text-center text-xs text-[#5A3E2B]/50">
        RSA SecureSign · Cyber Security Project
      </footer>
    </>
  );
}
