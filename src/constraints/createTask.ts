export const createTaskFromConstraints = {
    title: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 100,
        message: 'must be less than 100 characters'
      }
    },
    description: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 500,
        message: 'must be less than 500 characters'
      }
    },
    assignedTo: {
      presence: { allowEmpty: false, message: 'is required' },
      email: {
        message: 'must be a valid email address'
      }
    }
  };