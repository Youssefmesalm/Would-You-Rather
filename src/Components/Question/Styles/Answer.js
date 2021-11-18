import { Stack } from '@mui/material';
import styled from 'styled-components';

export const AuthorAvatar = styled(Stack)`
border-radius:20px;
`;

export const AnswerContainer = styled(Stack)`
  justify-content: space-between;
  flex-wrap: nowrap;
    width:100%;
  background-color: rgba(209, 173, 173, 0.34);
   border-radius:20px;
`;

export const SelectedQuestion = styled(Stack)`
padding:10px 15px;
    

`;
export const AnswerOption = styled(Stack)`
  background-color: ${({ theme }) => theme.palette.background.main};
  border-radius: 20px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
  padding: 20px;
  margin-bottom: 10px;
  cursor:pointer;
`;
export const AnswerOptions = styled(Stack)`
  align-items: center;
  justify-content: flex-start;
    padding-bottom: 20px;
`;
