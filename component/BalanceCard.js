import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BalanceCard({ onPress, balanceTitle, iconName, iconSize, balance,
  iconColor = '#6656FE' }) {
  return (
    <TouchableOpacity style={styles.Container}
      onPress={onPress}>
      <Text style={{ color: 'white' }} >  {balanceTitle}  </Text>
      <MaterialCommunityIcons name={iconName} size={45} color={iconColor} />
      <Text style={{ color: 'white', fontWeight: 'bold' }}  >  {balance}  </Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#6656FE",
    //backgroundColor: "#fc5c65",
    // backgroundColor: "#7fff00",
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    margin: 10,
    padding: 10,
    height: 120,

  },
})