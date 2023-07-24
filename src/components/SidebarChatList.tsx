"use client"

import { chatHrefConstructor } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react'

interface SidebarChatListProps {
  sessionId: string,
  friends: User[],
}

const SidebarChatList: FC<SidebarChatListProps> = ({sessionId, friends}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>();

  useEffect(() => {
    if (pathname?.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev?.filter((msg) => !pathname.includes(msg.senderId));
      })
    }
  }, [pathname]);

  return  <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
        {friends.sort().map((friend) => {
          const unseenRequestCount = unseenMessages?.filter((unseenMsg) => {
            return unseenMsg.senderId === friend.id;
          }).length;
          return (<li key={friend.id}>
            <a href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id)}`} className='flex items-center gap-x-3 p-2 rounded-md hover:bg-gray-50 group'>
              <img src={ friend.image } className='rounded-full w-6 h-6'></img>
              <span className='text-gray-700 font-semibold text-sm group-hover:text-indigo-600'>
                { friend.name }
                { unseenMessages > 0 ? (
                    <div className='bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex just-center items-center'>{ unseenMessages }</div>
                ) : null }
              </span>
            </a>
          </li>);
        })}
    </ul>
}

export default SidebarChatList