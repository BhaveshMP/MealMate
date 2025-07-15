import { useEffect, useRef } from "react"
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {insertUser} from "../components/InsertUser"
const Login = () =>{

    useEffect( () => {
        insertUser();
    }, [])
    const email = useRef();
    const password = useRef();


    const onSubmit = (e) => {
        e.preventDefault() // Stop page reload

     const email1 = email.current?.value
    const pass1 = password.current?.value

    console.log("Username:", email1)
    console.log("Password:", pass1)
        
    }

    return(
        <>
        <div className="flex justify-center">

        <div className="border bg-slate-500 p-4 w-1/3 my-32 rounded-md">

             <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="email1">Your email</Label>
                    </div>
                    <TextInput ref={email} id="email1" type="email" placeholder="name@flowbite.com" required />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="password1">Your password</Label>
                    </div>
                    <TextInput ref={password} id="password1" type="password" required />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button type="submit" onClick={onSubmit}>Submit</Button>
                </form>
        </div>
        
        </div>
        </>
    )
}

export default Login