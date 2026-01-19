'use client';

import { useMetaTags } from '@/hooks/useMetaTags';
import { useConfig } from '@/context/ConfigContext';
import { useRSSFeed } from '@/hooks/useRSSFeed';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileSection from '@/components/home/ProfileSection';
import RSSCard from '@/components/home/RSSCard';

export default function HomePage() {
  useMetaTags('Home');
  const { config, loading: configLoading } = useConfig();
  const { data: rssData, loading: rssLoading } = useRSSFeed(config?.rss_link);

  if (configLoading) {
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
      <main role="main" style={{ padding: '3.0rem 0rem', marginBottom: '5%' }}>
        <ProfileSection />

        {config?.rss_link && (
          <div className="container">
            {rssLoading ? (
              <div className="text-center" style={{ marginTop: '2.5%' }}>
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : rssData && rssData.items.length > 0 ? (
              <div className="card-deck" id="card_deck">
                {rssData.items.slice(0, 3).map((item, index) => (
                  <RSSCard key={index} item={item} feed={rssData.feed} />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
