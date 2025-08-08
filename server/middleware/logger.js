// middleware to log request detauls
function logger(req, res, next) {
  res.on("finish", () => {
    console.log(
      `Method: ${req.method}, URL: ${req.originalUrl}, statusCode: ${res.statusCode}`
    );
  });

  next();
}

export default logger;
