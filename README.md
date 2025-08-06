# Hedera Certificate Portal

A Next.js web application template for a certificate portal.

## Features

- Modern landing page built with Next.js and React
- Informational cards linking to documentation, learning resources, examples, and deployment
- Responsive layout with header, main content, and footer
- Placeholder for certificate upload functionality (`CertificateUpload` component)
- Custom styling using CSS modules

## Project Structure

- `frontend/pages/index.tsx`: Main landing page with UI and upload placeholder
- `frontend/components/CertificateUpload.tsx`: (Expected) certificate upload component
- `frontend/styles/Home.module.css`: CSS module for page styling

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Running the Frontend

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Notes

- The certificate upload feature is a placeholder and does not currently support actual file uploads or backend integration.
- No backend or blockchain functionality is implemented in the provided code.
- To add certificate upload and verification, you will need to implement backend APIs and connect them to the frontend.

## License

MIT
