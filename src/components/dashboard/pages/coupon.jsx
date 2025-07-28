import React from 'react'
import Table from "@/components/common/Table"
import { useState, useEffect} from 'react'
import UserForm from './components/UserForm'
import { Button } from "flowbite-react";

export default function CouponPage() {
    const [openModal, setOpenModal] = useState(false);
    const [updateInfo, setUpdateInfo] = useState();
    
    const closeForm =() => {
    setOpenModal(!openModal)
    setUpdateInfo(null);
  }
  return (
    <div>
        {/* <Button onClick={() => closeForm()}>+</Button> */}
        {/* <UserForm openForm={openModal} setOpenForm={setOpenModal} updateInfo={updateInfo}/> */}
        <Table title={"Coupon"} tableName={"coupon"} setUpdateInfo={setUpdateInfo} setOpenModel={setOpenModal}/>
    </div>
  )
}
