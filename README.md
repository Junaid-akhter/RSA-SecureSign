# RSA SecureSign

A React-based educational digital-signature application demonstrating RSA-PSS digital signing and verification with the browser Web Crypto API.

## Features
- Generate a 2048-bit RSA-PSS key pair using SHA-256.
- Keep the private key non-extractable in browser memory.
- Sign text messages with the private key.
- Verify signatures using either an imported PEM public key or the locally generated public key.
- Detect modified messages and invalid signatures.
- Copy the public key and generated signature.

## Technology stack
- React
- Vite
- Tailwind CSS v4
- JavaScript Web Crypto API

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

## Project structure
```text
src/
  components/
    Navbar.jsx
    Hero.jsx
    AboutRSA.jsx
    Workspace.jsx
    Footer.jsx
  hooks/
    useRSA.js
  App.jsx
  main.jsx
  index.css
```

## Important security notes
This is an educational demonstration, not a production identity or certificate-management system. A valid signature proves that the signature matches the supplied public key and message; it does not by itself prove the real-world identity of the key owner. Public keys must be authenticated through a trusted channel. Keys are held in browser memory and are lost on refresh.
