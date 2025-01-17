import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectDB from './database/db';
import { httpErrorMiddleware, notFoundErrorMiddleware } from './middleware/global-error/error';
import userRoutes from './routes/users-routes';
import todoRoutes from './routes/todos-routes';

const app = express();

// registering CORS for allowing cross-origin requests
app.use(cors());

// registering bodyParser for parsing body fields
app.use(bodyParser.json());

// registering user routes
app.use('/api/users', userRoutes);

//registering todo routes
app.use('/api/todo', todoRoutes);

// registering a 404 error handling if any of the routes above don't work
app.use(notFoundErrorMiddleware);

// registering global error handling
app.use(httpErrorMiddleware);

// server + DB coonnection
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
  });
});
