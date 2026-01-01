'use client'

import { IconPlus, IconSpeakerphone, IconUserFilled } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function Volunteer() {
    const router = useRouter()

    const handleCreatePost = () => {
        router.push('/post')
    }

    return (
        <div className="w-full font-mono mt-6 font-Roboto Flex font-semibold ">
            <h1 className='text-xl font-thin opacity-50 text-white border-spacing-x-4 px-[5vh]"" mt-5'> Community</h1>
            <ul className="text-xl text-white px-[5vh] text-wrap">
                <li 
                    className="flex items-center bg-black rounded-[38px] w-3/5 h-[60px] text-xl mt-6 cursor-pointer hover:bg-opacity-80 transition-colors"
                    onClick={handleCreatePost}
                >
                    <IconPlus className="ml-4 mr-2" />
                    Create
                </li>
                <li className="flex items-center bg-black rounded-[38px] w-3/5 h-[60px] mt-6 text-xl">
                    <IconUserFilled className="ml-4 mr-2" />
                    Member
                </li>
                <li className="flex items-center bg-black rounded-[38px] w-3/5 h-[60px] mt-6 text-xl">
                    <IconSpeakerphone className="ml-4 mr-2" />
                    awareness
                </li>
            </ul>
        </div>
    )
}

export default Volunteer
