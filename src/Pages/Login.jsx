import React, { useState } from "react";
import { CheckIn } from "../Handler/Authentication";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogging, setIsLogging] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = isLogging ? "signin" : "signup";

    const credentials = {
      email,
      password,
      fullname: FullName,
    };

    console.log(FullName, email, password);

    try {
      const data = await CheckIn(url, credentials);

      console.log(data);

      if (!data.user) {
        setError(data.message || "Invalid credentials. Try again.");
      } else {
        if (!isLogging) {
          toast.success("Profile created. Please login");
          setPassword("");
          setEmail("");
          setFullName("");
          setIsLogging(true);

          return;
        }
        const user = JSON.stringify(data.user);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("authUser", user);
        window.location.href = "/dashboard"; // redirect after success
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-[url('https://static.vecteezy.com/system/resources/thumbnails/026/706/335/small/happy-graduation-greeting-background-with-sketch-vector.jpg')] bg-center bg-no-repeat bg-cover p-4">
      <div className="bg-white  rounded-xl shadow-xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {isLogging ? "Login to Your Account" : "Enter required details"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          {!isLogging && (
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Full Name :
              </label>
              <input
                type="text"
                id="fullname"
                disabled={loading}
                required
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg   focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm transition"
                placeholder="Enter your email"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              disabled={loading}
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg   focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              disabled={loading}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg   focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm transition"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
            }}
            className={`w-full py-2 text-white font-semibold rounded-lg transition-all ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-indigo-400 hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {isLogging
              ? loading
                ? "Logging in..."
                : "Login"
              : loading
              ? "Submitting..."
              : "SignUp"}
          </button>
        </form>

        {isLogging ? (
          <p className="text-center text-gray-500 text-xs mt-4">
            Don’t have an account?{" "}
            <span
              style={{
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                !loading && setIsLogging(false);
              }}
              className="text-indigo-500 cursor-pointer hover:underline font-medium"
            >
              Register
            </span>
          </p>
        ) : (
          <p className="text-center text-gray-500 text-xs mt-4">
            Already have an account?{" "}
            <span
              style={{
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                !loading && setIsLogging(true);
              }}
              className="text-indigo-500 cursor-pointer hover:underline font-medium"
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
