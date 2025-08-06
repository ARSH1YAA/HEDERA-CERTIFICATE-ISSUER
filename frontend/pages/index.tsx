import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import CertificateUpload from '../components/CertificateUpload';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hedera Certificate Portal</title>
        <meta name="description" content="Upload and verify certificates on-chain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logoRow}>
          <Image src="/vercel.svg" alt="Logo" width={72} height={16} />
          <span className={styles.headerTitle}>Hedera Certificate Portal</span>
        </div>
        <p className={styles.headerSubtitle}>
          Securely upload and verify certificates using Hedera Hashgraph.
        </p>
      </header>

      {/* Main Content Card */}
      <main className={styles.mainCard}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>

        {/* Divider and Certificate Upload */}
        <hr className={styles.divider} />
        <div className={styles.uploadSection}>
          <h2>Upload Certificate</h2>
          <CertificateUpload />
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}