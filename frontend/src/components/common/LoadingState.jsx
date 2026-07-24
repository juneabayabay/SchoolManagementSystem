const LoadingState = ({ label = 'Loading…' }) => (
  <div className="loading-state">
    <div className="spinner" aria-hidden="true" />
    <span>{label}</span>
  </div>
);

export default LoadingState;
