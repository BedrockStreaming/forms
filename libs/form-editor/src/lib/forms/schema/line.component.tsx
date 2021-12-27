import React, { useState, useEffect } from 'react';
import { Button, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classnames from 'classnames';

const useStyles = makeStyles({
  line: {
    position: 'relative',
    height: '24px',
    padding: 0,
    '&.isClickable': {
      '&:hover': {
        background: 'yellow',
        cursor: 'pointer'
      }
    },
    '& .button-appearance': {
      display: 'block',
      position: 'absolute',
      top: '20px',
      left: '25px',
      zIndex: 1
    }
  },
  lineText: {
    whiteSpace: 'pre'
  }
});

export const Line = ({
  text,
  buttonLineIndex,
  lineIndex,
  setButtonLineIndex,
  isClickable,
  setLineText,
  onClick
}: {
  text: string;
  lineIndex: number;
  buttonLineIndex: number | null;
  setButtonLineIndex: () => void;
  isClickable: boolean;
  setLineText: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
}) => {
  const [hasButtons, setHasButtons] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (lineIndex !== buttonLineIndex && hasButtons) {
      setHasButtons(false);
    } else if (lineIndex === buttonLineIndex && !hasButtons) {
      setHasButtons(true);
    }
  }, [lineIndex, buttonLineIndex, hasButtons]);

  const handleLineClick = () => {
    if (isClickable) {
      setButtonLineIndex();
      setLineText(text);
    }
  };

  return (
    <ListItem
      button
      onClick={handleLineClick}
      className={classnames(classes.line, { isClickable })}
    >
      <ListItemText className={classes.lineText} primary={text} />
      {hasButtons && (
        <div className="button-appearance">
          <Button onClick={onClick} variant="contained" color="primary">
            Modify
          </Button>
        </div>
      )}
    </ListItem>
  );
};
