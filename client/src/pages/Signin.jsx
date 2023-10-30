import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          id="username"
          type="text"
          placeholder="username"
          className="border p-2 rounded-lg"
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          className="border p-2 rounded-lg"
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="border p-2 rounded-lg text-justify"
        />
        <button
          className="border p-2 bg-slate-600 text-white
          disabled:opacity-80 uppercase rounded-lg hover:opacity-95"
        >
          Sign In
        </button>
      </form>
      <div className="flex gap-2 p-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-800">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
