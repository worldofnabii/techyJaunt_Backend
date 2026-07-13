import express, { Application, Request, Response } from "express";

/*express → Creates the application.
Application → Type for the Express app.
Request → Type for incoming requests.
Response → Type for outgoing responses.*/

const app: Application = express();

// This is the Middleware
app.use(express.json());

// This is the testing route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to AutoLease API "
  });
});

export default app;