import { GeneratorState } from './generator.reducer';

export const getFields = ({ generator }: { generator: GeneratorState }) =>
  generator.schema.fields;

export const getSchema = ({ generator }: { generator: GeneratorState }) =>
  generator.schema;

export const getTargetFormId = ({ generator }: { generator: GeneratorState }) =>
  generator.formId;
