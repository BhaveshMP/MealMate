
"use client";
import { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { handleImageUpload, handleImageUpadate } from "@/components/common/ImageUploadForm";
import { Label, TextInput, Textarea, Checkbox, Select, Button } from "flowbite-react";
import { insertData, updateData } from "@/components/backend/Backend";
import ImageUploadForm from "@/components/common/ImageUploadForm";
 const MenuForm = ({openForm, setOpenForm, updateInfo}) =>{
  const [selectedFile, setSelectedFile] = useState(null);

    const defaultData = {
        id: undefined,
        name : "",
        description: "",
        price: 0,
        available: true,
        veg: true,
        specialDish: false,
        imageUrl: "", //
        imageName: "",
    }
    const [formData, setFormData] = useState(defaultData);

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };


const handleSubmit = async (e) => {

  e.preventDefault();
  
  if(!formData.id){

    try {
      const newItem = await handleImageUpload(selectedFile, formData);
      
      await insertData("menu", newItem);
      console.log("Inserted:", newItem);
      setOpenForm(false);
    } catch (error) {
      alert(error.message);
    }
  }else{
    const updatedFormData = await handleImageUpadate(selectedFile, formData);
    await updateData("menu", formData.id, updatedFormData)
    setOpenForm(false);
  }
};


    useEffect(() => {
      if (updateInfo) {
        setFormData(updateInfo);
      } else {
        setFormData(defaultData);
      }
    }, [updateInfo, openForm]);

    

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

                  { formData.id &&
            <div>
              <Label htmlFor="name" className=" block">Id</Label>
              <TextInput
                id="id"
                name="id"
                placeholder="id"
                type="number"
                value={formData.id}
                onChange={handleChange}
                readOnly
                />
            </div>
          }
        <div>
          <Label htmlFor="name" className=" block">Name</Label>
          <TextInput
            id="name"
            name="name"
            placeholder="Paneer Butter Masala"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className=" block">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Delicious cottage cheese in butter gravy..."
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        {/* <div>
          <Label htmlFor="price" className=" block">Price (₹)</Label>
          <TextInput
            id="price"
            name="price"
            type="number"
            placeholder="120"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* Available */}
        <div className="flex formDatas-center gap-2">
          <Checkbox
            id="available"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          <Label htmlFor="available">Available</Label>
        </div>

        {/* Veg / Non-Veg */}
        <div>
          <Label htmlFor="veg" className=" block">Type</Label>
          <Select
            id="veg"
            name="veg"
            value={formData.veg ? "true" : "false"}
            onChange={(e) => setFormData((prev) => ({ ...prev, veg: e.target.value === "true" }))}
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
            checked={formData.specialDish}
            onChange={handleChange}
          />
          <Label htmlFor="specialDish">Mark as Special Dish</Label>
        </div>

        <div className="flex items-center gap-2">
           

      <ImageUploadForm value={formData.imageUrl} onFileSelect={setSelectedFile} />
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