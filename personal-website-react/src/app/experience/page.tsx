'use client';

import { useMetaTags } from '@/hooks/useMetaTags';
import { useConfig } from '@/context/ConfigContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Timeline from '@/components/experience/Timeline';

export default function ExperiencePage() {
  useMetaTags('Experience');
  const { experience, loading } = useConfig();

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
      <main role="main" style={{ paddingTop: '3.0rem', marginBottom: '5%' }}>
        <div className="container text-center">
          <h1 className="display-4">Experience</h1>
          <p className="lead">
            My professional journey and educational background.
          </p>
        </div>

        {experience && <Timeline experienceConfig={experience} />}
      </main>
      <Footer />
    </>
  );
}
