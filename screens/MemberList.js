import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView ,TouchableOpacity} from 'react-native';
import BalanceCard from '../component/BalanceCard';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';
//import { ScrollView } from 'react-native-gesture-handler';

const data = [
  { id: 1, title: 'Name 1', Amount: "25,000 Taka", saving: 850 },
  { id: 2, title: 'Name 2' },
  { id: 3, title: 'Name 3' },
  { id: 4, title: 'Name 4' },
  { id: 5, title: 'Name 5' },
  { id: 6, title: 'Name 6' },
  // ... more items
];

export default function MemberList( {navigation} ) {
  const [memberList, setMemberList] = useState([])
  const [memberCount, setMemberCount] = useState([])

  useEffect(() => {
    const dataLink = ref(db, 'member/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      const allmember = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setMemberList(allmember);
      setMemberCount(allmember.length);
    });
  }, [])
  return (
    <ScrollView style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
          balanceTitle={"Total Member Registered "}
          iconName={"briefcase-search-outline"}

          iconColor={"white"}
          balance={memberCount}
        />
        {/* <BalanceCard
          balanceTitle={"Loan "}
          iconName={"briefcase-search-outline"}

          iconColor={"white"}
          balance={memberCount}
        />
         <BalanceCard
          balanceTitle={"Savings"}
          iconName={"briefcase-search-outline"}

          iconColor={"white"}
          balance={memberCount}
        /> */}
      </View>

      {
        memberList.map((item, index) => {
          return (
            <TouchableOpacity style={styles.item} key={index} 
            onPress={() => navigation.navigate("MemberTransaction", { memberId: item.memberId })}>
              <Text>Name : {item.name}</Text>
              <Text>Id : {item.memberId}</Text>
              <Text>Company :  {item.company}</Text>
              <Text>Mobile :  {item.mobile}</Text>
              <Text>Member from  :  {item.timestamp}</Text>
            </TouchableOpacity>

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
    backgroundColor: 'pink',
    padding: 10,
    bottom: 8,
    marginVertical: 8,
  },
});