import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function RegisterPage() {
  const { register, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    company_name: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch {
      // error is set in store
    }
  };

  return (
    <div className="auth-page">
      <h1>Create Account</h1>
      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={clearError} type="button">
            &times;
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Company Name
          <input value={form.company_name} onChange={set("company_name")} required />
        </label>
        <label>
          First Name
          <input value={form.first_name} onChange={set("first_name")} required />
        </label>
        <label>
          Last Name
          <input value={form.last_name} onChange={set("last_name")} required />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={set("email")} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={set("password")}
            required
            minLength={8}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create Account"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
