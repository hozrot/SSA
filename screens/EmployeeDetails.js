

import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PersonList from "../component/PersonList";
import BalanceCard from '../component/BalanceCard';
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

export default function EmployeeDetails( {navigation} ) {
  const [employeeList, setEmployeeList] = useState([])
  const [employeeCount, setEmployeeCount] = useState([])


  useEffect(() => {
    const dataLink = ref(db, 'employee/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      const allEmployee = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setEmployeeList(allEmployee);
      setEmployeeCount(allEmployee.length);
    });
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
          balanceTitle={"Total Employee"}
          iconName={"briefcase-search-outline"}

          iconColor={"white"}
          balance={employeeCount}
        />
        <BalanceCard
          balanceTitle={"Vacancy"}
          iconName={"briefcase-search-outline"}

          iconColor={"white"}
          balance={45 - employeeCount}
        />
      </View>

      {
        employeeList.map((item, index) => {
          return (
            <PersonList
              key={index}
              name={item.name}
              designation={item.designation}
              joindate={item.timestamp}
              mobile={item.mobile}
              onPress={() => navigation.navigate("LoanList")}
            />

          )
        })
      }

      {/* <FlatList
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
      /> */}
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