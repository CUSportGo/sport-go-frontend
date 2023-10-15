const validatePassword = (_: any, value: string) => {
  if (!value) {
    return Promise.resolve();
  }
  // Check for at least 1 uppercase letter
  if (!/[A-Z]/.test(value)) {
    return Promise.reject("Password must contain at least 1 uppercase letter");
  }

  // Check for at least 1 lowercase letter
  if (!/[a-z]/.test(value)) {
    return Promise.reject("Password must contain at least 1 lowercase letter");
  }

  // Check for at least 1 number
  if (!/\d/.test(value)) {
    return Promise.reject("Password must contain at least 1 number");
  }

  // Check the length of the password
  if (value.length < 8) {
    return Promise.reject("Password must be at least 8 characters long");
  }

  return Promise.resolve();
};

export const commonUtils = {
  validatePassword,
};
