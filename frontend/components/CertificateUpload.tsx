import React, { useState } from 'react';

const CertificateUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('certificateFile', file);

        await fetch('/api/upload-certificate', {
            method: 'POST',
            body: formData,
        });
        setUploading(false);
        setFile(null);
        alert('File uploaded and processed!');
    };

    return (
        <div>
            <h2>Upload Certificate CSV/PDF</h2>
            <input type="file" accept=".csv,.pdf" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default CertificateUpload;
