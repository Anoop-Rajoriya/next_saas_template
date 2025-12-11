type ParsedErrors = {
  fieldErrors: {
    emailAddress?: string;
    password?: string;
    code?: string;
  };
  formError?: string;
};

function parsedClerkErrors(err: any): ParsedErrors {
  const errors: ParsedErrors = { fieldErrors: {} };
  if (!err || !err.errors || !Array.isArray(err.errors)) {
    errors.formError = "Something went wrong. Please try again.";
    return errors;
  }

  err.errors.forEach((error: any) => {
    const code = error.code;
    const param = error.meta?.paramName;
    const shortMessage = error.message;
    const longMessage = error.longMessage;

    if (param === "identifier" || code === "form_identifier_not_found") {
      errors.fieldErrors.emailAddress = shortMessage;
    } else if (param === "password" || code === "form_password_incorrect") {
      errors.fieldErrors.password = shortMessage;
    } else {
      errors.formError = longMessage || shortMessage;
    }

    if (code === "user_locked") {
      errors.formError = longMessage;
    }
  });

  return errors;
}

export { parsedClerkErrors };
