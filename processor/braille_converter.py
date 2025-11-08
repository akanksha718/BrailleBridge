"""
Braille Converter Service
Handles conversion between text and braille, OCR, and PDF processing
"""

import os
import sys
import json
import re
from typing import Tuple, Optional

try:
    from PIL import Image
    import pytesseract
except ImportError:
    print("Please install required packages: pip install Pillow pytesseract")
    sys.exit(1)

# Dictionary mapping characters to braille dots
BRAILLE_TABLE = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋',
    'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇',
    'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗',
    's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
    'y': '⠽', 'z': '⠵',
    ' ': ' ', '\n': '\n',
    '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', ':': '⠐',
    ';': '⠰', '-': '⠤', '/': '⠌', '(': '⠦', ')': '⠴',
    '0': '⠴', '1': '⠂', '2': '⠆', '3': '⠒', '4': '⠲',
    '5': '⠢', '6': '⠖', '7': '⠶', '8': '⠦', '9': '⠔',
}

# Reverse braille to text mapping
BRAILLE_TO_TEXT = {v: k for k, v in BRAILLE_TABLE.items()}


def text_to_braille(text: str) -> str:
    """
    Convert text to braille dots
    """
    braille = ""
    text = text.lower()
    
    for char in text:
        if char in BRAILLE_TABLE:
            braille += BRAILLE_TABLE[char]
        else:
            braille += ' '  # Unknown character
    
    return braille


def braille_to_text(braille: str) -> str:
    """
    Convert braille dots back to text
    """
    text = ""
    
    for char in braille:
        if char in BRAILLE_TO_TEXT:
            text += BRAILLE_TO_TEXT[char]
        else:
            text += char
    
    return text


def image_to_text(image_path: str) -> str:
    """
    Extract text from an image using OCR
    """
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        return f"Error extracting text from image: {str(e)}"


def create_brf_file(content: str, output_path: str) -> None:
    """
    Create a .brf file with braille content
    """
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)


def main():
    """
    Main function to handle command-line usage
    """
    if len(sys.argv) < 2:
        print("Usage: python braille_converter.py <command> <args>")
        print("Commands:")
        print("  text-to-braille <text>")
        print("  braille-to-text <braille>")
        print("  ocr-image <image_path>")
        print("  process-file <input_path> <output_path>")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "text-to-braille":
        if len(sys.argv) < 3:
            print("Error: Please provide text to convert")
            sys.exit(1)
        text = sys.argv[2]
        result = text_to_braille(text)
        print(result)
    
    elif command == "braille-to-text":
        if len(sys.argv) < 3:
            print("Error: Please provide braille to convert")
            sys.exit(1)
        braille = sys.argv[2]
        result = braille_to_text(braille)
        print(result)
    
    elif command == "ocr-image":
        if len(sys.argv) < 3:
            print("Error: Please provide image path")
            sys.exit(1)
        image_path = sys.argv[2]
        result = image_to_text(image_path)
        print(result)
    
    elif command == "process-file":
        if len(sys.argv) < 4:
            print("Error: Please provide input and output paths")
            sys.exit(1)
        input_path = sys.argv[2]
        output_path = sys.argv[3]
        
        # Determine if image or text file
        if input_path.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            text = image_to_text(input_path)
            braille = text_to_braille(text)
            
            if output_path.endswith('.brf'):
                create_brf_file(braille, output_path)
            else:
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(braille)
            print(f"Converted image to braille: {output_path}")
        else:
            # Assume text file
            with open(input_path, 'r', encoding='utf-8') as f:
                text = f.read()
            braille = text_to_braille(text)
            
            if output_path.endswith('.brf'):
                create_brf_file(braille, output_path)
            else:
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(braille)
            print(f"Converted text to braille: {output_path}")
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)


if __name__ == "__main__":
    main()


