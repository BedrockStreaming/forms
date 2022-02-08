import * as React from 'react';
import {
  FormBuilder,
  FormSchema,
  Dictionary,
  ExtraValidation
} from '@bedrockstreaming/form-builder';
import { Typography, Modal, Box } from '@mui/material';

import { updateSchema } from '../../../generator.actions';
import { getElementType } from '../schema.utils';
import { useSubmit } from '../../../useSubmit.hook';

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

const formId = 'update-form';
const defaultSchema = { fields: {}, steps: {}, stepsById: [] };

export function UpdateModal({
  open,
  handleClose,
  text,
  storedSchema,
  dictionary,
  extraValidation
}: {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  text: string;
  storedSchema: FormSchema;
  dictionary: Dictionary;
  extraValidation: ExtraValidation;
}) {
  const schema = getElementType({
    text,
    schema: storedSchema,
    dictionary,
    extraValidation
  });

  const [onSubmit] = useSubmit(formId, updateSchema);

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
              formId={formId}
              onSubmit={onSubmit}
              dictionary={dictionary}
              extraValidation={extraValidation}
              schema={
                getElementType({
                  text,
                  schema: storedSchema,
                  dictionary,
                  extraValidation
                }) || defaultSchema
              }
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
