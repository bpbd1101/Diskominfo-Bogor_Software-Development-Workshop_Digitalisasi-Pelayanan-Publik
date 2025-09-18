import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_me_super_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export function signJwt(payload) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }
  // Include iat automatically; allow custom exp via options if needed later
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function getBearerToken(request) {
  try {
    const authHeader = request.headers.get("authorization") || request.headers.get("Authorization");
    if (!authHeader) return null;
    const parts = authHeader.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
      return parts[1];
    }
    // Fallback: if header provided without Bearer prefix
    return authHeader;
  } catch (_) {
    return null;
  }
}

const auth = { signJwt, verifyJwt, getBearerToken };
export default auth;


