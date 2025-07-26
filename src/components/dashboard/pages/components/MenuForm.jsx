
"use client";
import { useState, useRef } from "react";
import { MdClose } from "react-icons/md";
import {uploadImage} from "@/components/backend/ImageHandling"
import { Label, TextInput, Textarea, Checkbox, Select, Button } from "flowbite-react";
import { insertData } from "@/components/backend/Backend";
import ImageUploadForm from "@/components/common/ImageUploadForm";
 const MenuForm = ({openForm, setOpenForm}) =>{

  const [selectedFile, setSelectedFile] = useState(null);
    const [item, setItem] = useState( {
        name : "",
        description: "",
        price: 0,
        available: true,
        veg: true,
        specialDish: false,
        imageUrl: "", //
        imageName: "",
    })


      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setItem((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };


 const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Upload image if selected
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    const result = await uploadImage(selectedFile, "avatars");
    if (!result.success) {
      alert("Image upload failed!");
      return;
    }

    // 2. Add image data to form data
    const newItem = {
      ...item,
      imageUrl: result.url,
      imageName: result.fileName,
    };

    // 3. Insert into DB
    await insertData("menu", newItem);
    console.log("Inserted:", newItem);
    setOpenForm(false);
  };

    

    return(
        <>

      { openForm &&

      
          <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
        
      <div className="rounded-lg w-2/5 bg-white dark:bg-gray-800 p-4 shadow-2xl shadow-black">
      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white dark:bg-gray-800"
      >
                    <div  className="flex flex-row justify-between">
                    <h3    className="text-xl font-medium text-gray-900 dark:text-white">Add Admin</h3>
                    <div><MdClose className="text-red-500" onClick={() => setOpenForm(false)} size={25}/></div>
                    </div>
        {/* Name */}
        <div>
          <Label htmlFor="name" className="mb-2 block">Name</Label>
          <TextInput
            id="name"
            name="name"
            placeholder="Paneer Butter Masala"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="mb-2 block">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Delicious cottage cheese in butter gravy..."
            rows={3}
            value={item.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        {/* <div>
          <Label htmlFor="price" className="mb-2 block">Price (₹)</Label>
          <TextInput
            id="price"
            name="price"
            type="number"
            placeholder="120"
            value={item.price}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* Available */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="available"
            name="available"
            checked={item.available}
            onChange={handleChange}
          />
          <Label htmlFor="available">Available</Label>
        </div>

        {/* Veg / Non-Veg */}
        <div>
          <Label htmlFor="veg" className="mb-2 block">Type</Label>
          <Select
            id="veg"
            name="veg"
            value={item.veg ? "true" : "false"}
            onChange={(e) => setItem((prev) => ({ ...prev, veg: e.target.value === "true" }))}
            required
          >
            <option value="true">Veg</option>
            <option value="false">Non-Veg</option>
          </Select>
        </div>

        {/* Special Dish */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="specialDish"
            name="specialDish"
            checked={item.specialDish}
            onChange={handleChange}
          />
          <Label htmlFor="specialDish">Mark as Special Dish</Label>
        </div>

        <div className="flex items-center gap-2">
           <ImageUploadForm onFileSelect={(file) => setSelectedFile(file)} />
        </div>


        {/* Submit */}
        <Button type="submit">Save Item</Button>
      </form>
      
    </div>
    </div>
 }
        </>
    )
}

export default MenuForm