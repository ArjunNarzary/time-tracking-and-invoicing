import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconPlus } from "@tabler/icons-react"
import React from "react"

export default function DialogBox({
  btnTitle,
  formTitle,
  dialogOpen,
  setDialogOpen,
  onOpenChange,
  children,
}: {
  btnTitle: string
  formTitle: string
  dialogOpen: boolean
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
          <IconPlus />
          <span className="hidden lg:inline">{btnTitle}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{formTitle}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
