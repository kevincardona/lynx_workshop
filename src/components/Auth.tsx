import { useEffect, useState } from "react";
import { signInWithEmail, signUpWithEmail } from "../api/auth.ts";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [session, setSession] = useState<any>();

  useEffect(() => {
    setError("");
  }, [isSignIn]);

  async function signIn() {
    setError('');
    setLoading(true);
    const { session, error } = await signInWithEmail(email, password);
    if (error) setError(error.message);
    setSession(session);
    setLoading(false);
  }

  async function signUp() {
    setError('');
    setLoading(true);
    const { session, error } = await signUpWithEmail(email, password);
    if (error) setError(error.message);
    setSession(session);
    setLoading(false);
  }

  return (
    <view className="w-full h-full bg-gray-100 flex flex-col items-center justify-center px-6">

      {/* Title */}
      <text className="text-4xl font-bold text-gray-800 mb-8">My App</text>

      {/* Card Container */}
      <view className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Loading Spinner */}
        {loading && (
          <view className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        )}

        {/* Session Info (for debugging) */}
        {session && (
          <text className="text-gray-600 text-sm mb-4 text-center truncate w-full">
            {JSON.stringify(session)}
          </text>
        )}

        {/* Error Message */}
        {error && (
          <text className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded-md">
            {error}
          </text>
        )}

        {/* Email Input */}
        <input
          className="h-12 w-full border border-gray-200 rounded-md px-4 mb-4 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Email"
          type="email"
          value={email}
          bindinput={(e) => setEmail(e.detail.value as string)}
        />

        {/* Password Input */}
        <input
          className="h-12 w-full border border-gray-200 rounded-md px-4 mb-6 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Password"
          type="password"
          value={password}
          bindinput={(e) => setPassword(e.detail.value as string)}
        />

        {/* Toggle Buttons */}
        <view className="flex flex-row mb-6 rounded-md overflow-hidden border border-gray-200">
          <text
            className={`flex-1 px-4 py-2 text-center cursor-pointer transition-colors ${isSignIn ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            bindtap={() => setIsSignIn(true)}
          >
            Sign In
          </text>
          <text
            className={`flex-1 px-4 py-2 text-center cursor-pointer transition-colors ${!isSignIn ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            bindtap={() => setIsSignIn(false)}
          >
            Sign Up
          </text>
        </view>

        {/* Submit Button */}
        <text
          className={`w-full h-12 flex items-center justify-center text-center bg-blue-600 text-white rounded-md font-medium transition-all ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700 active:bg-blue-800"
            }`}
          style={{ lineHeight: '3rem' }} // Added explicit line-height
          bindtap={isSignIn ? signIn : signUp}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </text>
      </view>
      <scroll-view scroll-orientation="vertical" className="mt-10 h-52 text-black">
        {session ? <text className="text-black">User is logged in {JSON.stringify(session)}</text> : <text className="text-black"> User is not logged in </text>}
      </scroll-view>
    </view >
  );
};

export default Auth;

