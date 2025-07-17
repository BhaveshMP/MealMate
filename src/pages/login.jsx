import { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { getUserByEmailPassword } from "../components/Backend";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Email:", email);
    console.log("Password:", password);

 try {
      const user = await getUserByEmailPassword(email, password);
      if (user) {
        // ✅ Store user in sessionStorage
        sessionStorage.setItem("activeUser", JSON.stringify(user));
        console.log("Login successful");
        const u1 = sessionStorage.getItem("activeUser")
        console.log("44444444444444",u1)
        window.location.href = "/";
        // navigate("/"); 
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    // 🔜 Call your Supabase auth or login API here
  };

  return (
<div className="flex items-center justify-center min-h-screen ">
  <form
    onSubmit={onSubmit}
    className="max-w-md w-full flex flex-col gap-4 p-6 bg-white/10 shadow-2xl shadow-500/20 rounded-lg"
  >
    {/* Email */}
    <div>
      <Label htmlFor="email" className="mb-2 block">
        Your Email
      </Label>
      <TextInput
        id="email"
        type="email"
        placeholder="name@flowbite.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    {/* Password */}
    <div>
      <Label htmlFor="password" className="mb-2 block">
        Your Password
      </Label>
      <TextInput
        id="password"
        type="password"
        placeholder="••••••••"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    {/* Remember Me */}
    <div className="flex items-center gap-2">
      <Checkbox id="remember" />
      <Label htmlFor="remember">Remember me</Label>
    </div>

    {/* Submit Button */}
    <Button type="submit">Login</Button>
  </form>
</div>

  );
};

export default Login;
