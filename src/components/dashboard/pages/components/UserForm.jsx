import { useState } from "react";
import { Label, TextInput, Button, Modal, Select } from "flowbite-react";
import { MdClose } from "react-icons/md";
import {insertData} from "@/components/backend/Backend"

function UserForm({openForm, setOpenForm}) {
  const [formData, setFormData] = useState({
    id: 0,
    name: "admin",
    email: "admin@gmail.com",
    created_at: "",
    password: "123",
    type: "ADMIN",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertData("users", formData)
    console.log("Form submitted:", formData);
  };
  return (
      <>
      { openForm &&

      
          <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
        
      <div className="rounded-lg w-2/5 bg-white dark:bg-gray-800 p-4 shadow-2xl shadow-black">
      

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div  className="flex flex-row justify-between">
            <h3    className="text-xl font-medium text-gray-900 dark:text-white">Add Admin</h3>
            <div><MdClose className="text-red-500" onClick={() => setOpenForm(false)} size={25}/></div>
            </div>

            <div>
              <Label htmlFor="id" value="ID" />
              <TextInput
                id="id"
                name="id"
                type="number"
                value={formData.id}
                onChange={handleChange}
                required
                />
            </div>

            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>

            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>

            <div>
              <Label htmlFor="created_at" value="Created At" />
              <TextInput
                id="created_at"
                name="created_at"
                type="date"
                value={formData.created_at}
                onChange={handleChange}
                />
            </div>

            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>

            <div>
              <Label htmlFor="type" value="User Type" />
              <Select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                >
                <option value="ADMIN">ADMIN</option>
                <option value="CHEF">CHEF</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
              </Select>
            </div>

            <div className="flex justify-center gap-2">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
      }

        </>
  );
}

export default UserForm