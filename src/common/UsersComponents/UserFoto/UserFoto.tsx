import React, { memo } from 'react'
import './index.scss'

type UserFotoProps = {
  link: string
  additionalClass?: string
}

export const UserFoto: React.FC<UserFotoProps> = memo(({ link, additionalClass }) => {
  console.log('UserFoto')
  return <img src={link} alt="avatar" className={`avatar ${additionalClass}`} />
})
