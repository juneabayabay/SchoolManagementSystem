const Input = ({ label, type = 'text', ...props }) => {
    return (
      <div className="mb-3">
        {label && <label className="form-label">{label}</label>}
        <input type={type} className="form-control" {...props} />
      </div>
    );
  };
  export default Input;