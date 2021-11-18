import { Grid } from '@mui/material';
import styled from 'styled-components';

export const Logo = styled.h1`
  color: ${({ theme }) => theme.palette.primary.main};
`;
export const MenuStack = styled(Grid)`
  box-shadow: ${({ theme }) => theme.shadows[2]};
  background-color: ${({ theme }) => theme.palette.background.light};
  padding: 10px  !important;
  margin-bottom: 15px;
`;
export const LogoStack = styled(Grid)`
  width: 100%;
  padding-left: 40px;
`;
export const MenuItems = styled(Grid)`
`;
export const RightSide = styled(Grid)``;

