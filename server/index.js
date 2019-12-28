import express from 'express';
import users from './routes/v1/users';
import notFoundPage from './routes/v1/notFoundPage';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Route
app.use('/v1/users', users);
app.use(notFoundPage);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
