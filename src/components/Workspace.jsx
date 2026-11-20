const operations = [
  {
    number: "01",
    icon: "⌘",
    title: "RSA Key Generation",
    description: "Create your 2048-bit RSA public and private key pair.",
    action: "Generate keys",
    color: "sage",
  },
  {
    number: "02",
    icon: "✎",
    title: "Digital Signing",
    description: "Sign your message securely using your private key.",
    action: "Sign a message",
    color: "amber",
  },
  {
    number: "03",
    icon: "✓",
    title: "Signature Verification",
    description: "Verify authenticity and detect any message modification.",
    action: "Verify signature",
    color: "brown",
  },
];

export default function Workspace({
  keyPair,
  publicKeyText,
  showKeys,
  keyStatus,
  isGenerating,
  message,
  signature,
  isSigning,
  signStatus,
  expandedSections,
  copyStatus,
  publicKeyCopyStatus,
  verifyMessage,
  verifySignature,
  verificationStatus,
  isVerifying,
  verifyPublicKey,
  setExpandedSections,
  setMessage,
  setSignature,
  setSignStatus,
  setCopyStatus,
  setPublicKeyCopyStatus,
  setVerifyMessage,
  setVerifySignature,
  setVerificationStatus,
  setVerifyPublicKey,
  generateRSAKeys,
  signMessage,
  verifyDigitalSignature
}) {
  return (
    <div id="workspace" className="scroll-mt-8">
          {/* Workspace heading */}
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#668A4E]">
                Your workspace
              </p>
              <h2 className="mt-2 text-2xl font-bold">Cryptographic tools</h2>
            </div>

            <span className="hidden text-sm text-[#5A3E2B]/50 sm:block">
              03 available operations
            </span>
          </div>

          {/* Expandable Cryptographic Sections */}
          <div className="space-y-5">
            {operations.map((item) => (
              <section
                key={item.number}
                className="overflow-hidden rounded-2xl border border-[#5A3E2B]/10 bg-white/90 shadow-sm transition-all duration-300"
              >
                {/* Section Header */}
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm ${item.number === "01" ? "bg-[#DCE8D2] text-[#405A30]" : item.number === "02" ? "bg-[#F6E3C6] text-[#9A5D13]" : "bg-[#E5D8CF] text-[#5A3E2B]"}`}
                  >
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#668A4E]">
                        {item.number}
                      </span>

                      <h3 className="text-lg font-bold text-[#5A3E2B]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#5A3E2B]/65">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={async () => {
                      const isCurrentlyOpen = expandedSections.includes(
                        item.number,
                      );

                      if (isCurrentlyOpen) {
                        setExpandedSections((current) =>
                          current.filter((section) => section !== item.number),
                        );
                        return;
                      }

                      setExpandedSections((current) => [
                        ...current,
                        item.number,
                      ]);

                      if (item.number === "01" && !keyPair) {
                        await generateRSAKeys();
                      }
                    }}
                    disabled={item.number === "01" && isGenerating}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#5A3E2B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#496A36] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {item.number === "01" && isGenerating
                      ? "Generating..."
                      : expandedSections.includes(item.number)
                        ? "Close Workspace ↑"
                        : item.number === "01"
                          ? keyPair
                            ? "View Generated Keys →"
                            : "Generate RSA Keys →"
                          : "Open Workspace →"}
                  </button>
                </div>

                {expandedSections.includes(item.number) && (
                  <div className="border-t border-[#5A3E2B]/10 bg-white/90 p-6 sm:p-8">
                    {item.number === "01" && (
                      <>
                        {isGenerating && (
                          <p className="mb-5 text-sm font-medium text-[#B97319]">
                            Generating RSA keys...
                          </p>
                        )}

                        {showKeys && keyPair && (
                          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                            {/* Left: Status and Private Key */}
                            <div className="flex flex-col justify-center gap-6">
                              <div>
                                <div className="flex flex-wrap items-center gap-3">
                                  <h3 className="text-xl font-bold text-[#5A3E2B]">
                                    RSA Keys Generated
                                  </h3>

                                  <span className="rounded-full bg-[#DCE8D2] px-3 py-1 text-xs font-semibold text-[#405A30]">
                                    Success
                                  </span>
                                </div>

                                <p className="mt-3 text-sm text-[#5A3E2B]/65">
                                  {keyStatus}
                                </p>
                              </div>

                              <div className="space-y-3">
                                <div className="rounded-xl bg-[#E5EDD9] p-5">
                                  <h3 className="font-bold text-[#405A30]">
                                    🔐 Private Key Protected
                                  </h3>

                                  <p className="mt-3 text-sm leading-7 text-[#5A3E2B]/70">
                                    Your private key is non-extractable and
                                    remains in browser memory. It is never
                                    displayed or exported.
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={async () => {
                                    try {
                                      await navigator.clipboard.writeText(
                                        publicKeyText,
                                      );
                                      setPublicKeyCopyStatus(
                                        "Public key copied successfully!",
                                      );
                                    } catch (error) {
                                      setPublicKeyCopyStatus(
                                        "Unable to copy. Please select and copy manually.",
                                      );
                                    }
                                  }}
                                  className="w-full rounded-xl bg-[#668A4E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#496A36]"
                                >
                                  Copy Public Key →
                                </button>

                                {publicKeyCopyStatus && (
                                  <p className="text-xs font-medium text-[#405A30]">
                                    {publicKeyCopyStatus}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Right: Public Key */}
                            <div className="min-w-0">
                              <div className="mb-3 flex items-center justify-between">
                                <h3 className="font-bold text-[#5A3E2B]">
                                  Public Key
                                </h3>

                                <span className="text-xs text-[#668A4E]">
                                  RSA · 2048-bit
                                </span>
                              </div>

                              <pre className="max-h-[320px] min-h-[240px] overflow-auto whitespace-pre rounded-xl border border-[#5A3E2B]/10 bg-[#EAE2D3] p-5 font-mono text-xs leading-7 text-[#5A3E2B]">
                                {publicKeyText}
                              </pre>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {item.number === "02" && (
                      <div className="space-y-6">
                        {!keyPair ? (
                          <div className="rounded-xl bg-[#F6E3C6] p-5">
                            <p className="font-semibold text-[#5A3E2B]">
                              RSA keys required
                            </p>
                            <p className="mt-2 text-sm text-[#5A3E2B]/70">
                              Please generate your RSA key pair in Section 01
                              before signing a message.
                            </p>
                          </div>
                        ) : (
                          <>
                            {/* Message Input */}
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-[#5A3E2B]">
                                Enter your message
                              </label>

                              <textarea
                                value={message}
                                onChange={(e) => {
                                  setMessage(e.target.value);
                                  setSignature("");
                                  setSignStatus("");
                                  setCopyStatus("");
                                }}
                                placeholder="Type your message here..."
                                rows={4}
                                className="w-full resize-y rounded-xl border border-[#5A3E2B]/15 bg-[#F1EBDD] p-4 text-sm text-[#5A3E2B] outline-none transition focus:border-[#D5851F] focus:ring-2 focus:ring-[#D5851F]/20"
                              />
                            </div>

                            {/* Sign Button */}
                            <button
                              onClick={signMessage}
                              disabled={isSigning || !message.trim()}
                              className="rounded-xl bg-[#D5851F] px-7 py-3 font-semibold text-white transition hover:bg-[#B97319] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isSigning ? "Signing..." : "Sign Message →"}
                            </button>

                            {/* Status */}
                            {signStatus && (
                              <p
                                className={`text-sm font-medium ${
                                  signature
                                    ? "text-[#718E59]"
                                    : "text-[#B97319]"
                                }`}
                              >
                                {signStatus}
                              </p>
                            )}

                            {/* Generated Signature */}
                            {signature && (
                              <div className="rounded-xl border border-[#668A4E]/35 bg-[#F1EBDD] p-5">
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                  <h3 className="font-bold text-[#5A3E2B]">
                                    Digital Signature
                                  </h3>

                                  <span className="rounded-full bg-[#DCE8D2] px-3 py-1 text-xs font-semibold text-[#405A30]">
                                    Generated
                                  </span>
                                </div>

                                <pre className="max-h-52 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-[#EAE2D3] p-4 font-mono text-xs leading-6 text-[#5A3E2B]">
                                  {signature}
                                </pre>

                                <button
                                  onClick={async () => {
                                    try {
                                      await navigator.clipboard.writeText(
                                        signature,
                                      );
                                      setCopyStatus(
                                        "Signature copied successfully!",
                                      );
                                    } catch (error) {
                                      setCopyStatus(
                                        "Unable to copy. Please select and copy manually.",
                                      );
                                    }
                                  }}
                                  className="mt-4 rounded-lg bg-[#5A3E2B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#496A36]"
                                >
                                  Copy Signature
                                </button>

                                {copyStatus && (
                                  <p className="mt-2 text-xs text-[#718E59]">
                                    {copyStatus}
                                  </p>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {item.number === "03" && (
                      <div className="space-y-6">
                        {/* Public Key Import */}
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-[#5A3E2B]">
                            Sender's Public Key (PEM)
                          </label>

                          <textarea
                            value={verifyPublicKey}
                            onChange={(e) => {
                              setVerifyPublicKey(e.target.value);
                              setVerificationStatus("");
                            }}
                            rows={5}
                            placeholder="Paste the sender's public key here...&#10;-----BEGIN PUBLIC KEY-----"
                            className="w-full resize-y rounded-xl border border-[#5A3E2B]/15 bg-[#F1EBDD] p-4 font-mono text-xs leading-6 text-[#5A3E2B] outline-none focus:border-[#668A4E] focus:ring-2 focus:ring-[#668A4E]/25"
                          />

                          <p className="mt-2 text-xs text-[#5A3E2B]/60">
                            Paste the public key received from the sender. Leave
                            empty to use the locally generated public key.
                          </p>
                        </div>

                        {/* Original Message */}
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-[#5A3E2B]">
                            Original Message
                          </label>

                          <textarea
                            value={verifyMessage}
                            onChange={(e) => {
                              setVerifyMessage(e.target.value);
                              setVerificationStatus("");
                            }}
                            rows={3}
                            placeholder="Enter the original signed message..."
                            className="w-full rounded-xl border border-[#5A3E2B]/15 bg-[#F1EBDD] p-4 text-sm outline-none focus:border-[#668A4E] focus:ring-2 focus:ring-[#668A4E]/25"
                          />
                        </div>

                        {/* Digital Signature */}
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-[#5A3E2B]">
                            Digital Signature (Base64)
                          </label>

                          <textarea
                            value={verifySignature}
                            onChange={(e) => {
                              setVerifySignature(e.target.value);
                              setVerificationStatus("");
                            }}
                            rows={5}
                            placeholder="Paste the digital signature here..."
                            className="w-full rounded-xl border border-[#5A3E2B]/15 bg-[#F1EBDD] p-4 font-mono text-xs leading-6 outline-none focus:border-[#668A4E] focus:ring-2 focus:ring-[#668A4E]/25"
                          />
                        </div>

                        {/* Load Generated Data */}
                        {keyPair && signature && (
                          <div className="flex flex-col gap-3 rounded-xl border border-[#668A4E]/35 bg-[#E5EDD9] p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-bold text-[#405A30]">
                                Already signed a message?
                              </p>
                              <p className="mt-1 text-xs leading-5 text-[#5A3E2B]/65">
                                Fill the verification fields using your
                                generated data.
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setVerifyPublicKey("");
                                setVerifyMessage(message);
                                setVerifySignature(signature);
                                setVerificationStatus("");
                              }}
                              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#668A4E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#496A36]"
                            >
                              Load Generated Data
                            </button>
                          </div>
                        )}

                        {/* Verify Button */}
                        <button
                          onClick={verifyDigitalSignature}
                          disabled={
                            isVerifying ||
                            !verifyMessage.trim() ||
                            !verifySignature.trim()
                          }
                          className="rounded-xl bg-[#5A3E2B] px-7 py-3 font-semibold text-white transition hover:bg-[#496A36] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isVerifying ? "Verifying..." : "Verify Signature →"}
                        </button>

                        {/* Verification Result */}
                        {verificationStatus && (
                          <div
                            className={`rounded-xl border p-5 ${
                              verificationStatus.startsWith(
                                "Signature is valid!",
                              )
                                ? "border-[#668A4E]/40 bg-[#E5EDD9]"
                                : verificationStatus ===
                                      "Verifying signature..." ||
                                    verificationStatus ===
                                      "Importing public key..."
                                  ? "border-[#D5851F]/30 bg-[#F6E3C6]"
                                  : "border-red-200 bg-red-50"
                            }`}
                          >
                            <h3 className="font-bold text-[#5A3E2B]">
                              Verification Result
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#5A3E2B]/80">
                              {verificationStatus}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
  );
}
