import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

export default function EmployeeEntry({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Employee Entry Form </Text>
      <Button title="Employeeeeeeeeee"  onPress={() => navigation.navigate("Home")} />  
    </View>
  )
}

const styles = StyleSheet.create({})