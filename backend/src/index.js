import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoute from './routers/products.router.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//TODO: Configure routing controller
app.use('/products', productRoute);

app.listen(process.env.PORT, () => {
	console.log(`Server running at http://localhost:${process.env.PORT}}`);
});
