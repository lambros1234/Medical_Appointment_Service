export function checkJWT(token) {
    try {
        if (!token) return false;

        const parts = token.split(".");
        if (parts.length !== 3) return false;

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));

        if (!payload.exp) return false;

        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime < payload.exp;
    } catch (error) {
        console.error("Invalid token format:", error);
        return false;
    }
}

export function isLoggedIn() {
    const token = localStorage.getItem("token");
    return checkJWT(token);
}
