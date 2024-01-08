import React from 'react';
import './index.scss';
import { UsersAll } from "src/common/UsersComponents/UsersAll/UsersAll";
import { useAppSelector } from "src/state/hooks/hooks-selectors";
import { RequestStatusType } from "src/state/reducers/app-reducer/app-reducer";
import { styled } from '@mui/system';


export const Friends = () => {
  let status = useAppSelector<RequestStatusType>(state => state.app.status)

  const StyledTypography = styled('h3')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#c2c5cc",
    fontFamily: 'Handlee, sans-serif',
  });

  if (status === "failed") {
    return (<StyledTypography>
      You're not authorization
    </StyledTypography>
    )
  }

  return (<UsersAll friend={true} btnTextInfo="Message" />)
}