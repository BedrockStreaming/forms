import { useState } from 'react';
import { Dictionary, ExtraValidation } from '@bedrockstreaming/form-builder';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { List, Paper } from '@mui/material';

import { getSchema } from '../../generator.selectors';
import { Line } from './line.component';
import { isClickableItem } from './schema.utils';
import { UpdateModal } from './update/updateModal.component';

export const SchemaVisualizer = ({
  dictionary,
  extraValidation,
}: {
  dictionary: Dictionary;
  extraValidation: ExtraValidation;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [lineText, setLineText] = useState('');
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setLineText('');
  };
  const [buttonLineIndex, setButtonLineIndex] = useState<number | null>(null);
  const schema = useSelector(getSchema);
  const splitSchema = JSON.stringify(schema, null, 2).split('\n');

  return (
    <Paper sx={{ p: 1 }}>
      <List>
        {splitSchema.map((text, index) => (
          <Line
            key={_.uniqueId()}
            text={text}
            setButtonLineIndex={() => setButtonLineIndex(index + 1)}
            buttonLineIndex={buttonLineIndex}
            lineIndex={index + 1}
            isClickable={isClickableItem({ schema, text })}
            setLineText={setLineText}
            onClick={handleOpenModal}
          />
        ))}
      </List>
      <UpdateModal
        open={openModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        text={lineText}
        storedSchema={schema}
        dictionary={dictionary}
        extraValidation={extraValidation}
      />
    </Paper>
  );
};
