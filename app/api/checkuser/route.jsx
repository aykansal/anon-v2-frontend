import { NextResponse } from "next/server"
import prisma from "@/prisma/prismaclient"


export const POST = async(req)=>{
               try{
                              const {email} = await req.json()
                              console.log(email)
                              const user = await prisma.users.findFirst({
                                             where:{
                                                            email:email
                                             }
                              })   
                              console.log("found user")
                              if(user){
                                             return NextResponse.json({
                                                            user:user
                                             },{
                                                            status:200
                                             })
                              }else
                              {
                                             return NextResponse.json({
                                                            msg:"no user"
                                             },{
                                                            status:404
                                             })
                              }

               }catch(err){
                              
                              console.log(err)
                              return NextResponse.json({
                                             msg:"something went wrong" , 
                                             err:err.message
                              },{
                                             status:408
                              })
               }
}