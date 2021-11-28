export const config = {
  formIds: {
    register: 'register'
  },
  schemas: {
    register: {
      fields: {
        birthdate: {
          id: 'birthdate',
          meta: {
            errorMessage: 'Birth date invalid',
            label: 'Birth date',
            name: 'birthdate'
          },
          title: 'birthdate',
          type: 'date',
          validation: {
            checkDateFormat: {
              key: 'checkDateFormat',
              message: 'Date format must be DD/MM/YYYY'
            },
            checkMinAge: {
              key: 'checkMinAge',
              message: 'Minimum age'
            },
            required: {
              key: 'required',
              message: 'Required field',
              value: true
            }
          }
        },
        email: {
          id: 'email',
          meta: {
            errorMessage: 'Invalid Email',
            label: 'Email',
            name: 'email'
          },
          title: 'Email',
          type: 'text',
          validation: {
            checkPattern: {
              key: 'checkPattern',
              message: 'Email format',
              value:
                '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
            },
            required: {
              key: 'required',
              message: 'Required field',
              value: true
            }
          }
        },
        firstName: {
          id: 'firstName',
          meta: {
            errorMessage: 'Invalid firstname',
            label: 'Firstname',
            name: 'firstName'
          },
          title: 'firstName',
          type: 'text',
          validation: {
            checkPattern: {
              key: 'checkPattern',
              message: 'Firstname format',
              value: "^[a-zA-ZÀ-ȳ ,.'-]+$"
            },
            required: {
              key: 'required',
              message: 'forms.required.error',
              value: true
            }
          }
        },
        lastName: {
          id: 'lastName',
          meta: {
            errorMessage: 'Invaid lastname',
            label: 'Lastname',
            name: 'lastName'
          },
          title: 'lastName',
          type: 'text',
          validation: {
            maxLength: {
              key: 'checkMaxLength',
              message: 'Maximum input length',
              value: 20
            },
            required: {
              key: 'required',
              message: 'Required field',
              value: true
            }
          }
        },
        password: {
          id: 'password',
          meta: {
            errorMessage: 'Invalid Password',
            label: 'Password',
            name: 'password'
          },
          title: 'password',
          type: 'password',
          validation: {
            checkForLower: {
              key: 'checkForLower',
              message: 'Lowercase expected'
            },
            checkForNumber: {
              key: 'checkForNumber',
              message: 'Number expected'
            },
            checkForUpper: {
              key: 'checkForUpper',
              message: 'Uppercase expected'
            },
            checkMinLength: {
              key: 'checkMinLength',
              message: 'Minimum chars expected',
              value: 8
            },
            required: {
              key: 'required',
              message: 'Required field',
              value: true
            }
          }
        }
      },
      steps: {
        'register-step-0': {
          fieldsById: ['email'],
          id: 'register-step-0',
          meta: {
            subtitle: 'Email',
            title: 'Email'
          },
          submit: {
            label: 'Next'
          }
        },
        'register-step-1': {
          fieldsById: ['password'],
          id: 'register-step-1',
          meta: {
            subtitle: 'Password',
            title: 'Password'
          },
          submit: {
            label: 'Next'
          }
        },
        'register-step-2': {
          fieldsById: ['firstName', 'lastName'],
          id: 'register-step-2',
          meta: {
            subtitle: 'First name and Last name',
            title: 'First name and Last name'
          },
          submit: {
            label: 'Next'
          }
        },
        'register-step-3': {
          fieldsById: ['birthdate'],
          id: 'register-step-3',
          meta: {
            subtitle: 'Birthdate',
            title: 'Birthdate'
          },
          submit: {
            label: 'Submit'
          }
        }
      },
      stepsById: [
        'register-step-0',
        'register-step-1',
        'register-step-2',
        'register-step-3'
      ]
    },
    single_step_register: {
      fields: {
        birthdate: {
          id: 'birthdate',
          meta: {
            errorMessage: 'account.invalidBirthdate',
            label: 'account.birthDay',
            name: 'birthdate'
          },
          title: 'birthdate',
          type: 'date',
          validation: {
            checkDateFormat: {
              key: 'checkDateFormat',
              message: 'onboarding.rules.birthdateFormat'
            },
            checkMinAge: {
              key: 'checkMinAge',
              message: 'onboarding.rules.birthdateMinAge'
            },
            required: {
              key: 'required',
              message: 'forms.required.error',
              value: true
            }
          }
        },
        email: {
          id: 'email',
          meta: {
            errorMessage: 'account.invalidEmail',
            label: 'account.email',
            name: 'email'
          },
          title: 'Email',
          type: 'text',
          validation: {
            checkPattern: {
              key: 'checkPattern',
              message: 'forms.pattern.error',
              value:
                '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
            },
            required: {
              key: 'required',
              message: 'forms.required.error',
              value: true
            }
          }
        },
        firstName: {
          id: 'firstName',
          meta: {
            errorMessage: 'account.invalidFirstName',
            label: 'account.firstName',
            name: 'firstName'
          },
          title: 'firstName',
          type: 'text',
          validation: {
            checkPattern: {
              key: 'checkPattern',
              message: 'forms.pattern.error',
              value: "^[a-zA-ZÀ-ȳ ,.'-]+$"
            },
            required: {
              key: 'required',
              message: 'forms.required.error',
              value: true
            }
          }
        },
        lastName: {
          id: 'lastName',
          meta: {
            errorMessage: 'account.invalidLastName',
            label: 'account.lastName',
            name: 'lastName'
          },
          title: 'lastName',
          type: 'text',
          validation: {
            maxLength: {
              key: 'checkMaxLength',
              message: 'forms.maxLength.error',
              value: 20
            },
            required: {
              key: 'required',
              message: 'forms.required.error',
              value: true
            }
          }
        },
        password: {
          id: 'password',
          meta: {
            errorMessage: 'account.invalidPassword',
            label: 'global.password',
            name: 'password'
          },
          title: 'password',
          type: 'password',
          validation: {
            checkForLower: {
              key: 'checkForLower',
              message: 'onboarding.rules.lowercase'
            },
            checkForNumber: {
              key: 'checkForNumber',
              message: 'onboarding.rules.number'
            },
            checkForUpper: {
              key: 'checkForUpper',
              message: 'onboarding.rules.uppercase'
            },
            checkMinLength: {
              key: 'checkMinLength',
              message: 'onboarding.rules.charLimit',
              value: 8
            },
            required: {
              key: 'required',
              message: 'forms.required.error',
              value: true
            }
          }
        }
      },
      steps: {
        'single-step-register-step-0': {
          fieldsById: [
            'firstName',
            'lastName',
            'email',
            'birthdate',
            'password'
          ],
          id: 'single-step-register-step-0',
          meta: {
            subtitle: '(used for testing)',
            title: 'One step registration form'
          },
          submit: {
            label: 'components.register'
          }
        }
      },
      stepsById: ['single-step-register-step-0']
    }
  }
};
