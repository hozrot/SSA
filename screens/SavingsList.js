
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';

const data = [
  { id: 1, title: 'Name 1', Date: "12/12/2024" },
  { id: 2, title: 'Name 2', office: 'Dhaka' },
  { id: 3, title: 'Name 3' },
  { id: 4, title: 'Name 4' },
  { id: 5, title: 'Name 5' },
  { id: 6, title: 'Name 6' },
  // ... more items
];
export default function SavingsList() {
  const [savingsList, setSavingsList] = useState([])


  useEffect(() => {
    const dataLink = ref(db, 'savingsCollection/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      const allSavings = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setSavingsList(allSavings);

    });
  }, [])
  return (
    <ScrollView style={styles.container}>
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListOne
            name={item.title}
            designation={item.Date}
            office={item.office}
            iconName={'bottle-tonic'}
            iconColor={'#0C0C0C'}
          />
          // <View style={styles.item}>
          //   <Text>{item.title}</Text>
          //   <Text>Join Date:  {item.Date}</Text>
          // </View>
        )}
      /> */}

      {
        savingsList.map((item, index) => {
          return (
            <ListOne
              key={index}
              name={item.memberno}
              designation={item.designation}
              type={item.typeofpayment}
              date={item.timestamp}
              amount={item.savingsamount}
              iconName={'bottle-tonic'}
              iconColor={'#0C0C0C'}
            />

          )
        })
      }
    </ScrollView>
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