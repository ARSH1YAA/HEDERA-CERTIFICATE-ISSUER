import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import { storeCertificateOnChain } from '../utils/hedera';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('certificateFile'), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded');

    let certificates: any[] = [];

    if (file.mimetype === 'text/csv') {
        fs.createReadStream(file.path)
            .pipe(csvParser())
            .on('data', (row) => {
                certificates.push(row);
            })
            .on('end', async () => {
                for (const cert of certificates) {
                    const token = generateToken(cert);
                    await storeCertificateOnChain({ ...cert, token });
                }
                fs.unlinkSync(file.path);
                res.send('CSV processed and certificates stored on-chain');
            });
    } else if (file.mimetype === 'application/pdf') {
        // For PDF, just store file hash and metadata
        const cert = {
            name: file.originalname,
            date: new Date().toISOString(),
            course: 'PDF Upload',
        };
        const token = generateToken(cert);
        await storeCertificateOnChain({ ...cert, token });
        fs.unlinkSync(file.path);
        res.send('PDF processed and certificate stored on-chain');
    } else {
        fs.unlinkSync(file.path);
        res.status(400).send('Unsupported file type');
    }
});

function generateToken(cert: any) {
    // Simple hash for uniqueness
    return require('crypto').createHash('sha256').update(JSON.stringify(cert)).digest('hex');
}

export default router;
