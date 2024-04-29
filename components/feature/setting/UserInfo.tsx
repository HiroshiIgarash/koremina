import Avatar from '@/components/Avatar'
import SignOutButton from '@/components/SignOutButton'
import { SquarePen } from 'lucide-react'
import React from 'react'
import ChangeNicknameDialog from './ChangeNicknameDialog'
import getCurrentUser from '@/app/action/getCurrentUser'

const UserInfo = async () => {

  const currentUser = await getCurrentUser()

  return (
    <div className="flex items-center gap-2">
      <Avatar user={currentUser} size={48} />
      <span>{currentUser?.nickname}</span>
      <ChangeNicknameDialog user={currentUser}>
        <SquarePen size='1em' />
      </ChangeNicknameDialog>
      <div className="ml-8">
        <SignOutButton />
      </div>
    </div>
  )
}

export default UserInfo