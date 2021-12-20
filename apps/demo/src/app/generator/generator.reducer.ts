import { FormSchema } from '@bedrockstreaming/form-builder';
import { ADD_FIELD, ADD_STEP } from './generator.actions';

const DEFAULT_OBJECT = {};

export interface GeneratorState {
  formId: string;
  dictionary: string[];
  extraValidation: string[];
  schema: FormSchema;
}
export const initialState = {
  formId: '',
  dictionary: [],
  extraValidation: [],
  schema: {
    fields: {},
    steps: {},
    stepsById: []
  }
} as GeneratorState;

const arrayInsertAtPosition = (arr: any[], index: number, newItem: any) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index)
];

export const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ADD_FIELD: {
      const {
        schema: { steps, fields }
      } = state;
      const {
        positionInStep,
        stepId,
        fieldId: id,
        fieldType: type,
        fieldDefaultValue: defaultValue,
        fieldValidation: validation,
        fieldTitle: title
      } = action.payload;

      const fieldsById = arrayInsertAtPosition(
        steps[stepId].fieldsById,
        positionInStep,
        id
      );

      return {
        ...state,
        schema: {
          ...state.schema,
          fields: {
            ...fields,
            [id]: {
              id,
              type,
              title,
              name: title,
              defaultValue,
              validation,
              meta: DEFAULT_OBJECT
            }
          },
          steps: { ...steps, [stepId]: { ...steps[stepId], fieldsById } }
        }
      };
    }
    case ADD_STEP: {
      const {
        schema: { steps, stepsById }
      } = state;
      const { stepId, stepSubmitLabel, stepFieldsById, stepPosition } =
        action.payload;

      const newStepsById = arrayInsertAtPosition(
        stepsById,
        stepPosition,
        stepId
      );

      return {
        ...state,
        schema: {
          ...state.schema,
          steps: {
            ...steps,
            [stepId]: {
              id: stepId,
              fieldsById: stepFieldsById,
              submit: { label: stepSubmitLabel }
            }
          },
          stepsById: newStepsById
        }
      };
    }
    default:
      return state;
  }
};
