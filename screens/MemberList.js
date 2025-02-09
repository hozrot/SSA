import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BalanceCard from "../component/BalanceCard";
import { db } from "../config";
import { ref, onValue } from "firebase/database";
import TextInput from "../component/TextInput";
//import { ScrollView } from 'react-native-gesture-handler';

const data = [
  { id: 1, title: "Name 1", Amount: "25,000 Taka", saving: 850 },
  { id: 2, title: "Name 2" },
  { id: 3, title: "Name 3" },
  { id: 4, title: "Name 4" },
  { id: 5, title: "Name 5" },
  { id: 6, title: "Name 6" },
  // ... more items
];

export default function MemberList({ navigation }) {
  const [memberList, setMemberList] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [memberCount, setMemberCount] = useState([]);
  const handleSearch = (text) => {
    setSearchId(text);
  };
  const filteredMemberList = memberList.filter((member) => 
    member.memberId.toString().includes(searchId) 
  );
  useEffect(() => {
    const dataLink = ref(db, "member/");
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      const allmember = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      //.filter(member => member.assingedEmployee === "Employee1");
      setMemberList(allmember);
      setMemberCount(allmember.length);
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <BalanceCard
          balanceTitle={"Total Member Registered "}
          iconName={"account-arrow-left-outline"}
          iconSize={54}
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          alignContent: "center",
          padding: 10,
        }}
      >
        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Search Member by Id...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          style={{ fontSize: 14 }}
          value={searchId} 
        onChangeText={handleSearch} 
        />
      </View>

      {filteredMemberList.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.item}
            key={index}
            onPress={() =>
              navigation.navigate("MemberTransaction", {
                memberId: item.memberId,name:item.name
              })
            }
          >
            <Text>Name : {item.name}</Text>
            <Text>Id : {item.memberId}</Text>
            <Text>Company : {item.company}</Text>
            <Text>Mobile : {item.mobile}</Text>
            <Text>Member from : {item.timestamp}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: "pink",
    padding: 10,
    bottom: 8,
    marginVertical: 8,
  },
});
