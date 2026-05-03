import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../../../common/components/button";
import { Input } from "../../../common/components/input";
import { useNavigate } from 'react-router-dom'
export default function Login() {
	const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    const res = await loginUser(form);
    login(res.data);
	navigate('/dashboard')
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 space-y-4">
        <Input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
}