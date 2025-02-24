import { ZodError } from "zod";

export function validateRequest(schema) {
  return (req, res, next) => {
    try {
      const method = req.method.toLowerCase();

      const data = {
        ["patch"]: req.body,
        ["post"]: req.body,
        ["get"]: req.params,
        ["delete"]: req.params,
      };

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  };
}
