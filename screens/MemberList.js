

import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BalanceCard from '../component/BalanceCard';

const data = [
  { id: 1, title: 'Name 1' ,Amount: "25,000 Taka", saving: 850 },
  { id: 2, title: 'Name 2' },
  { id: 3, title: 'Name 3' },
  { id: 4, title: 'Name 4' },
  { id: 5, title: 'Name 5' },
  { id: 6, title: 'Name 6' },
  // ... more items
];

export default function MemberList() {
   return (
       <View style={styles.container}>
         <View style={{  justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
                      <BalanceCard
                        balanceTitle={"Total Member"}
                        iconName={"briefcase-search-outline"}
              
                        iconColor={"white"}
                        balance={1120}
                      />
                      <BalanceCard
                        balanceTitle={"Take Loan"}
                        iconName={"briefcase-search-outline"}
              
                        iconColor={"white"}
                        balance={150}
                      />
                      </View>
         <FlatList
           data={data}
           keyExtractor={(item) => item.id.toString()} 
           renderItem={({ item }) => (
             <View style={styles.item}>
               <Text>{item.title}</Text>
               <Text>Loan Amount:  {item.Amount}</Text>
               <Text>Savings  Amount:  {item.saving}</Text>
             </View>
           )}
         />
       </View>
     );
   };
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       padding: 20,
     },
     item: {
       backgroundColor: 'pink',
       padding: 10,
       marginVertical: 8,
     },
   });