function err(err, req, res, next) {
  console.log(err);

  const status = err.status || 500;

  function getErrorMessage(status) {
    if (status === 500) return "Something went wrong, please try again later";

    if (status != 500)
      return err.message || "Something went wrong, please try again later";
  }

  return res.status(status).json({
    success: false,
    message: getErrorMessage(status),
  });
}

export default err;
