export const parseError = (err: any) => {
  const name = err.name;
  const message = err.message;

  return {
    name,
    message,
    ...err,
  };
};
