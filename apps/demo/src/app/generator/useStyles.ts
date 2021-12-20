import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    '& .validation-rule-ul': {
      display: 'flex',
      padding: 0,
      listStyle: 'none'
    },

    '& .validation-rule-ul li': {
      margin: '4px',
      fontSize: 'smaller'
    },

    '& .complete-li': {
      color: '#4ed569'
    },
    '& .incomplete-li,.idle-li': {
      color: '#da3b2b'
    }
  }
});
