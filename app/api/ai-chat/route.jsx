import { chatSession } from "@/configs/AiModel"
import { NextResponse } from "next/server"

export const POST = async(req) =>{

               const {prompt} = await req.json()
               try{
                              const result = await chatSession.sendMessage(prompt)
                              const resp = result.response.text()
                              return NextResponse.json({
                                             res : resp
                              })
               }catch(err){
                              console.log(err)
                              return NextResponse.json({
                                             msg:"something went wrong"
                              })
               }
}
