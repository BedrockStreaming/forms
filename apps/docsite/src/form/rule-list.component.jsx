import React from 'react';
import { COMPLETE_STATUS, DEFAULT_STATUS, INCOMPLETE_STATUS } from '@bedrockstreaming/form-validation-rule-list';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    margin: 0,
    padding: 0,
    textAlign: 'left',
    listStyle: 'none',
  },
  listItem: {
    margin: '4px',
    fontSize: 'smaller',
  },
  [DEFAULT_STATUS]: {
    color: '#2e2e2d',
  },
  [COMPLETE_STATUS]: {
    color: '#4ed569',
  },
  [INCOMPLETE_STATUS]: {
    color: '#da3b2b',
  },
});

export const RuleList = ({ items }) => {
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <li key={item.key} className={`${classes.listItem} ${classes[item.status]}`}>
          <span>{item.key}</span>
        </li>
      ))}
    </ul>
  );
};
