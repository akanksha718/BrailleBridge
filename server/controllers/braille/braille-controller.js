const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Python service URL
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5001';

// Convert text to braille
exports.convertTextToBraille = async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        console.log('Sending request to Python service at:', `${PYTHON_SERVICE_URL}/api/convert/text-to-braille`);
        const response = await axios.post(`${PYTHON_SERVICE_URL}/api/convert/text-to-braille`, {
            text
        });

        console.log('Response from Python service:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error converting text to braille:', error.message);
        console.error('Error details:', error.response?.data || error.code);
        
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({ 
                error: 'Python service is not running. Please start the Python service on port 5001.',
                hint: 'Run: cd processor && python app.py'
            });
        }
        
        res.status(500).json({ 
            error: 'Failed to convert text to braille', 
            details: error.response?.data || error.message 
        });
    }
};

// Convert braille to text
exports.convertBrailleToText = async (req, res) => {
    try {
        const { braille } = req.body;
        
        if (!braille) {
            return res.status(400).json({ error: 'Braille content is required' });
        }

        const response = await axios.post(`${PYTHON_SERVICE_URL}/api/convert/braille-to-text`, {
            braille
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error converting braille to text:', error);
        res.status(500).json({ error: 'Failed to convert braille to text', details: error.message });
    }
};

// Convert image to braille
exports.convertImageToBraille = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const formData = new FormData();
        
        formData.append('file', fs.createReadStream(req.file.path));

        console.log('Sending request to Python service at:', `${PYTHON_SERVICE_URL}/api/convert/image-to-braille`);
        const response = await axios.post(
            `${PYTHON_SERVICE_URL}/api/convert/image-to-braille`,
            formData,
            {
                headers: formData.getHeaders()
            }
        );

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        console.log('Response from Python service:', response.data);
        res.json(response.data);
    } catch (error) {
        // Clean up uploaded file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        console.error('Error converting image to braille:', error.message);
        console.error('Error details:', error.response?.data || error.code);
        
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({ 
                error: 'Python service is not running. Please start the Python service on port 5001.',
                hint: 'Run: cd processor && python app.py'
            });
        }
        
        res.status(500).json({ 
            error: 'Failed to convert image to braille', 
            details: error.response?.data || error.message 
        });
    }
};

// Convert PDF to braille
exports.convertPDFToBraille = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const formData = new FormData();
        
        formData.append('file', fs.createReadStream(req.file.path));

        console.log('Sending request to Python service at:', `${PYTHON_SERVICE_URL}/api/convert/pdf-to-braille`);
        const response = await axios.post(
            `${PYTHON_SERVICE_URL}/api/convert/pdf-to-braille`,
            formData,
            {
                headers: formData.getHeaders()
            }
        );

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        console.log('Response from Python service:', response.data);
        res.json(response.data);
    } catch (error) {
        // Clean up uploaded file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        console.error('Error converting PDF to braille:', error.message);
        console.error('Error details:', error.response?.data || error.code);
        
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({ 
                error: 'Python service is not running. Please start the Python service on port 5001.',
                hint: 'Run: cd processor && python app.py'
            });
        }
        
        res.status(500).json({ 
            error: 'Failed to convert PDF to braille', 
            details: error.response?.data || error.message 
        });
    }
};

// Download braille as .brf file
exports.downloadBRF = async (req, res) => {
    try {
        const { braille } = req.body;
        
        if (!braille) {
            return res.status(400).json({ error: 'Braille content is required' });
        }

        // Create .brf file in memory
        const response = await axios.post(
            `${PYTHON_SERVICE_URL}/api/download/brf`,
            { braille },
            { responseType: 'stream' }
        );

        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', 'attachment; filename=braille_output.brf');
        
        response.data.pipe(res);
    } catch (error) {
        console.error('Error downloading BRF file:', error);
        res.status(500).json({ error: 'Failed to generate BRF file', details: error.message });
    }
};

