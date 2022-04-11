import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px 16px 0;

  background-color: #E1E1EF;
`;

export const Chart = styled.View`
  width: 100%;
  align-items: center;

  position: relative;
  justify-content: center;
`;

export const Amount = styled.Text`
  position: absolute;
  font-size: 22px;
  font-weight: bold;
`;