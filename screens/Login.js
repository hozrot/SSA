import { StyleSheet, Text, View, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import { Alert } from 'react-native';

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

 const  handleLogin = () => {
  const users = [
    { email: "admin@ssa.com", password: "superadmin@2025", username: "Super Admin" },
    { email: "user1@ssa.com", password: "user1mja", username: "মোঃ জয়নাল আবেদীন" },
    { email: "user2@ssa.com", password: "user2mri", username: "মোঃ রাকিবুল ইসলাম" },
  ];



  if (email === "" || password === "") {
    Alert.alert("Error", "Email and Password cannot be empty");
    return;
  }

  // Find the user based on the entered email and password
  const loggedInUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (loggedInUser) {
    Alert.alert("Success", `Login successful for ${loggedInUser.username}`);
    // Navigate to the Home screen and pass the username as a parameter
    navigation.navigate("Home", { username: loggedInUser.username });
  } else {
    Alert.alert("Error", "Invalid email or password");
  }
  }
    return (

      <ScrollView style={styles.containerView}>

        <View style={styles.HeaderView}>
          <Text
            style={{
              fontFamily: "DMSans_500Bold",
              fontSize: 18,
              padding:20,
              textAlign:'center'
              
            }}
          >
            {"সুন্দরগঞ্জ দোকান মালিক ব্যাবসায় সমবায় সমিতি"}
             {" "}
          </Text>
          <Text style={styles.AllText}> সুন্দরগঞ্জ , গাইবান্ধা ।   </Text>
        </View>
        <View style={styles.FormView}>
          <Text
            style={{
              fontFamily: "DMSans_500Medium",
              fontSize: 16,
              paddingBottom: 8,
              
            }}
          >
            {" "}
            Email{" "}
          </Text>
        
          <TextInput
            inputHieght={54}
            inputAlign={"center"}
            placeholder="Enter here...."
            autoCapitalize="none"
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{ fontSize: 14 }}
          />
          <Text
            style={{
              fontFamily: "DMSans_500Medium",
              fontSize: 16,
              paddingBottom: 8,
              paddingTop: 15,
              
            }}
          >
            {" "}
            Password{" "}
          </Text>

          <TextInput
            inputHieght={54}
            inputAlign={"center"}
            placeholder="********"
            autoCapitalize="none"
            keyboardType="password"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            value={password}
            onChangeText={(text) => setPassword(text)}
            onPress={togglePasswordVisibility}
            icon={showPassword ? "eye-off" : "eye"}
            iconColor={"grey"}
            secureTextEntry={!showPassword}
            style={{ fontSize: 14 }}
          />
          
        </View>
      

    <View style={styles.SubmitView}>
      <Button label="Log in " onPress={()=> handleLogin()} />
      </View>
    </ScrollView>
      
    );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "acqua",
  },
  HeaderView: {
    flex: 0.2,
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  FormView: {
    flex: 0.4,
    width: "100%",
    justifyContent: "center",
    alignContent:'center',
    padding: 10,
    
  },
  SubmitView: {
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },
 
})