import React from 'react'
import Table from "@/components/common/Table"
import { useState } from 'react'
import UserForm from './components/UserForm'
import { Button } from "flowbite-react";
export default function User() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpenModal(!openModal)}>+</Button>
        <UserForm openForm={openModal} setOpenForm={setOpenModal}/>
        <Table title={"User"} tableName={"users"}/>
      
    
    </div>
  )
}
