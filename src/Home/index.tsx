import React from "react";
import { useEffect, useState } from 'react';
import { VictoryPie, VictoryTooltip, VictoryLabel } from 'victory-native';
import { FlatList } from 'react-native';

import { EXPENSES } from '../utils/expenses';

import { Card, CardProps } from '../components/Card';
import { Header, MonthsProps } from '../components/Header';

import { Container, Chart, Amount } from './styles';

export function Home() {
  const [selected, setSelected] = useState("");
  const [data, setData] = useState<CardProps[]>([]);
  const [month, setMonth] = useState<MonthsProps>("Janeiro");
  const [amount, setAmount] = useState<number>(0);


  function handleCardOnPress(id: string) {
    setSelected(prev => prev === id ? "" : id);
  }

  useEffect(() => {
    setData(EXPENSES[month]);
    setAmount(EXPENSES[month].reduce((acumulador, current) => acumulador + current.value, 0));
  }, [month]);

  return (
    <Container>
      <Chart>
          <VictoryPie
          data={data}
          x="label"
          y="value"
          colorScale={data.map(expense => expense.color)}
          innerRadius={80}
          padAngle={3}
          style={{
            labels: {
               fill: "#FFF",  
            },
            data: {
              fillOpacity: ({ datum }) =>( datum.id === selected || selected === "") ? 1 : 0.5,
              stroke: ({ datum }) => datum.id === selected ? datum.color : 'none',
              strokeOpacity: 0.5,
              strokeWidth: 10,
            }
          }}
          animate={{ duration: 2000, easing: "bounce" }}
          labelComponent={
            <VictoryTooltip 
              renderInPortal={false}
              flyoutStyle={{ 
                stroke: 0,
                fill: ({ datum }) => datum.color,
                
              }}
            />
          }
        />

        <Amount>
          {amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })
          }
        </Amount>
      </Chart>

      <Header
        onValueChange={setMonth}
        selectedValue={month}
      />

      <FlatList
        data={EXPENSES[month]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={selected === item.id}
            onPress={() => handleCardOnPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
