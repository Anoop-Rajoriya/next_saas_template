export type Errors = {
  emailAddress?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  code?: string;
  global?: string;
};

const parseClerkErrors = (err: any) => {
  const errors: Errors = {};

  if (!err || !err.errors || !Array.isArray(err.errors)) {
    errors.global = "Something went wrong. Please try again.";
    return errors;
  }

  err.errors.forEach((error: any) => {
    const code = error.code;
    const param = error.meta?.paramName;
    const shortMessage = error.message;
    const longMessage = error.longMessage;

    if (
      param === "identifier" ||
      param === "email_address" ||
      code === "form_identifier_not_found"
    ) {
      errors.emailAddress = shortMessage;
    } else if (param === "password" || code === "form_password_incorrect") {
      errors.password = shortMessage;
    } else {
      errors.global = longMessage || shortMessage;
    }

    if (code === "user_locked") {
      errors.global = longMessage;
    }
  });

  return errors;
};

export default parseClerkErrors;
