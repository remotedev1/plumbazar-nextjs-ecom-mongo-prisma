"use client";
import { View } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { convertTimestampToFormattedDate } from "@/lib/utils";
import Image from "next/image";
import Gallery from "@/components/frontend/gallery";

export function ViewDrawer({ data }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <View className="mr-2 h-4 w-4" />
          View
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>RFQ id : {data?.id}</DrawerTitle>
            <DrawerDescription>
              Created At: {convertTimestampToFormattedDate(data?.createdAt)}
            </DrawerDescription>
            <DrawerDescription>Status : {data?.status}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="w-96">
              <Gallery images={data?.images} />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
