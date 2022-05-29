import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import 'colors';
import 'express-async-errors';

// Router
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// Middleware
import {
  errorHandleMiddleware, notFoundMiddleware, authenticateUserMiddleware, noUserMiddleware,
} from './middleware/index.js';

// DB
import connectDB from './DB/connectDB.js';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === 'DEV') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authenticateUserMiddleware, noUserMiddleware, userRouter);

app.use(errorHandleMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`.yellow.bold);
    });
  } catch (error) {
    console.error(`Error:${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

start();

// routes
// readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
