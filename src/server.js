import express from 'express';
import cors from 'cors';
const app = express();
import routes from './routes.js';

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
