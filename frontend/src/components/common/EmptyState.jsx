const EmptyState = ({ title = 'Nothing here yet', message, action }) => (
  <div className="empty-state">
    <h3>{title}</h3>
    {message && <p className="mb-3">{message}</p>}
    {action}
  </div>
);

export default EmptyState;
