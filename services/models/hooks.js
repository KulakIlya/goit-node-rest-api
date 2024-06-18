export const handleSaveError = (error, _, next) => {
  error.status = 404;
  next();
};
