'use client';

import { useMetaTags } from '@/hooks/useMetaTags';
import { useConfig } from '@/context/ConfigContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import BioSection from '@/components/contact/BioSection';

export default function ContactPage() {
  useMetaTags('Contact');
  const { loading } = useConfig();

  if (loading) {
    return (
      <>
        <Header />
        <main role="main" style={{ paddingTop: '3.0rem', marginBottom: '5%' }}>
          <div className="container text-center" style={{ marginTop: '2.5%' }}>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main role="main" className="container" style={{ padding: '2rem 1rem' }}>
        <div className="container" style={{ padding: '2rem 1rem', marginTop: '5%', marginBottom: '12%' }}>
          <div className="row">
            <div className="col-md-6">
              <BioSection />
            </div>
            <div className="col-md-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
