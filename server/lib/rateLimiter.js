export const createRateLimiter = ({ windowMs, max }) => {
  const hits = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const key = `${req.ip}:${req.method}:${req.path}`;
    const current = hits.get(key);

    if (!current || current.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      if (hits.size > 5000) {
        for (const [hitKey, hit] of hits.entries()) {
          if (hit.resetAt <= now) hits.delete(hitKey);
        }
      }
      return next();
    }

    current.count += 1;
    if (current.count > max) {
      res.setHeader("Retry-After", Math.ceil((current.resetAt - now) / 1000));
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    return next();
  };
};
