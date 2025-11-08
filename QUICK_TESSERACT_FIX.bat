@echo off
echo ==========================================
echo  TESSERACT OCR INSTALLATION CHECKER
echo ==========================================
echo.

echo Checking if Tesseract is installed...
echo.

:: Check if tesseract is in PATH
where tesseract >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Tesseract is installed!
    echo.
    tesseract --version
    echo.
    echo Tesseract is working correctly!
) else (
    echo [ERROR] Tesseract is NOT installed!
    echo.
    echo Please install Tesseract:
    echo 1. Go to: https://github.com/UB-Mannheim/tesseract/wiki
    echo 2. Download: tesseract-ocr-w64-setup-5.x.x.exe
    echo 3. Install it with "Add to PATH" checked
    echo 4. Run this script again to verify
    echo.
    echo After installation, restart your Python service!
)

echo.
echo Press any key to exit...
pause >nul


