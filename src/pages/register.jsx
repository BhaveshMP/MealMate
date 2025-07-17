import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useRef } from "react";
import { insertUser, getUsers, updateUser, deleteUser, getUserById  } from "../components/Backend";
export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    insertUser(user);
    console.log("Registered user:", user);
  }


useEffect(() => {
    const testCRUD = async () => {
      console.log("/******************************/")
      // 👇 Insert
      const inserted = await insertUser({
        name: "John",
        email: "john@example.co1111m",
        password: "123",
      });
      console.log("Inserted User:", inserted);

      // 👇 Get All
      const users = await getUsers();
      console.log("All Users:", users);

      // 👇 Update
      const updated = await updateUser(65, { email: "new@example.com" });
      console.log("Updated User:", updated);

      // 👇 Delete
      const deleted = await deleteUser(68);
      console.log("Deleted User:", deleted);
      
      const user  = await getUserById(69);
      console.log(" User:", user);

    };

    // testCRUD();
  }, []);

    // 🔜 Send `user` to Supabase or your backend API

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg"
      >
        {/* Name */}
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Full Name
          </Label>
          <TextInput
            id="name"
            placeholder="John Doe"
            ref={nameRef}
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <TextInput
            id="email"
            type="email"
            placeholder="you@example.com"
            ref={emailRef}
            required
          />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="mb-2 block">
            Password
          </Label>
          <TextInput
            id="password"
            type="password"
            placeholder="••••••••"
            ref={passwordRef}
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
