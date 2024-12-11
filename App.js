import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import AboutUs from './screens/AboutUs';
import CollectMoney from './screens/CollectMoney';
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

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator  initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}  />
       <Stack.Screen name="Dashboard" component={Dashboard} />
       <Stack.Screen name="AboutUs" component={AboutUs}  />
       <Stack.Screen name="CollectMoney" component={CollectMoney}/>
       <Stack.Screen name="Home" component={Home}  />
       <Stack.Screen name="NewEntry" component={NewEntry} />
       <Stack.Screen name="MemberEntry" component={MemberEntry} />
       <Stack.Screen name="EmployeeEntry" component={EmployeeEntry} />
       <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
       <Stack.Screen name="LoanDetails" component={LoanDetails} />
       <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
       <Stack.Screen name="MemberList" component={MemberList} />
       <Stack.Screen name="CollectionDetails" component={CollectionDetails} />
       <Stack.Screen name="Summary" component={Summary} />
    </Stack.Navigator>
  
  </NavigationContainer>
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