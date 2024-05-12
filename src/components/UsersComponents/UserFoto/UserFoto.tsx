import React, { memo } from 'react'
import s from './index.module.scss'

type Props = {
  link: string | null
  additionalClass?: string
}

export const UserFoto: React.FC<Props> = memo(({ link, additionalClass }) => {
  const mocPhoto = 'https://cdn.pixabay.com/photo/2017/05/11/08/48/woman-2303361_1280.jpg'

  const combinedClass = additionalClass ? `${s.avatar} ${additionalClass}` : s.avatar

  return <img src={link ? link : mocPhoto} alt="ava" className={combinedClass} />
})
