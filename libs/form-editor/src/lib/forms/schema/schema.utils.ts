import { Dictionary, ExtraValidation, FormSchema } from '@bedrockstreaming/form-builder';
import _ from 'lodash';
import { makeFieldSchema, makeStepSchema } from './updateConfig';

export const parseLine = (text: string) => {
  try {
    return JSON.parse(`{${text.trim().replace('{', '""')}}`.replace(',', ''));
  } catch (error) {
    return null;
  }
};

export const getElementType = ({
  text,
  schema,
  dictionary,
  extraValidation,
}: {
  text: string;
  schema: FormSchema;
  dictionary?: Dictionary;
  extraValidation?: ExtraValidation;
}): FormSchema | null => {
  const objectElement = parseLine(text);
  if (!objectElement) return null;

  const elementKey = Object.keys(objectElement)[0];

  if (_.get(schema, ['fields', elementKey]))
    return makeFieldSchema({
      extraValidation,
      dictionary,
      schema,
      field: _.get(schema, ['fields', elementKey]),
    });

  if (_.get(schema, ['steps', elementKey]))
    return makeStepSchema({
      schema,
      step: _.get(schema, ['steps', elementKey]),
    });

  return null;
};

export const isClickableItem = ({ schema, text }: { schema: FormSchema; text: string }) => {
  const elementType = getElementType({ text, schema });

  return !!elementType;
};
