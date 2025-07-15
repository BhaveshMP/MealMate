import { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { insertUser } from "../components/InsertUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Email:", email);
    console.log("Password:", password);


    // 🔜 Call your Supabase auth or login API here
  };

  return (
    <div className="flex justify-center">
      <div className="border bg-slate-500 p-6 w-1/3 my-32 rounded-md">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <Label htmlFor="email1" className="mb-2 block">
              Your email
            </Label>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password1" className="mb-2 block">
              Your password
            </Label>
            <TextInput
              id="password1"
              type="password"
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
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
