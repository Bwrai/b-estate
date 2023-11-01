import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice.js";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-blue-800">
        Sign In
      </h1>
      <form name="signUp" onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading" : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 p-2">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-800">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
