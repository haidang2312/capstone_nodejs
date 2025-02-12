export const responseSuccess = (
  metaData = null,
  message = "OK",
  code = 200
) => {
  if (typeof code !== "number") code = 200;
  return {
    status: "success",
    code,
    message: message,
    metaData: metaData,
    doc: "api.domain.com/doc",
  };
};

export const responseError = (
  message = "Internal server error",
  code = 500,
  stack = null
) => {
  if (typeof code !== "number") code = 500;
  return {
    status: "Error",
    code,
    message,
    stack,
  };
};
