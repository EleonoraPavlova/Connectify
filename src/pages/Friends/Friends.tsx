import React from 'react';
import './index.scss';
import { UsersAll } from "src/components/UsersAll/UsersAll";


export const Friends = () => {
  return (
    <UsersAll friend={true} btnTexInfo="Message" />
  )
}