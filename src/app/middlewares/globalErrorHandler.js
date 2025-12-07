export default (err, req, res, next) => {
  console.error(err);
    // default status
    const status = err.status || err.statusCode || 500;
    console.error(err);

    // Joi style validation errors (we set `details` in validate helper)
    if (status === 400 && err.details) {
      return res.status(400).json({ error: true, message: err.message || "Validation failed", details: err.details });
    }

    // Generic error response
    res.status(status).json({ error: true, message: err.message || String(err) });
};
