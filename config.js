// API key is encoded to avoid plain-text exposure in source code
// SECURITY: This key is still visible to anyone inspecting the page.
// You MUST restrict this key in Google Cloud Console:
//   1. Application restrictions → HTTP referrers → add https://www.asnrtech.com/*
//   2. API restrictions → restrict to Google Sheets API and YouTube Data API v3 only
// For true security, proxy API calls through a backend (e.g., AWS Lambda + API Gateway)
(function() {
    var _k = [
        'QUl6YVN5Q1Ns',
        'aF9aOUwwMHAx',
        'RTFjeXl6S19a',
        'UlU1a3JlcDUw',
        'RV9F'
    ];
    window.__GOOGLE_API_KEY__ = atob(_k.join(''));
})();
