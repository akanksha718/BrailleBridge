# Braille Converter Python Service

This is the Python service that handles all braille conversions for the BrailleBridge application.

## Setup

1. Install Python dependencies:
```bash
cd processor
pip install -r requirements.txt
```

2. Install Tesseract OCR (required for OCR functionality):
   - Windows: Download from https://github.com/UB-Mannheim/tesseract/wiki
   - Mac: `brew install tesseract`
   - Linux: `sudo apt-get install tesseract-ocr`

3. Set Tesseract path (if needed):
   - Edit `braille_converter.py` and update `pytesseract.pytesseract.tesseract_cmd` with your Tesseract installation path

## Running the Service

```bash
# Install dependencies
pip install flask flask-cors

# Run the Flask server
python app.py
```

The service will run on `http://localhost:5001`

## API Endpoints

- `POST /api/convert/text-to-braille` - Convert text to braille
- `POST /api/convert/braille-to-text` - Convert braille back to text
- `POST /api/convert/image-to-braille` - Extract text from image and convert to braille
- `POST /api/convert/pdf-to-braille` - Extract text from PDF and convert to braille
- `POST /api/download/brf` - Generate and download .brf file
- `GET /health` - Health check endpoint

## Usage Examples

### Convert text to braille
```python
from braille_converter import text_to_braille
result = text_to_braille("Hello World")
print(result)
```

### Convert braille to text
```python
from braille_converter import braille_to_text
result = braille_to_text("⠓⠑⠇⠇⠕ ⠺⠕⠗⠇⠙")
print(result)
```

### Extract text from image
```python
from braille_converter import image_to_text
result = image_to_text("image.png")
print(result)
```


