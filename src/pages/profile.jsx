import { Card } from "flowbite-react"
import { useEffect, useState } from "react"

function Profile(){

    const [user, setUser] = useState({});

    useEffect( () => {
      const activeUser = sessionStorage.getItem("activeUser");
      setUser(JSON.parse(activeUser));
    }, [])

    
    return(
    <Card className="max-w-sm mx-auto mt-40 ">
      <div className="flex flex-col items-center py-8  bg-gray-500/15 dark:bg-transparent">
        <img
          alt="User profile"
          height="96"
          width="96"
          src="data:image/jpeg;base64,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"
          className="mb-3 rounded-full shadow-lg"
        />
        <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white shadow-4xl ">
          {user.name}
        </h5>
        <span className="text-m text-gray-500 dark:text-gray-400">
          Employee ID: {user.employeeId}
        </span>
        <span className="text-m text-gray-500 dark:text-gray-400">
          Email: {user.email}
        </span>
        <span className="text-m text-gray-500 dark:text-gray-400">
          Total Meals: {user.totalMeals}
        </span>
      </div>
    </Card>
    )
}
export default Profile