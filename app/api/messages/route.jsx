import { NextResponse } from "next/server"
import prisma from "@/prisma/prismaclient"

export const POST =async(req) =>{
               try{
                              const {id , input} = await req.json()
                              console.log(input)
                            
                              const msg = await prisma.messages.create({
                                             data:{
                                              message:[
                                               { role:"user" , 
                                                 content:input
                                               }
                                              ] ,
                                              userId : id
                                             }
                                             
                                           })
                                           if(msg){
                                             return NextResponse.json({
                                                            msg:msg

                                             },{
                                                            status:200
                                             })
                                           }
                                           else{
                                             return NextResponse.json({
                                                            msg:"the chat was not created "
                                             })
                                           }
               }catch(err){
                console.log(err)
                              return NextResponse.json({
                                             msg:"something went wrong" , 
                                             err:err
                              } , {
                                             status:408
                              })
               }
}