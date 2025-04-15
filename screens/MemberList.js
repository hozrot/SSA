import React, { useState, useEffect,useContext } from "react";
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
import { UserContext } from "../UserContext";
import TextInput from "../component/TextInput";
//import { ScrollView } from 'react-native-gesture-handler';


export default function MemberList({ navigation }) {
  const { user } = useContext(UserContext);
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
      })).filter(member => {
        if (user.username === 'Super Admin') {
          return true; // Show all data for 'super Admin'
        } else if (user.username === 'মোঃ জয়নাল আবেদীন') {
          return member.assingedEmployee === 'Employee1';
        } else {
          return member.assingedEmployee === 'Employee2';
        }
      });

     
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
                memberId: item.memberId,name:item.name, assingedEmployee:item.assingedEmployee
              })
            }
          >
            <Text>Name : {item.name}</Text>
            <Text>Id : {item.memberId}</Text>
            <Text>Company : {item.company}</Text>
            <Text>Mobile : {item.mobile}</Text>
            <Text>Member from : {item.timestamp}</Text>
            <Text>Assigned Employee : {item.assingedEmployee =='Employee1' ? "মোঃ জয়নাল আবেদীন" : "মোঃ রাকিবুল ইসলাম"}</Text>
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
