
"use client";
import { useState, useRef } from "react";
import { Label, TextInput, Textarea, Checkbox, Select, Button } from "flowbite-react";
import { insertData } from "../../../backend/Backend";
import ImageUploadForm from "../../../common/ImageUploadForm";
 const Menu = () =>{

  const imageRef = useRef();
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

    const handleImageUpload = (url, fileName) => {
      setItem((prev) => ({ ...prev, imageUrl: url, imageName:fileName }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
            if (imageRef.current) {
            await imageRef.current.handleUpload(); // calls the child's function
          }
          insertData("menu", item);
        console.log(item)
    }
    return(
        <>

<div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">Add Menu Item</h2>

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
           <ImageUploadForm ref={imageRef} folder="avatars" onUpload={handleImageUpload} />
        </div>


        {/* Submit */}
        <Button type="submit">Save Item</Button>
      </form>
    </div>

        </>
    )
}

export default Menu