import React from 'react';
import _ from 'lodash';
import {
  Box,
  Chip,
  Stack,
  Grow,
} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CakeIcon from '@mui/icons-material/Cake';


const FormResults = ({ results }) => {
  return (
    <Box>
      <Stack alignItems="center" justifyContent="center" flexDirection="row" flexWrap="wrap">
        {_.map(results, (value, key, index) => value ? (
          <Grow key={key} in timeout={500}>
            <Chip
              sx={{ m: 0.5, p: 0.5 }}

              icon={<FeedBackIcons iconKey={key} />}
              label={key === 'password' ? '*******' : `${value}`}
              variant="outlined"
            />
          </Grow>
        ): null)}
      </Stack>
    </Box>
  );
};

function FeedBackIcons({ iconKey }) {
  switch(iconKey) {
    case 'email':
      return <EmailIcon />;
    case 'firstName':
    case 'lastName':
      return <FaceIcon />;
    case 'birthdate':
      return <CakeIcon />
    case 'password':
      return <VpnKeyIcon />;

    default: return <DoNotDisturbAltIcon />;
  }
}

export default FormResults;
