import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes/ses.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/v2/email", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`AWS SES Mock API running on port ${PORT}`);
});

export default app;
