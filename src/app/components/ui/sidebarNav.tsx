"use client"
import { IconBuildingCommunity, IconHomeFilled, IconPlayerEjectFilled, IconSettingsFilled } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'


function SidebarNav() {


   const router= useRouter()

    return (
        <div className="w-full h-[300px]  font-Roboto Flex font-semibold  ">
    <ul className=" text-xl text-white p-[5vh]">
       
                <li className="flex items-center bg-black rounded-[38px] w-3/5 h-[60px] mt-3 text-xl " onClick={()=>{
                   router.push("/")
                }} >
                <IconHomeFilled className='mr-2 ml-2'></IconHomeFilled>
                  Feed
                </li>
                <li className="flex items-center bg-black rounded-[38px] w-3/5 h-[60px] mt-3 text-xl "onClick={()=>{
                   router.push("/user")
                }}  >
             <IconBuildingCommunity className='mr-2 ml-2' ></IconBuildingCommunity>
                communities
                </li>
                <li className="flex items-center bg-black rounded-[38px] w-3/5 h-[60px] mt-3 text-xl " onClick={()=>{
                   router.push("/user")
                }}  >
                <IconPlayerEjectFilled className='mr-2 ml-2'>
                </IconPlayerEjectFilled>
                 Comments
                </li>
                <li className="flex items-center bg-black rounded-[38px] w-3/5 h-[60px] mt-3 text-xl " onClick={()=>{
                   router.push("/user")
                }} >
                <IconSettingsFilled className='mr-2 ml-2'></IconSettingsFilled>
                  Settings
                </li>
        </ul>
  </div>
    )
}

export default SidebarNav
