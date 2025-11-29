function err(err, req, res, next) {
  console.log(err.message);

  return res.status(500).json({
    success: false,
    message: "Something went wrong, please try again later",
  });
}

export default err;
