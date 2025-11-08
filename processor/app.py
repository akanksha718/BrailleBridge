"""
Python Flask API for Braille Conversion
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import sys
import json
import tempfile
import pytesseract
from braille_converter import (
    text_to_braille,
    braille_to_text,
    image_to_text,
    create_brf_file
)
import traceback

app = Flask(__name__)
CORS(app)

# Configure Tesseract path
# Try to detect Tesseract automatically, then set manual path if needed

# Common Windows paths
windows_paths = [
    r'C:\Program Files\Tesseract-OCR\tesseract.exe',
    r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe',
    r'C:\Users\ayush\AppData\Local\Programs\Tesseract-OCR\tesseract.exe',
]

# Check if tesseract is in PATH first
try:
    import subprocess
    result = subprocess.run(['tesseract', '--version'], capture_output=True, text=True)
    print(f"✓ Tesseract found in PATH: {result.stdout.split()[1]}")
except:
    print("⚠ Tesseract not found in PATH, trying common Windows locations...")
    found = False
    for path in windows_paths:
        if os.path.exists(path):
            pytesseract.pytesseract.tesseract_cmd = path
            print(f"✓ Tesseract found at: {path}")
            found = True
            break
    
    if not found:
        print("❌ ERROR: Tesseract OCR not found!")
        print("Please install Tesseract:")
        print("1. Download from: https://github.com/UB-Mannheim/tesseract/wiki")
        print("2. Install with 'Add to PATH' checked")
        print("3. Or update this file with your Tesseract path")
        print("")
        print(f"Current working directory: {os.getcwd()}")
        print(f"Python sys.path: {sys.path}")

# Get the path from environment variable if set
tesseract_cmd = os.getenv('TESSERACT_CMD')
if tesseract_cmd:
    pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
    print(f"✓ Using Tesseract from env: {tesseract_cmd}")

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/api/convert/text-to-braille', methods=['POST'])
def convert_text_to_braille():
    """
    Convert text to braille format
    """
    try:
        print("Received request to convert text to braille")
        data = request.get_json()
        print(f"Request data: {data}")
        text = data.get('text', '')
        print(f"Text received: {text}")
        
        if not text:
            print("Error: No text provided")
            return jsonify({'error': 'No text provided'}), 400
        
        braille = text_to_braille(text)
        print(f"Converted to braille: {braille}")
        
        result = {
            'success': True,
            'braille': braille,
            'original': text
        }
        print(f"Sending response: {result}")
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Error in text-to-braille: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/api/convert/braille-to-text', methods=['POST'])
def convert_braille_to_text():
    """
    Convert braille back to regular text
    """
    try:
        data = request.get_json()
        braille = data.get('braille', '')
        
        if not braille:
            return jsonify({'error': 'No braille provided'}), 400
        
        text = braille_to_text(braille)
        
        return jsonify({
            'success': True,
            'text': text,
            'braille': braille
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/convert/image-to-braille', methods=['POST'])
def convert_image_to_braille():
    """
    Extract text from image using OCR and convert to braille
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save uploaded file temporarily
        filename = file.filename
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Extract text from image using OCR
        extracted_text = image_to_text(filepath)
        
        # Convert to braille
        braille = text_to_braille(extracted_text)
        
        # Clean up temporary file
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'braille': braille,
            'original_text': extracted_text
        })
    
    except Exception as e:
        return jsonify({'error': str(e), 'traceback': traceback.format_exc()}), 500


@app.route('/api/convert/pdf-to-braille', methods=['POST'])
def convert_pdf_to_braille():
    """
    Extract text from PDF and convert to braille
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save uploaded file temporarily
        filename = file.filename
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Extract text from PDF
        try:
            from PyPDF2 import PdfReader
            reader = PdfReader(filepath)
            extracted_text = ""
            
            for page in reader.pages:
                extracted_text += page.extract_text() + "\n"
            
        except Exception as pdf_error:
            # If PDF text extraction fails, try OCR
            try:
                from pdf2image import convert_from_path
                from PIL import Image
                import pytesseract
                
                images = convert_from_path(filepath)
                extracted_text = ""
                
                for img in images:
                    extracted_text += pytesseract.image_to_string(img) + "\n"
            
            except Exception as ocr_error:
                return jsonify({
                    'error': f'Could not extract text from PDF: {str(pdf_error)}',
                    'ocr_error': str(ocr_error)
                }), 500
        
        # Convert to braille
        braille = text_to_braille(extracted_text)
        
        # Clean up temporary file
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'braille': braille,
            'original_text': extracted_text
        })
    
    except Exception as e:
        return jsonify({'error': str(e), 'traceback': traceback.format_exc()}), 500


@app.route('/api/download/brf', methods=['POST'])
def download_brf():
    """
    Generate a .brf file for download
    """
    try:
        data = request.get_json()
        braille_content = data.get('braille', '')
        
        if not braille_content:
            return jsonify({'error': 'No braille content provided'}), 400
        
        # Create temporary .brf file
        temp_file = tempfile.NamedTemporaryFile(mode='w', suffix='.brf', delete=False, encoding='utf-8')
        temp_file.write(braille_content)
        temp_file.close()
        
        return send_file(
            temp_file.name,
            as_attachment=True,
            download_name='braille_output.brf',
            mimetype='text/plain'
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({'status': 'healthy', 'service': 'Braille Converter API'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

