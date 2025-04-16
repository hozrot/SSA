import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import AboutUs from './screens/AboutUs';
import CollectMoney from './screens/Collection';
import Home from './screens/Home';
import NewEntry from './screens/NewEntry';
import MemberEntry from './screens/MemberEntry';
import EmployeeEntry from './screens/EmployeeEntry';
import TransactionHistory from './screens/TransactionHistory';
import LoanDetails from './screens/LoanDetails';
import EmployeeDetails from './screens/EmployeeDetails';
import MemberList from './screens/MemberList';
import CollectionDetails from './screens/CollectionDetails';
import Summary from './screens/Summary';
import CostDetails from './screens/CostDetails';
import ExpenseEntry from './screens/ExpenseEntry';
import LoanList from './screens/LoanList';
import SavingsList from './screens/SavingsList';
import ExpenseList from './screens/ExpenseList';
import BalanceSheet from './screens/BalanceSheet';
import GiveLoan from './screens/WithdrawLoan';
import GiveSavings from './screens/WithdrawSavings';
import MyTransaction from './screens/MyTransaction';
import Withdraw from './screens/Withdraw';
import WithdrawLoan from './screens/WithdrawLoan';
import WithdrawSavings from './screens/WithdrawSavings';
import Collection from './screens/Collection';
import DayTransaction from './screens/DayTransaction';
import MemberTransaction from './screens/MemberTransaction';
import AllTransaction from './screens/AllTransaction';
import { UserProvider } from './UserContext';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <UserProvider>
      
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}  options={{ header: () => null }}/>
        <Stack.Screen name="Home" component={Home} options={{ header: () => null }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Collection" component={Collection} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="MemberEntry" component={MemberEntry} />
        <Stack.Screen name="EmployeeEntry" component={EmployeeEntry} />
        <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
        <Stack.Screen name="LoanDetails" component={LoanDetails} />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
        <Stack.Screen name="MemberList" component={MemberList} />
        <Stack.Screen name="CollectionDetails" component={CollectionDetails} />
        <Stack.Screen name="CostDetails" component={CostDetails} />
        <Stack.Screen name="ExpenseEntry" component={ExpenseEntry} />
        <Stack.Screen name="LoanList" component={LoanList} />
        <Stack.Screen name="SavingsList" component={SavingsList} />
        <Stack.Screen name="ExpenseList" component={ExpenseList} />
        <Stack.Screen name="BalanceSheet" component={BalanceSheet} />
        <Stack.Screen name="WithdrawLoan" component={WithdrawLoan} />
        <Stack.Screen name="WithdrawSavings" component={WithdrawSavings} />
        <Stack.Screen name="MyTransaction" component={MyTransaction} />
        <Stack.Screen name="DayTransaction" component={DayTransaction} />
        <Stack.Screen name="AllTransaction" component={AllTransaction} />
        <Stack.Screen name="MemberTransaction" component={MemberTransaction} />
        
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>

    </NavigationContainer>
    </UserProvider>
    //  <SafeAreaView>
    //   <Text> test </Text>
    //   <Button title="Go to Details"  onPress={() => navigation.navigate("Home")} />
    //  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
