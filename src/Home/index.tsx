import React from "react";
import { useState } from 'react';
import { FlatList } from 'react-native';

import { EXPENSES } from '../utils/expenses';

import { Card, CardProps } from '../components/Card';
import { Header, MonthsProps } from '../components/Header';

import { Container } from './styles';

export function Home() {
  const [month, setMonth] = useState<MonthsProps>("Janeiro");

  return (
    <Container>
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
            selected={false}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
