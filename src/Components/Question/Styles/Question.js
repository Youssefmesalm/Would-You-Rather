import styled from 'styled-components';
import { Grid, Stack } from '@mui/material';
export const QuestionStack = styled(Stack)`
  max-height: 210px;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  background: ${({ bg }) => bg};
  overflow: visible;
  height: 210px;
  border-radius: 20px;
  justify-content:flex-start; 
  align-items: center;
  cursor:pointer;
  padding: 28px 6px;
`;
export const QuestionWrapper = styled(Grid)`
  width: 20%;
  padding: 0 6px;
`;
