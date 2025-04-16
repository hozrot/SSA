import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect,useContext } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
// need to import MenuCard Template like bellow
import MenuCard from "../component/MenuCard";
import BalanceCard from "../component/BalanceCard";
import { db } from '../config';
import { ref, onValue ,query, orderByChild, equalTo} from 'firebase/database';
import { UserContext } from '../UserContext';
import Button from "../component/Button";
import { StackActions } from "@react-navigation/native";

export default function Dashboard({ navigation }) {
 const {user} =useContext(UserContext);
 
   const [loneList, setLoanList] = useState([])
  const [totalLoanWithdraw, setTotalLoanWithdraw] = useState([])
  const [totalsavingsWithdraw, setTotalSavingsWithdraw] = useState([])
  const [totalSaveAmount, setTotalSaveAmount] = useState([])
  const [totalChargeAmount, setTotalChargeAmount] = useState([])
  const [totalLoanCollection, setTotalLoanCollection] = useState([])

  const logout = async () => {
    
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate("Login");
    setUser(null);
  }

useEffect(() => {
    const dataLink = ref(db, 'AllTransaction/');
    let employeeTransactionQuery = dataLink;
   
   if (user.username === 'Super Admin') {
    employeeTransactionQuery = query(
       dataLink,
       orderByChild('enrollmentBy') // No equalTo() to get all data
     );
   } else {
    employeeTransactionQuery = query(
       dataLink,
       orderByChild('enrollmentBy'),
       equalTo(user.username)
     );
   }
     onValue(employeeTransactionQuery, (snapshot) => { // Use the filtered query
             const data = snapshot.val();
             if (data) { // Check if data exists
               const allLoan = Object.keys(data).map(key => ({
                 id: key,
                 ...data[key]
               }))
              //  .filter(member => {
              //   if (user.username === 'Super Admin') {
              //     return true; // Show all data for 'super Admin'
              //   } else if (user.username === 'মোঃ জয়নাল আবেদীন') {
              //     return member.enrollmentBy === 'Employee1';
              //   } else {
              //     return member.enrollmentBy === 'Employee2';
              //   }
              // }); // Filter for the specific employee
               setLoanList(allLoan);
             } else {
               setLoanList([]); // Set to empty array if no loans found for the employee
             }
             if (data) { 
                 const totalAmount = Object.values(data)
                 .filter(loan => loan.enrollmentBy === user.username)
                // .filter(loan => loan.enrollmentBy === "Employee2") 
                //  .filter(member => {
                //   if (user.username === 'Super Admin') {
                //     return true; // Show all data for 'super Admin'
                //   } else {
                //     return member.enrollmentBy;
                //   }
                // })
                 .reduce((total, loan) => {
                   return total + (loan.loanWithdrawAmount || 0); 
                 }, 0);
                 setTotalLoanWithdraw(totalAmount); 
               } else {
                setTotalLoanWithdraw(0); 
               }

               if (data) { 
                const totalAmount = Object.values(data)
                .filter(member => {
                  if (user.username === 'Super Admin') {
                    return true; // Show all data for 'super Admin'
                  } else if (user.username === 'মোঃ জয়নাল আবেদীন') {
                    return member.enrollmentBy === 'Employee1';
                  } else {
                    return member.enrollmentBy === 'Employee2';
                  }
                })
                .reduce((total, loan) => {
                  return total + (loan.loanAmount || 0); 
                }, 0);
                setTotalLoanCollection(totalAmount); 
              } else {
                setTotalLoanCollection(0); 
              }

              if (data) { 
                const totalAmount = Object.values(data)
                .filter(member => {
                  if (user.username === 'Super Admin') {
                    return true; // Show all data for 'super Admin'
                  } else if (user.username === 'মোঃ জয়নাল আবেদীন') {
                    return member.enrollmentBy === 'Employee1';
                  } else {
                    return member.enrollmentBy === 'Employee2';
                  }
                })
                .reduce((total, loan) => {
                  return total + (loan.savingsAmount || 0); 
                }, 0);
                setTotalSaveAmount(totalAmount); 
              } else {
                setTotalSaveAmount(0); 
              }

              if (data) { 
                const totalAmount = Object.values(data)
                .filter(member => {
                  if (user.username === 'Super Admin') {
                    return true; // Show all data for 'super Admin'
                  } else if (user.username === 'মোঃ জয়নাল আবেদীন') {
                    return member.enrollmentBy === 'Employee1';
                  } else {
                    return member.enrollmentBy === 'Employee2';
                  }
                })
                .reduce((total, loan) => {
                  return total + (loan.savingsWithdrawAmount || 0); 
                }, 0);
                setTotalSavingsWithdraw(totalAmount); 
              } else {
                setTotalSavingsWithdraw(0); 
              }
              if (data) { 
                const totalAmount = Object.values(data)
                .filter(member => {
                  if (user.username === 'Super Admin') {
                    return true; // Show all data for 'super Admin'
                  } else if (user.username === 'মোঃ জয়নাল আবেদীন') {
                    return member.enrollmentBy === 'Employee1';
                  } else {
                    return member.enrollmentBy === 'Employee2';
                  }
                })
                .reduce((total, loan) => {
                  return total + (loan.chargeAmount || 0); 
                }, 0);
                setTotalChargeAmount(totalAmount); 
              } else {
                setTotalChargeAmount(0); 
              }
      });
  
    }, []);
  
  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: "center", backgroundColor: 'green', paddingTop: 20 }}>
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
        <Text style={{
          fontFamily: "DMSans_500Bold",
          textAlign: 'center',
          color: 'white',
        }}> সুন্দরগঞ্জ , গাইবান্ধা ।   </Text>
        <Text style={{
          fontFamily: "DMSans_500Bold",
          textAlign: 'center',
          color: 'white',
        }}> {user.username}  </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <BalanceCard
          balanceTitle={"Loan Withdrawn"}
          iconName={"arrow-down-bold-hexagon-outline"}
          iconColor={"white"}
          balance={totalLoanWithdraw + '৳'}
        />
        <BalanceCard
          balanceTitle={" Collection Loan "}
          iconName={"arrow-up-bold-hexagon-outline"}
          iconColor={"white"}
          balance={totalLoanCollection + '৳'}
        />
        <BalanceCard
          balanceTitle={" Collection Charge"}
          iconName={"hexagon-slice-6"}
          iconColor={"white"}
          balance={totalChargeAmount + '৳'}
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <BalanceCard
          balanceTitle={"Savings"}
          iconName={"arrow-down-bold-hexagon-outline"}
          iconColor={"white"}
          balance={totalSaveAmount + '৳'}
        />
        <BalanceCard
          balanceTitle={" Savings Withdrawn"}
          iconName={"arrow-up-bold-hexagon-outline"}
          iconColor={"white"}
          balance={totalsavingsWithdraw + '৳'}
        />
        <BalanceCard
          balanceTitle={" Balance"}
          iconName={"hexagon-slice-6"}
          iconColor={"white"}
          balance={totalSaveAmount - totalsavingsWithdraw + '৳'}
        />
      </View>

      <View style={{ flex: .35, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
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
          flex: .45,
          width: "80%",
        }}
      >
        {user && user.username === 'Super Admin' && (
          <BalanceCard
            balanceTitle={" Balance Sheet"}
            iconName={"google-spreadsheet"}
            iconColor={"white"}
            iconSize={60}
            onPress={() => navigation.navigate("BalanceSheet")}
          />
        )}
        <BalanceCard
            balanceTitle={"Today's Transaction"}
            iconName={"av-timer"}
            iconColor={"white"}
            iconSize={60}
            onPress={() => navigation.navigate("DayTransaction")}
          />
      </View>
      <View style={styles.SubmitView}>
        {/* <Button label="Log in" onPress={() => navigation.navigate("Login")} /> */}
        <Button label="Log out" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    flex: 0.30,
    padding: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    
  },
  SubmitView: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    
  },
});
