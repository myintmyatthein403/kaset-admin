import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/src/common/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/common/components/ui/drawer"


interface DrawerProps {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (val: boolean) => void
}

export function CustomDrawer({
  title,
  subTitle,
  children,
  open,
  onOpenChange
}: DrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline"><Plus /></Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm md:max-w-full h-screen mb-15 overflow-auto">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{subTitle}</DrawerDescription>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
