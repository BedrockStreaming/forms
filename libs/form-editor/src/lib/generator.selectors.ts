import { GeneratorState } from './generator.reducer';

export const getFields = ({ generator }: { generator: GeneratorState }) =>
  generator.schema.fields;

export const getSchema = ({ generator }: { generator: GeneratorState }) =>
  generator.schema;

export const getDictionary = ({ generator }: { generator: GeneratorState }) =>
  generator.dictionary;

export const getExtraValidationList = ({
  generator
}: {
  generator: GeneratorState;
}) => generator.extraValidationList;
