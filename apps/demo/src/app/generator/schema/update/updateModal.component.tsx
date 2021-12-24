import * as React from 'react';
import { useSelector } from 'react-redux';
import { FormBuilder, FormSchema } from '@bedrockstreaming/form-builder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { dictionary } from '../../dictionary';
import { extraValidation } from '../../../extraValidation';
import { getElementType } from '../schema.utils';
import { getTargetFormId } from '../../generator.selectors';
import { useSubmit } from './useSubmit';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export function UpdateModal({
  open,
  handleOpen,
  handleClose,
  text,
  storedSchema
}: {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  text: string;
  storedSchema: FormSchema;
}) {
  const formId = useSelector(getTargetFormId);
  const schema = getElementType({
    text,
    schema: storedSchema,
    dictionary,
    extraValidation
  });

  const [onSubmit] = useSubmit(formId);

  if (!formId) return null;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Form Element
          </Typography>
          {schema && (
            <FormBuilder
              onSubmit={onSubmit}
              dictionary={dictionary}
              extraValidation={extraValidation}
              schema={
                getElementType({
                  text,
                  schema: storedSchema,
                  dictionary,
                  extraValidation
                }) || { fields: {}, steps: {}, stepsById: [] }
              }
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
