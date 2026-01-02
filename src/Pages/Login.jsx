import { useState, useEffect } from "react";
import { CheckIn } from "../Handler/Authentication";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthUser }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [subuser, setSubuser] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return navigate("/dashboard", { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setError("");
    setLoading(true);


    const credentials = {
      email,
      password,
    };

    try {
      const data = await CheckIn({
        url: "signin",
        subuser: subuser,
        credentials,
      });

      if (!data.user) {
        setError(data.message || data.msg || "Invalid credentials. Try again.");
      } else {
        setAuthUser(data.user);

        // Then sync to localStorage
        localStorage.setItem("token", data.accessToken);

        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      // console.log(err);
      setError(
        err?.response?.data?.msg || err?.message || "Something went wrong Try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-[url('https://static.vecteezy.com/system/resources/thumbnails/026/706/335/small/happy-graduation-greeting-background-with-sketch-vector.jpg')] bg-center bg-no-repeat bg-cover p-4">
      <div className="bg-white  rounded-xl shadow-xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
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
          <div className="flex gap-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              loggin as a Subuser:
            </label>
            <input
              disabled={loading}
              onChange={(e) => setSubuser(e.target.checked)}
              type="checkbox"
              value={subuser}
              name="role"
              id=""
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
            }}
            className={`w-full py-2 text-white font-semibold rounded-lg transition-all ${loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-indigo-400 hover:shadow-lg hover:-translate-y-0.5"
              }`}
          >
            {loading
              ? "Logging in..."
              : "Login"
            }
          </button>
        </form>


      </div>
    </div>
  );
};

export default Login;
