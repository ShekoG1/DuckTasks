import express from 'express';
const app = express();
import routes from './routes.js';

app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
