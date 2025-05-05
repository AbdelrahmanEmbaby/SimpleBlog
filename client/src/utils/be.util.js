export function getBEURL() {
    if (process.env.NODE_ENV === 'production') {
        return "https://simpleblog-production-e4f0.up.railway.app";
    } else {
        return '/api';
    }
}