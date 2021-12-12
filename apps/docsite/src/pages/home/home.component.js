import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Button } from '@mui/material';
import LiveExample from './live-example.component';
import styles from './styles.module.css';

const RefLink = React.forwardRef((props, ref) => <Link {...props} />);

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title" style={{ color: '#1c1c1c' }}>
            {siteConfig.title}
          </h1>
          <p className="hero__subtitle" style={{ color: '#1c1c1c' }}>
            {siteConfig.tagline}
          </p>
          <div className={styles.buttons}>
            <Button
              color="secondary"
              component={RefLink}
              variant="contained"
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>
      <main>
        <LiveExample />
      </main>
    </Layout>
  );
}

export default Home;
