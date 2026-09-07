function requireRole(...allowed) {
  return (req, res, next) => {
    const role = req.admin?.role || 'viewer';
    if (role === 'superadmin') return next();
    if (allowed.includes(role)) return next();
    return res.status(403).json({ error: 'Insufficient permissions' });
  };
}

module.exports = { requireRole };
