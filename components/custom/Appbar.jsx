
import {
               Sidebar,
               SidebarContent,
               SidebarFooter,
               SidebarGroup,
               SidebarHeader,
             } from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "../ui/button"
import { MessageCircleCode } from "lucide-react"
import ChatHistory from "./ChatHistory"
import SideFooter from "./SideFooter"

const Appbar = () => {
  return (
               <Sidebar >
               <SidebarHeader>
                               <Image width={85} height={5} src={"/logo.jpeg"} alt='not showing'/>
                            
               </SidebarHeader>
               <SidebarContent className = "p-2">
                 <SidebarGroup>
                              <Button>
                                             <MessageCircleCode/>
                                             Start new Chat

                              </Button>
                 </SidebarGroup>
                 <SidebarGroup>
                              <ChatHistory/>
                 </SidebarGroup>
               </SidebarContent>
               <SidebarFooter>
                              <SideFooter/>
               </SidebarFooter>
             </Sidebar>
  )
}

export default Appbar