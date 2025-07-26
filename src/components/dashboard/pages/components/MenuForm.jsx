
"use client";
import { useState, useRef } from "react";
import { MdClose } from "react-icons/md";
import { Label, TextInput, Textarea, Checkbox, Select, Button } from "flowbite-react";
import { insertData } from "@/components/backend/Backend";
import ImageUploadForm from "@/components/common/ImageUploadForm";
 const MenuForm = ({openForm, setOpenForm}) =>{
const [uploadTriggerCount, setUploadTriggerCount] = useState(0);

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


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setUploadTriggerCount((prev) => prev + 1);  
        
        insertData("menu", item);
        console.log(item)
    }

    const handleImageUpload = (url, fileName) => {
      setItem((prev) => ({ ...prev, imageUrl: url, imageName:fileName }));
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
           <ImageUploadForm folder="avatars" onUpload={handleImageUpload} />
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