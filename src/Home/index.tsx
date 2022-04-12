import React, { useEffect, useState } from "react";
import { FlatList } from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';

import { EXPENSES } from '../utils/expenses';

import { Card, CardProps } from '../components/Card';
import { Header, MonthsProps } from '../components/Header';

import { Container, Chart } from './styles';

export function Home() {
  const [selected, setSelected] = useState("");
  const [month, setMonth] = useState<MonthsProps>("Janeiro");
  const [data, setData] = useState<CardProps[]>([]);

  function handleCardOnPress(id: string) {
    setSelected(prev => prev === id ? "" : id);
  }


  useEffect(() => {
    setData(EXPENSES[month]);
  }, [month]);

  return (
    <Container>
      <Header
        onValueChange={setMonth}
        selectedValue={month}
      />

      <Chart>
        <VictoryPie
          data={data}
          x="label"
          y="value"
          colorScale={data.map(expense => expense.color)}
          innerRadius={80}
          padAngle={3}
          animate={{
            easing: "bounce"
          }}
          style={{
            labels: {
              fill: '#FFF'
            },
            data: {
              fillOpacity: ({ datum }) => (datum.id === selected || selected === "") ? 1 : 0.3,
              stroke: ({ datum }) => datum.id === selected ? datum.color : 'none',
              strokeOpacity: 0.5,
              strokeWidth: 10
            }
          }}
          labelComponent={
            <VictoryTooltip
              renderInPortal={false}
              flyoutStyle={{
                stroke: 0,
                fill: ({ datum }) => datum.color
              }}

            />
          }
        />
      </Chart>

      <FlatList
        data={EXPENSES[month]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={false}
            onPress={() => handleCardOnPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
