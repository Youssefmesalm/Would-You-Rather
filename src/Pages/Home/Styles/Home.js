import { Grid } from '@mui/material';
import styled from 'styled-components';

export const QuestionsStack = styled(Grid)`
  min-height: 464px;
  box-shadow:${({ theme }) => theme.shadows[2]}
  background-color: ${({ theme }) => theme.palette.background.light}
  flex-wrap: wrap;
  border-radius: 20px;
  align-items:flex-start ;
  justify-content:flex-start;
  height: 100%;
  
`;

export const ContainerStack = styled(Grid)`
  max-width: 100vw;
  height: 100%;
  flex-wrap: wrap;
  padding;0 20px !important;
  border-radius: 20px;
  align-items: flex-start;
`;
export const AnswerStack = styled(Grid)`
  height: 100%;
  flex-wrap: wrap;
width:100%;
  border-radius: 20px;
  align-items: flex-start;
  padding: 19px 17px;
`;
