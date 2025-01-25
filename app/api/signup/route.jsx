import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import uuid4 from 'uuid4'

const prisma = new PrismaClient()

export const POST = async(req)=>{
const {name , email , picture} = await req.json()

               const user = await prisma.users.create({
                              data:{
                                             name:name,
                                             email:email,
                                             picture:picture,
                                             uid:uuid4(),
                                             token:50000

                              }
               })
               
               console.log("this is the id of the newly generated user" , user.id)
               return NextResponse.json({msg:"user signed up " , user : user})

}