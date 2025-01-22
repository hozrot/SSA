import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Button from "../component/Button";
import TextInput from "../component/TextInput";

export default function LoanCollection({ navigation }) {
  return (

    <ScrollView style={styles.containerView}>

      <View style={styles.HeaderView}>
        <Text
          style={{
            fontFamily: "DMSans_500Bold",
            fontSize: 18,
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
          Member No{" "}
        </Text>

        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"

          style={{ fontSize: 14 }}
        />
        {/* <Text
                           style={{
                             fontFamily: "DMSans_500Medium",
                             fontSize: 16,
                             paddingBottom: 8,
                             paddingTop: 15,
                             
                           }}
                         >
                           {" "}
                           Loan Amount   :  {" "}
                         </Text>

                         <Text
                           style={{
                             fontFamily: "DMSans_500Medium",
                             fontSize: 16,
                             paddingBottom: 8,
                             paddingTop: 15,
                             
                           }}
                         >
                           {" "}
                          Total Due :    {" "}
                         </Text> */}

        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Amount to pay   {" "}
        </Text>



        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
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
          Type of Payment {" "}
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

          style={{ fontSize: 14 }}
        />

      </View>


      <View style={styles.SubmitView}>


        <Button label="Collect Loan Amount " onPress={() => navigation.navigate("Dashboard")} />
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
    paddingTop: 10,
  },
  FormView: {
    flex: 0.4,
    width: "100%",
    justifyContent: "center",
    alignContent: 'center',
    padding: 10,
  },
  SubmitView: {
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },

})