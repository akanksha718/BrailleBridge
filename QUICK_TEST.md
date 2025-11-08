# Quick Test Guide - "Failed to Convert" Fix

## ⚠️ Important: You MUST restart your backend after the CORS fix

### Step 1: Restart Backend Server

1. Go to the terminal where you're running the backend server
2. Press `Ctrl+C` to stop it
3. Run: `npm run dev` again

You should see:
```
Server is running on port 5000
```

### Step 2: Test with the React App

**Don't use test_api.html from file://** - browsers block that!

Instead, use your React app:

1. Make sure you're logged in at http://localhost:5173
2. Go to the conversion page
3. Try converting text like "hello"

You should now see:
- Console logs showing the request
- No "Failed to fetch" error
- Braille output should appear

### Step 3: If still not working

Open browser console (F12) and check:

1. **Network tab** - Do you see the request to `/api/braille/text-to-braille`?
2. **Console tab** - What errors do you see?

### What to Look For

**In Browser Console (F12):**
```
Sending request with text: hello
Response received: {...}
Response data: {success: true, braille: "...", original: "..."}
Braille: ⠓⠑⠇⠇⠕
```

**In Backend Terminal:**
```
Sending request to Python service at: http://localhost:5001/api/convert/text-to-braille
Response from Python service: {success: true, braille: "...", original: "..."}
```

**In Python Terminal:**
```
Received request to convert text to braille
Request data: {'text': 'hello'}
Text received: hello
Converted to braille: ⠓⠑⠇⠇⠕
Sending response: {'success': True, 'braille': '⠓⠑⠇⠇⠕', 'original': 'hello'}
```

### Common Issues

1. **"ECONNREFUSED" in backend logs** → Python service not running
   - Start it: `cd processor && python app.py`

2. **"Failed to fetch" in browser** → Backend not running
   - Check: Is `npm run dev` running in server terminal?

3. **404 error** → Backend not restarted
   - Must restart backend after code changes

4. **Empty response** → Check all 3 services are running
   - Python (port 5001), Backend (port 5000), Frontend (port 5173)

### Test the Fix

After restarting backend:

1. Open http://localhost:5173
2. Log in (or sign up)
3. Go to conversion page
4. Type "hello world" and send
5. Check browser console (F12 → Console tab)

You should see detailed logs now telling you exactly what's happening!


