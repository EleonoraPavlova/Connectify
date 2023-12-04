import React from 'react';

type UserContactsType = {
  icon: string
  href: string
}

export const UserContacts: React.FC<UserContactsType> = ({ icon, href }) => {
  return (
    <li className={"modal__data-contacts"} >
      <a href={href} rel="noreferrer" target="_blank">
        <img src={icon} className="modal__data-icon" alt={icon} />
      </a>
    </li>
  )
}