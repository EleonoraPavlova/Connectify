import React from 'react';
import './index.scss';
import { UsersAll } from "src/common/UsersAll/UsersAll";


export const Friends = () => {
  return (
    <UsersAll friend={true} btnTextInfo="Message" />
  )
}