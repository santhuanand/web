# reCAPTCHA Setup Instructions

## Steps to Enable reCAPTCHA:

1. **Get reCAPTCHA Keys:**
   - Go to https://www.google.com/recaptcha/admin/create
   - Register your domain (www.asnrtech.com)
   - Choose reCAPTCHA v2 "I'm not a robot" checkbox
   - Get your Site Key and Secret Key

2. **Update HTML:**
   - Replace `6LfYourSiteKeyHere` in index.html with your actual Site Key
   - Find this line: `<div class="g-recaptcha" data-sitekey="6LfYourSiteKeyHere"`

3. **Backend Verification (Optional but Recommended):**
   - For server-side verification, send the reCAPTCHA response to your backend
   - Verify with Google's API using your Secret Key
   - URL: https://www.google.com/recaptcha/api/siteverify

## Current Implementation:
- Added reCAPTCHA widget to contact form
- Client-side validation prevents form submission without completing reCAPTCHA
- Form resets reCAPTCHA after successful submission
- Error handling for incomplete reCAPTCHA

## Security Note:
Client-side validation alone can be bypassed. For maximum security, implement server-side verification of the reCAPTCHA response.