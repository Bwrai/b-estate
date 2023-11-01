import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-blue-800">Sign Up</h1>
      <form name="signUp" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="username"
          className="border p-2 rounded-lg"
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          className="border p-2 rounded-lg"
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          className="border p-2 rounded-lg text-justify"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button
          disabled={loading}
          className="border p-2 bg-slate-600 text-white
          disabled:opacity-80 uppercase rounded-lg hover:opacity-95"
        >
          {loading ? "Loading" : "Sign up"}
        </button>
      </form>
      <div className="flex gap-2 p-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-800">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
