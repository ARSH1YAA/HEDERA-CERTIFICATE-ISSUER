import express from 'express';
import bodyParser from 'body-parser';
import uploadCertificateRoute from './routes/upload-certificate';

const app = express();

app.use(bodyParser.json());
app.use('/api/upload-certificate', uploadCertificateRoute);

export default app;