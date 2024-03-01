import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

type NavlinkProps = {
  url: string
  children: React.ReactNode
  additionalClasses: string
  additionalClassesLink: any
}

export const Navlink: React.FC<NavlinkProps> = ({ url, children, additionalClasses, additionalClassesLink }) => {
  return (
    <li className={additionalClasses}>
      <Link to={url} className={additionalClassesLink}>
        {children}
      </Link>
    </li>
  )
}
