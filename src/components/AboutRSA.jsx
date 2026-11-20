export default function AboutRSA() {
  return (
    <section
          id="about-rsa"
          className="mb-14 scroll-mt-8 rounded-3xl border border-[#668A4E]/30 bg-white/75 p-6 shadow-sm sm:p-8"
        >
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#668A4E]">
              Understanding the technology
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              What is RSA cryptography?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#5A3E2B]/70 sm:text-base">
              RSA is a public-key cryptographic system that uses two
              mathematically connected keys. This project uses RSA-PSS with
              SHA-256 to create and verify digital signatures. A signature helps
              a recipient check who signed a message and whether it has changed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[#E5EDD9] p-5">
              <h3 className="font-bold text-[#405A30]">Public key</h3>
              <p className="mt-2 text-sm leading-6 text-[#5A3E2B]/75">
                This key can be shared. In this project, it is used to verify a
                digital signature created by the matching private key.
              </p>
            </div>
            <div className="rounded-2xl bg-[#F6E3C6] p-5">
              <h3 className="font-bold text-[#9A5D13]">Private key</h3>
              <p className="mt-2 text-sm leading-6 text-[#5A3E2B]/75">
                This key must be kept secret. It creates the digital signature
                and is not displayed or exported by this application.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-[#5A3E2B]/10 bg-[#EEE7D9] p-5">
            <h3 className="font-bold">How the three steps work</h3>
            <ol className="mt-3 grid gap-3 text-sm leading-6 text-[#5A3E2B]/75 md:grid-cols-3">
              <li>
                <span className="font-bold text-[#668A4E]">01 · Generate</span>
                <br />
                Create a matching public and private RSA key pair.
              </li>
              <li>
                <span className="font-bold text-[#D5851F]">02 · Sign</span>
                <br />
                Use the private key to sign your message.
              </li>
              <li>
                <span className="font-bold text-[#5A3E2B]">03 · Verify</span>
                <br />
                Use the public key to check the message and signature.
              </li>
            </ol>
          </div>
          <p className="mt-4 text-xs leading-5 text-[#5A3E2B]/55">
            Note: Keys are kept in the current page session. Refreshing the page
            clears them, so generate a new key pair before signing or verifying
            again.
          </p>
        </section>
  );
}
