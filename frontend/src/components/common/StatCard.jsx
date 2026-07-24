const StatCard = ({ label, value, meta, tint = 'var(--brand-soft)', delay = 0 }) => (
  <div
    className="stat-card"
    style={{ '--stat-tint': tint, animationDelay: `${delay}ms` }}
  >
    <div className="stat-label">{label}</div>
    <p className="stat-value">{value}</p>
    {meta && <div className="stat-meta">{meta}</div>}
  </div>
);

export default StatCard;
