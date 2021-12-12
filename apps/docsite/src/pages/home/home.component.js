import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import Form from '../../form/form.component';
import { Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

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
        <Box component="section" sx={{ p: 5 }}>
          <Box>
            <Grid container>
              <Grid sx={{ p: 2 }} item xs={12} sm={6} md={6}>
                <Typography
                  sx={{ m: 2, textAlign: 'center' }}
                  component="h1"
                  variant="h4"
                  gutterBottom
                >
                  Try it
                </Typography>
                <Typography sx={{ textAlign: 'center' }}>
                  This registration form was generated using the FormBuilder
                  component.
                </Typography>
                <Typography sx={{ textAlign: 'center' }}>
                  You can have a look at the code used on Github
                </Typography>
              </Grid>
              <Grid sx={{ p: 2 }} item xs={12} sm={6} md={6}>
                <Form />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </main>
    </Layout>
  );
}

export default Home;
