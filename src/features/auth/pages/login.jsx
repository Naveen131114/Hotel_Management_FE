import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../../../common/components/button";
import { Input } from "../../../common/components/input";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    const res = await loginUser(form);
    login(res.data);
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_20%)] animate-hue-slow" />
      <div className="absolute left-[-8rem] top-1/4 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl animate-blob" />
      <div className="absolute right-[-10rem] top-3/4 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="glass-panel w-full max-w-lg space-y-8 px-8 py-10 shadow-2xl shadow-slate-950/30">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300 opacity-80 animate-fade-in-up">
              Welcome back
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-wide text-white animate-fade-in-up">
              Hotel Management Login
            </h1>
            {/* <p className="mx-auto max-w-md text-sm text-slate-300 animate-fade-in-up">
              Sign in to access the dashboard, manage rooms, bookings and guests with a smooth modern experience.
            </p> */}
          </div>

          <div className="space-y-4 animate-fade-in-up">
            <Input
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-white/20 text-slate-900 placeholder:text-slate-500 focus:border-white/40 focus:ring-white/20"
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-white/20 text-slate-900 placeholder:text-slate-500 focus:border-white/40 focus:ring-white/20"
            />
          </div>

          <div className="mt-4 animate-fade-in-up">
            <Button
              onClick={handleSubmit}
              className="w-full py-3 bg-slate-950/90 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-900"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}