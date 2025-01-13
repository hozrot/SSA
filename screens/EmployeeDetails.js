

import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PersonList from "../component/PersonList";

const data = [
  { id: 1, title: 'Name 1' ,Date: "12/12/2024" },
  { id: 2, title: 'Name 2' ,office:'Dhaka'},
  { id: 3, title: 'Name 3' },
  { id: 4, title: 'Name 4' },
  { id: 5, title: 'Name 5' },
  { id: 6, title: 'Name 6' },
  // ... more items
];

export default function EmployeeDetails() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <PersonList
          name={item.title}
          designation={item.Date}
          office={item.office}
         />
          // <View style={styles.item}>
          //   <Text>{item.title}</Text>
          //   <Text>Join Date:  {item.Date}</Text>
          // </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 8,
  },
});