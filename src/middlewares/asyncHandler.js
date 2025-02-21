export function asyncHandler(fn) {
  return async (req, res, next) => {
    try {
      const result = await fn(req, res, next);
      if (result !== undefined) {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}
