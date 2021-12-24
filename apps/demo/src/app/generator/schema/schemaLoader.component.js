import { useState } from 'react';
import { Paper, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addSchema } from '../generator.actions';

export const SchemaLoader = () => {
  const [schema, setSchema] = useState('');
  const dispatch = useDispatch();
  const onChange = (e) => setSchema(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addSchema(schema));
    setSchema('');
  };

  return (
    <Paper sx={{ p: 1 }}>
      <form onSubmit={onSubmit}>
        <TextField multiline onChange={onChange} value={schema} />
        <Button sx={{ m: 2 }} variant="contained" type="submit">
          Upload schema
        </Button>
      </form>
    </Paper>
  );
};
