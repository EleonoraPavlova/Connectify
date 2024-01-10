import React from 'react';
import s from './index.module.scss';
import { UserFoto } from "../UserFoto/UserFoto";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";


export const UsersInfo = () => {
  return (<Box className={`${s.user} flex-start`}>
    < UserFoto link={"https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg"} additionalClass="" />
    <ul>
      <li className={s.user__item}>
        <Typography variant="h4" className="user__name">Eleonora P. </Typography>
      </li>
      <li className={s.user__item}>
        <Typography sx={{ paddingRight: "8px" }}>
          <span style={{ fontWeight: 'bold' }}>Date of Birth: </span>  18 August </Typography>
      </li>
      <li className={s.user__item}>
        <Typography sx={{ paddingRight: "8px" }}>
          <span style={{ fontWeight: 'bold' }}>City: </span>  Kyiv </Typography>
      </li>
      <li className={s.user__item}>
        <Typography sx={{ paddingRight: "8px" }}>
          <span style={{ fontWeight: 'bold' }}>Education: </span> Marine Academy </Typography>
      </li>
      <li className={s.user__item}>
        <Typography sx={{ paddingRight: "8px" }}><span style={{ fontWeight: 'bold' }}>Git: </span>
          <NavLink className={s.user__link} to="https://github.com/EleonoraPavlova?tab=repositories"> tap
          </NavLink>
        </Typography>
      </li>
    </ul>
  </Box >)
}