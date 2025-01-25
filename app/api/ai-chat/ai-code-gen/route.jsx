import { GenAiCode } from "@/configs/AiModel"
import { NextResponse } from "next/server"

export const POST =async(req)=>{
               const prompt = await req.json()
               console.log(prompt)
               try{
                              const result = await GenAiCode.sendMessage(prompt.prompt)
                              const resp = result.response.text()
                              return NextResponse.json(JSON.parse(resp))

               }catch(err){
                              console.log(err)
                              return NextResponse.json({
                                             msg:"something went wrong"
                              })
}
}