import styled from 'styled-components/native';

type TagProps = {
  color: string;
}

type ContainerProps = {
  selected: boolean;
  color: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  height: 80px;
  margin-bottom: 16px;

  flex-direction: row;
  align-items: center;
  background: #FFF;

  overflow: hidden;
  border: ${({ selected, color }) => selected ? `4px solid ${color}` : 'none'};
`;

export const Tag = styled.View<TagProps>`
  width: 10px;
  height: 80px;

  margin-right: 16px;
  background: ${({ color }) => color};
`;

export const Title = styled.Text`
  flex: 1;

  font-weight: bold;
  font-size: 16px;
`;

export const Amount = styled.Text`
  margin-right: 16px;
`;