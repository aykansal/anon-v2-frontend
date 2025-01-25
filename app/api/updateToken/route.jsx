import prisma from "@/prisma/prismaclient"
import { NextResponse } from "next/server"

export const POST = async(req)=>{
               const {token , id} = await req.json()

               try{
                              const deductedToken =await  prisma.users.update({
                                             where:{
                                                            id:id
                                             },
                                             data:{
                                                            token:token
                                             }
                              })

                              return NextResponse.json({
                                             msg:"token deducted",
                                             deductedToken

                              })

               }catch(err){
                              console.log(err)
                              return NextResponse.json({
                                             msg:"something went wrong"
                              } ,{
                                             status:408
                              })
               }
}