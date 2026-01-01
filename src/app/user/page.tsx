"use client"

import JoinCard from '../components/ui/JoinCard'
import User from '../components/ui/user'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function Page() {
      const [Community,setcom]=useState<any>([])
    const curentuser= async function () {
        try {
          const respone= await axios.get("http://localhost:3000/api/user/currentuser");
          console.log(respone.data.data._id)
          const id= respone.data.data._id
          const resp2= await axios.post("http://localhost:3000/api/communities/followedCommunity",{
             userId:id
          })
          console.log(resp2.data.com)
          setcom(resp2.data.com)
        
           
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=>{
      curentuser()
    },[])


    return (
        <div className="w-full flex flex-col items-center text-white mt-10 gap-8 px-2 sm:px-4 md:px-8">
            <div className="w-full max-w-xl bg-neutral-950 rounded-[38px] shadow-sm p-4 shadow-white transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white flex flex-col items-center">
                <User />
            </div>
            <div className="w-full max-w-xl bg-neutral-950 rounded-[38px] shadow-sm p-4 shadow-white transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white flex flex-col items-center">
                <h1 className="text-center text-2xl">Community</h1>
                {Community.map((item: any) => (
                    <JoinCard head={item.name} main={item.name} bol={true} key={item._id} />
                ))}
            </div>
            <div className="w-full max-w-xl bg-neutral-950 rounded-[38px] shadow-sm p-4 shadow-white transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white flex flex-col items-center">
                <h1 className="text-center text-2xl">Comments</h1>
                <JoinCard head='fnsdkfnfs' main='ahasikhnas' bol={true} />
            </div>
            <div className="w-full max-w-xl bg-neutral-950 flex flex-col items-center text-xl font-Roboto Flex font-bold rounded-[38px] shadow-sm p-4 shadow-white transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white mb-5">
                <h1 className="text-center text-2xl">Setting</h1>
                <div className="w-full text-center mt-5"><button>Change password</button></div>
                <div className="w-full text-center mt-5"><button>Change Gender</button></div>
                <div className="w-full text-center mt-5"><button>Logout</button></div>
            </div>
        </div>
    )
}

export default Page
