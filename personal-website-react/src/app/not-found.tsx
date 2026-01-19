'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main role="main" style={{ paddingTop: '3.0rem', marginBottom: '5%' }}>
        <div className="container text-center" style={{ marginTop: '5%' }}>
          <h1 className="display-1">404</h1>
          <h2 className="display-4">Page Not Found</h2>
          <p className="lead">
            Sorry, the page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/" className="btn btn-primary btn-lg mt-3">
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
