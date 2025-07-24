"use client"

import React from "react"
import DialogBox from "../dialog-box"
import ClientForm from "../forms/clientDetailsForm"

export default function AddClient() {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const onOpenChange = (open: boolean) => {
    setDialogOpen(open)
  }
  return (
    <DialogBox
      btnTitle="Add New Client"
      formTitle="Add New Client"
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      onOpenChange={onOpenChange}
    >
      <ClientForm setDialogOpen={setDialogOpen} />
    </DialogBox>
  )
}
