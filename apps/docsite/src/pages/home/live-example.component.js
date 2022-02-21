import React from 'react';
import Link from '@docusaurus/Link';
import { Grid, Button, Typography, Box } from '@mui/material';

import Form from '../../form/form.component';

const RefLink = React.forwardRef((props) => <Link {...props} />);

export default function LiveExample() {
  return (
    <Box component="section" sx={{ p: 5 }}>
      <Box>
        <Grid container>
          <Grid sx={{ p: 2, m: 'auto', textAlign: 'center' }} item xs={12} sm={6} md={6}>
            <Typography sx={{ m: 2 }} component="h1" variant="h4" gutterBottom>
              A live example
            </Typography>
            <Typography sx={{ m: 1 }}>This registration form was generated using the FormBuilder component.</Typography>
            <Typography sx={{ m: 1 }}>
              You can play with it here to see how a form behaves with our solution.
            </Typography>
            <Box sx={{ p: 2 }} display="flex" justifyContent="center">
              <Button
                sx={{ m: 1 }}
                color="primary"
                component={RefLink}
                variant="contained"
                to="https://github.com/BedrockStreaming/forms/blob/master/apps/docsite/src/form/form.component.jsx"
              >
                See code sample
              </Button>
              <Button
                sx={{ m: 1, color: 'white', borderColor: 'white' }}
                component={RefLink}
                variant="outlined"
                to="https://codesandbox.io/s/cranky-buck-pdxxd?file=/src/App.js"
              >
                Try it in CodeSandBox
              </Button>
            </Box>
          </Grid>
          <Grid sx={{ p: 2 }} item xs={12} sm={6} md={6}>
            <Form />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
