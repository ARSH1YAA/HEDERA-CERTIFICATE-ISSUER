# 🎓 Hedera Certificate Issuer

**“Mint your proof. Own your progress.”**  
A decentralized certificate issuer built on the Hedera blockchain. Allows users to mint verifiable on-chain tokens as certificates, attach proof, and download tamper-proof PDFs with QR verification.

---

## 🚀 Project Summary

Hedera Certificate Issuer is a web application that solves a very real problem — the failure of centralized or limited certificate issuance systems. Originally inspired by a bug in Hedera’s own course certification process, this tool allows any individual to:

- Mint a **Hedera Token Service (HTS)** token as a certificate
- Optionally attach metadata (file hash or IPFS link)
- Generate a PDF certificate with QR code + token metadata
- Verify the certificate using **HashScan** or the built-in `/verify` tool

This is a plug-and-play solution for:
- Students who want proof of completion
- Hackathon organizers issuing on-chain awards
- DAOs verifying contributor skills
- Institutions needing decentralized cert infrastructure

---

## 🔧 Features

- ✅ Hedera HTS token minting
- ✅ Optional metadata support (file hash or IPFS CID)
- ✅ On-chain verification via Hedera Mirror Node
- ✅ PDF certificate generator (with QR code and token info)
- ✅ Live frontend UI for minting and verifying
- ✅ Google Drive / IPFS compatible file uploads

---

## 🛠️ Tech Stack

| Layer       | Tech Used            |
|-------------|----------------------|
| Blockchain  | Hedera Hashgraph SDK |
| Backend     | Node.js + Express    |
| Cert Engine | PDFKit, QRCode       |
| Storage     | (Optional) IPFS / Pinata |
| Frontend    | Vanilla HTML + JS    |
| Explorer    | HashScan + Mirror Node API |

---

## ⚙️ How It Works

1. User enters their Hedera testnet account ID  
2. Optionally uploads a screenshot or certificate proof  
3. App mints a HTS token and returns token ID + HashScan link  
4. Generates a QR + downloadable PDF  
5. Anyone can verify the token using token ID on `/verify` page

---

| Criterion         | Our Response |
|------------------|--------------|
| **Use of Hedera** | Uses HTS for minting, HashScan for verifying |
| **Innovation**    | Solves real cert minting issue with decentralized fallback |
| **Impact**        | Can be used by learners, DAOs, devs, orgs |
| **Technical**     | End-to-end PDF, QR, metadata, HTS integration |
| **UX**            | Simple, clean flow with instant feedback and links |

---

## 🔮 Roadmap

- ✅ IPFS file uploads for decentralized cert storage
- 🔄 Soulbound token option (non-transferable)
- 🔄 CSV-based bulk issuance
- 🔄 Organization dashboard for certificate management
- 🔄 NFT-based or visual certs with image previews

---

## 📦 Running Locally

### 🔑 Prerequisites
- Node.js
- Hedera testnet account
- `.env` file with your Hedera keys

### 🛠️ Installation
```bash
git clone https://github.com/yourusername/hedera-cert-issuer
cd hedera-cert-issuer
npm install


node index.js
Visit http://localhost:3000
```
Create a .env file in the root with:
```
ACCOUNT_ID=0.0.xxxxxx
PRIVATE_KEY=302e020100300506032b...
WEB3STORAGE_TOKEN=your_web3_storage_token_here

```
🚀 Start Server:
```
node index.js
```
🪙 License
MIT License — use freely, fork openly, and contribute back if you build on it!
