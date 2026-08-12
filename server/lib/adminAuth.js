import crypto from "crypto";

const timingSafeStringEqual = (a, b) => {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
};

export const requireAdminToken = (req, res) => {
  const token = req.headers["x-admin-token"] || req.query.token;
  const secret = process.env.ADMIN_SECRET;

  if (!secret || !token || !timingSafeStringEqual(token, secret)) {
    res.status(401).json({ error: "Unauthorized." });
    return false;
  }

  return true;
};
