import React from 'react'
import Table from "@/components/common/Table"
import { useState, useEffect } from 'react'
import MenuForm from './components/MenuForm'
import { Button } from "flowbite-react";
import MenuItems from './components/MenuItems';
export default function Menu() {
    const [openModal, setOpenModal] = useState(false);
    const [updateInfo, setUpdateInfo] = useState();
    
    const closeForm =() => {
      setOpenModal(!openModal)
      setUpdateInfo(null);
    }
  
  return (
    <div>
            <Button onClick={() => closeForm()}>+</Button>
        <MenuForm openForm={openModal} setOpenForm={setOpenModal} updateInfo={updateInfo}/>
        {/* <Table title={"Menu"} tableName={"menu"}/> */}
        <MenuItems setUpdateInfo={setUpdateInfo} setOpenModel={setOpenModal}></MenuItems>

    </div>
  )
}
