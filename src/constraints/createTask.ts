import validator from "validate.js";

export const createTaskFromConstraints = {
  title: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 100,
      message: "must be less than 100 characters",
    },
  },
  description: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 500,
      message: "must be less than 500 characters",
    },
  },
  assignedTo: {
    presence: { allowEmpty: false, message: "is required" },
    format: {
      pattern:
        /^(Unassigned|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))$/,
      message: 'must be "Unassigned" or a valid email address',
    },
  },
};
