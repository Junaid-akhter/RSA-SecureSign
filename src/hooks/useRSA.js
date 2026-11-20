import { useState } from "react";

export function useRSA() {
  const [keyPair, setKeyPair] = useState(null);
  const [publicKeyText, setPublicKeyText] = useState("");
  const [showKeys, setShowKeys] = useState(false);
  const [keyStatus, setKeyStatus] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [signStatus, setSignStatus] = useState("");
  const [expandedSections, setExpandedSections] = useState([]);
  const [copyStatus, setCopyStatus] = useState("");
  const [publicKeyCopyStatus, setPublicKeyCopyStatus] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifySignature, setVerifySignature] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyPublicKey, setVerifyPublicKey] = useState("");

  const generateRSAKeys = async () => {
    try {
      setIsGenerating(true);
      setKeyStatus("Generating RSA keys...");

      // Generate RSA public and private keys
      const generatedKeys = await window.crypto.subtle.generateKey(
        {
          name: "RSA-PSS",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        false,
        ["sign", "verify"],
      );

      // Export the public key
      const exportedKey = await window.crypto.subtle.exportKey(
        "spki",
        generatedKeys.publicKey,
      );

      // Convert public key into Base64
      const base64Key = btoa(
        String.fromCharCode(...new Uint8Array(exportedKey)),
      );

      // Format as PEM
      const pemKey = `-----BEGIN PUBLIC KEY-----\n${base64Key
        .match(/.{1,64}/g)
        .join("\n")}\n-----END PUBLIC KEY-----`;

      // Store keys and display public key
      setKeyPair(generatedKeys);
      setPublicKeyText(pemKey);
      setShowKeys(true);
      setKeyStatus("RSA key pair generated successfully!");
    } catch (error) {
      console.error(error);
      setKeyStatus("Key generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const signMessage = async () => {
    try {
      // Check whether RSA keys exist
      if (!keyPair) {
        setSignStatus("Please generate RSA keys first.");
        return;
      }

      // Check whether message is empty
      if (!message.trim()) {
        setSignStatus("Please enter a message.");
        return;
      }

      if (message.length > 10000) {
        setSignStatus(
          "Message is too long. Maximum length is 10,000 characters.",
        );
        return;
      }

      setIsSigning(true);
      setSignStatus("Signing your message...");

      // Convert message into bytes
      const encoder = new TextEncoder();
      const messageData = encoder.encode(message);

      // Create digital signature using private key
      const signatureBuffer = await window.crypto.subtle.sign(
        {
          name: "RSA-PSS",
          saltLength: 32,
        },
        keyPair.privateKey,
        messageData,
      );

      // Convert signature into Base64
      const signatureBase64 = btoa(
        String.fromCharCode(...new Uint8Array(signatureBuffer)),
      );

      // Save signature
      setSignature(signatureBase64);
      setSignStatus("Digital signature generated successfully!");
    } catch (error) {
      console.error(error);
      setSignStatus("Digital signing failed.");
    } finally {
      setIsSigning(false);
    }
  };

  const verifyDigitalSignature = async () => {
    try {
      if (!verifyMessage.trim() || !verifySignature.trim()) {
        setVerificationStatus("Please enter both the message and signature.");
        return;
      }

      if (verifyMessage.length > 10000) {
        setVerificationStatus(
          "Message is too long. Maximum length is 10,000 characters.",
        );
        return;
      }

      // Imported public key takes priority.
      let publicKeyToUse;

      if (verifyPublicKey.trim()) {
        setVerificationStatus("Importing public key...");

        const pem = verifyPublicKey.trim();
        const hasHeader = pem.includes("-----BEGIN PUBLIC KEY-----");
        const hasFooter = pem.includes("-----END PUBLIC KEY-----");

        if (hasHeader !== hasFooter) {
          setVerificationStatus(
            "Incomplete PEM public key. Check the BEGIN and END headers.",
          );
          return;
        }

        const base64Key = pem
          .replace(/-----BEGIN PUBLIC KEY-----/g, "")
          .replace(/-----END PUBLIC KEY-----/g, "")
          .replace(/\s/g, "");

        if (
          !/^[A-Za-z0-9+/]+={0,2}$/.test(base64Key) ||
          base64Key.length % 4 !== 0
        ) {
          setVerificationStatus("Invalid public key Base64 format.");
          return;
        }

        const binaryKey = atob(base64Key);
        const keyBytes = Uint8Array.from(binaryKey, (char) =>
          char.charCodeAt(0),
        );

        publicKeyToUse = await window.crypto.subtle.importKey(
          "spki",
          keyBytes,
          {
            name: "RSA-PSS",
            hash: "SHA-256",
          },
          false,
          ["verify"],
        );
      } else if (keyPair?.publicKey) {
        // Fall back to the locally generated public key.
        publicKeyToUse = keyPair.publicKey;
      } else {
        setVerificationStatus(
          "Please import a public key or generate RSA keys first.",
        );
        return;
      }

      const cleanedSignature = verifySignature.replace(/\s/g, "");

      if (!/^[A-Za-z0-9+/]+={0,2}$/.test(cleanedSignature)) {
        setVerificationStatus(
          "Invalid signature format. Please enter a valid Base64 signature.",
        );
        return;
      }

      const binarySignature = atob(cleanedSignature);
      const signatureBytes = Uint8Array.from(binarySignature, (char) =>
        char.charCodeAt(0),
      );

      if (signatureBytes.length !== 256) {
        setVerificationStatus(
          "Invalid signature length for a 2048-bit RSA key.",
        );
        return;
      }

      setIsVerifying(true);
      setVerificationStatus("Verifying signature...");

      const messageData = new TextEncoder().encode(verifyMessage);

      const isValid = await window.crypto.subtle.verify(
        {
          name: "RSA-PSS",
          saltLength: 32,
        },
        publicKeyToUse,
        signatureBytes,
        messageData,
      );

      setVerificationStatus(
        isValid
          ? `Signature is valid! The message matches the supplied public key. ${
              verifyPublicKey.trim()
                ? "Using imported public key."
                : "Using locally generated public key."
            }`
          : "Invalid signature! The message or signature may have been modified, or the wrong public key was supplied.",
      );
    } catch (error) {
      console.error(error);
      setVerificationStatus(
        "Verification failed. Please check the public key and signature format.",
      );
    } finally {
      setIsVerifying(false);
    }
  };


  return {
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
  };
}
