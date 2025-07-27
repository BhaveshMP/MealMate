import React from 'react'
import Table from "@/components/common/Table"
import { useState } from 'react'
import MenuForm from './components/MenuForm'
import { Button } from "flowbite-react";
import MenuItems from './components/MenuItems';
export default function Menu() {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
        <Button onClick={() => setOpenModal(!openModal)}>+</Button>
        <MenuForm openForm={openModal} setOpenForm={setOpenModal}/>
        {/* <Table title={"Menu"} tableName={"menu"}/> */}
        <MenuItems></MenuItems>

    </div>
  )
}
