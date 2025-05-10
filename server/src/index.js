import express from 'express';
import 'dotenv/config';
import router from './routes/authRoutes.js';
import { connectDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', router)

app.use('/', (req, res) => {
  res.send('Hi');
});


app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
  connectDB()
});
