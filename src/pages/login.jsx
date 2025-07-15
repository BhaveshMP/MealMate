import { useRef } from "react"

const Login = () =>{

    const username = useRef();
    const password = useRef();

    const onSubmit = (e) => {
         e.preventDefault() // Stop page reload

     const user = username.current?.value
    const pass = password.current?.value

    console.log("Username:", user)
    console.log("Password:", pass)
        
    }

    return(
        <>
            <form className="flex flex-col bg-gray-600 p-4">

                <div>

                <label>Username: </label>
                <input type="text" ref={username} />
                </div>
                <div>

                <label>Password: </label>
                <input type="text" ref={password}/>
            </div>
<div>

                <input type="submit" onClick={onSubmit} value="Submit"/>
</div>

            </form>
        
        </>
    )
}

export default Login