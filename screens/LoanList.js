
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';
import BalanceCard from '../component/BalanceCard';

const data = [
  { id: 1, title: 'Name 1', Date: "12/12/2024" },
  { id: 2, title: 'Name 2', office: 'Dhaka' },
  { id: 3, title: 'Name 3', type: "Given" },
  { id: 4, title: 'Name 4' },
  { id: 5, title: 'Name 5' },
  { id: 6, title: 'Name 6' },
  // ... more items
];
export default function LoanList() {
  const [loneList, setLoanList] = useState([])


  useEffect(() => {
    const dataLink = ref(db, 'loanCollection/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      const allLoan = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setLoanList(allLoan);

    });
  }, [])
  return (
    <ScrollView style={styles.container}>
      

        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
                balanceTitle={"Collected Loan"}
                iconName={"briefcase-search-outline"}
      
                iconColor={"white"}
                balance={45 }
              />
               <BalanceCard
                balanceTitle={"Given Loan"}
                iconName={"briefcase-search-outline"}
                iconColor={"white"}
                balance={45 }
              />
      </View>
     
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListOne
            name={item.title}
            designation={item.Date}
            type={item.type}
            iconName={"arrow-split-vertical"}
            iconColor={'#8300FD'}
          />
        )}
      /> */}

      {
        loneList.map((item, index) => {
          return (
            <ListOne
              key={index}
              name={item.memberno}
              designation={item.designation}
              type={item.typeofpayment}
              date={item.timestamp}
              amount={item.loanamount}
              iconName={"arrow-split-vertical"}
              iconColor={'#8300FD'}
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