import React from 'react';
import './index.scss';
import { Link } from "react-router-dom";



type NavlinkProps = {
  url: string
  title: string
  additionalClasses: string
  additionalClassesLink: any
}


const Navlink = (props: NavlinkProps) => {
  return (<li className={props.additionalClasses}><Link to={props.url} className={props.additionalClassesLink}>{props.title}</Link></li>
  )
}

export default Navlink;