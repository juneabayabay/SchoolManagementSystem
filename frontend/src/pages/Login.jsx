function Login() {
  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f4f6f9" }}
    >
      <div
        className="card border-0 shadow-lg p-5"
        style={{ width: "450px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <div style={{ fontSize: "55px" }}>🎓</div>

          <h2 className="fw-bold text-primary">
            School Management
          </h2>

          <p className="text-muted">
            Administrator Login
          </p>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Username
            </label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
            />
          </div>

          <button className="btn btn-primary btn-lg w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;