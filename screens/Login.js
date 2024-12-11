import { StyleSheet, Text, View, TouchableOpacity,Button } from 'react-native'
import React from 'react'

export default function Login({navigation}) {
    return (
      <Button title="Go to Home"  onPress={() => navigation.navigate("Home")} />
    );
}

const styles = StyleSheet.create({})