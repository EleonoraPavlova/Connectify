import React from 'react'
import './index.scss'

type UserFotoProps = {
  link: string
  additionalClass?: string
}

export const UserFoto: React.FC<UserFotoProps> = ({ link, additionalClass }) => {
  return <img src={link} alt="avatar" className={`avatar ${additionalClass}`} />
}
