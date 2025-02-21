import { ZodError } from "zod";

export function validateRequest(schema) {
  return (req, res, next) => {
    try {
      const method = req.method.toLowerCase();
      console.log(req.params);

      if (method === "post") {
        schema.parse(req.body);
      } else {
        schema.parse(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  };
}
