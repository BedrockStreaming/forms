export const config = {
  formIds: {
    login: 'login',
  },
  schemas: {
    login: {
      fields: {
        email: {
          id: 'email',
          meta: {
            errorMessage: 'Invalid Email',
            label: 'Email',
            name: 'email',
          },
          type: 'text',
          validation: {
            checkPattern: {
              key: 'checkPattern',
              message: 'Email format',
              value:
                '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
            },
            required: {
              key: 'required',
              message: 'Required field',
              value: true,
            },
          },
        },
        password: {
          id: 'password',
          meta: {
            errorMessage: 'Invalid Password',
            label: 'Password',
            name: 'password',
          },
          type: 'password',
          validation: {
            checkForLower: {
              key: 'checkForLower',
              message: 'Lowercase expected',
            },
            checkForNumber: {
              key: 'checkForNumber',
              message: 'Number expected',
            },
            checkForUpper: {
              key: 'checkForUpper',
              message: 'Uppercase expected',
            },
            checkMinLength: {
              key: 'checkMinLength',
              message: 'Minimum chars expected',
              value: 8,
            },
            required: {
              key: 'required',
              message: 'Required field',
              value: true,
            },
          },
        },
      },
      formMeta: {
        shouldDisplayRequiredHint: true,
      },
      steps: {
        'login-step-0': {
          fieldsById: ['email'],
          id: 'login-step-0',
          submit: {
            label: 'Next',
          },
        },
        'login-step-1': {
          fieldsById: ['password'],
          id: 'login-step-1',
          submit: {
            label: 'Next',
          },
        },
      },
      stepsById: ['login-step-0', 'login-step-1'],
    },
  },
};
