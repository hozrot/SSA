import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
// need to import MenuCard Template like bellow
import MenuCard from "../component/MenuCard";
import BalanceCard from "../component/BalanceCard";
import { db } from '../config';
import { ref, onValue } from 'firebase/database';

export default function Dashboard({ navigation }) {

  const [totalLoanAmount, setTotalLoanAmount] = useState([])
  const [totalSaveAmount, setTotalSaveAmount] = useState([])
  const [totalChargeAmount, setTotalChargeAmount] = useState([])
  const [totalLoanGiven, setTotalLoanGiven] = useState([])

  useEffect(() => {
    const dataLink = ref(db, 'CollectionLoan/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      if (data) { 
        const totalLoanAmount = Object.values(data).reduce((total, loan) => {
          return total + (loan.loanamount || 0); 
        }, 0);
        setTotalLoanAmount(totalLoanAmount); 
      } else {
        setTotalLoanAmount(0); 
      }
    });
  }, []);
  useEffect(() => {
    const dataLink = ref(db, 'CollectionSavings/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      if (data) { 
        const totalSaveAmount = Object.values(data).reduce((total, savings) => {
          return total + (savings.savingsamount || 0); 
        }, 0);
        setTotalSaveAmount(totalSaveAmount); 
      } else {
        setTotalSaveAmount(0); 
      }
    });
  }, []);
  useEffect(() => {
    const dataLink = ref(db, 'CollectionCharges/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      if (data) { 
        const totalSaveAmount = Object.values(data).reduce((total, savings) => {
          return total + (savings.chargeamount || 0); 
        }, 0);
        setTotalChargeAmount(totalSaveAmount); 
      } else {
        setTotalChargeAmount(0); 
      }
    });
  }, []);
  useEffect(() => {
    const dataLink = ref(db, 'WithdrawLoan/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      if (data) { 
        const totalLoanGiven = Object.values(data).reduce((total, loan) => {
          return total + (loan.savingsamount || 0); 
        }, 0);
        setTotalLoanGiven(totalLoanGiven); 
      } else {
        setTotalLoanGiven(0); 
      }
    });
  }, []);
  
  return (
    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: "center", backgroundColor: 'green',paddingTop:20 }}>
      {/* <Text> Total Collection : 1,50,000,000</Text>
        <Text> Total Paid : 1,10,500 </Text>
        <Text> Total Pending : 18,50,000 </Text>
        <Text> Total Asset : 5,000,000,000</Text> */}
      <View style={styles.HeaderView}>
                <Text
                  style={{
                    fontFamily: "DMSans_500Bold",
                    fontSize: 18,
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  {"সুন্দরগঞ্জ দোকান মালিক ব্যাবসায় সমবায় সমিতি"}
                  {" "}
                </Text>
                <Text  style={{
                    fontFamily: "DMSans_500Bold",
                    
                    textAlign: 'center',
                    color: 'white',
                  }}> সুন্দরগঞ্জ , গাইবান্ধা ।   </Text>
      </View>
      

       <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                
              }}
            >
              <BalanceCard
                balanceTitle={"Loan"}
                iconName={"arrow-down-bold-hexagon-outline"}
                iconColor={"white"}
             //   balance={totalSavingsCollection+'৳'}
              />
              <BalanceCard
                balanceTitle={" Withdrawn"}
                iconName={"arrow-up-bold-hexagon-outline"}
                iconColor={"white"}
                //onPress={()=>navigation.navigate("DayTransaction")}
                //balance={totalSavingsWithdraw+'৳'}
              />
               <BalanceCard
                balanceTitle={" Balance"}
                iconName={"hexagon-slice-6"}
                iconColor={"white"}
                //onPress={()=>navigation.navigate("DayTransaction")}
                //balance={totalSavingsCollection-totalSavingsWithdraw+'৳'}
              />
       </View>
      
        <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      flex: .15,
                      paddingBottom: 15,
                     
                    }}
                  >
                    <BalanceCard
                      balanceTitle={"Savings"}
                      iconName={"arrow-down-bold-hexagon-outline"}
                      iconColor={"white"}
                      //balance={totalSavingsCollection+'৳'}
                    />
                    <BalanceCard
                      balanceTitle={" Withdrawn"}
                      iconName={"arrow-up-bold-hexagon-outline"}
                      iconColor={"white"}
                      //onPress={()=>navigation.navigate("DayTransaction")}
                     // balance={totalSavingsWithdraw+'৳'}
                    />
                     <BalanceCard
                      balanceTitle={" Balance"}
                      iconName={"hexagon-slice-6"}
                      iconColor={"white"}
                      //onPress={()=>navigation.navigate("DayTransaction")}
                     // balance={totalSavingsCollection-totalSavingsWithdraw+'৳'}
                    />
        </View>
     
      <View style={{ flex: .25, justifyContent: "center", alignItems: "center", flexDirection: 'row',paddingBottom:10 }}>
        {/* <MenuCard
          menuTitle={"Employee Details"}
          iconName={"human-queue"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("EmployeeDetails")}
        /> */}
        <MenuCard
          menuTitle={"Member List"}
          iconName={"text-box-multiple"}
          iconSize={60}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("MemberList")}
          
        />
        <MenuCard
          menuTitle={"Transactions"}
          iconName={"currency-try"}
          iconSize={60}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("MyTransaction")}
        />
      </View>
      <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flex: .15,
                
                padding: 30,
              }}
            >
              {/* <BalanceCard
                balanceTitle={"Expense"}
                iconName={"arrow-down-bold-hexagon-outline"}
                iconColor={"white"}
             //   balance={totalSavingsCollection+'৳'}
              /> */}
              
               <BalanceCard
                balanceTitle={" Balance Sheet"}
                iconName={"google-spreadsheet"}
                iconColor={"white"}
                iconSize={60}
                onPress={() => navigation.navigate("BalanceSheet")}
                //onPress={()=>navigation.navigate("DayTransaction")}
                //balance={totalSavingsCollection-totalSavingsWithdraw+'৳'}
              />
       </View>
      
      {/* <View style={{ flex: .20, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <MenuCard
          menuTitle={"Balancesheet"}
          iconName={"note"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("BalanceSheet")}
        />
        <MenuCard
          menuTitle={"Summary"}
          iconName={"stack-exchange"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("Summary")}
        />
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    flex: 0.10,
    padding: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    
  },
});
