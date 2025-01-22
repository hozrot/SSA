import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BalanceCard from '../component/BalanceCard'

export default function CostDetails() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 10 }}> Month of July 2025</Text>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
          balanceTitle={"Savings"}
          iconName={"account-cash"}
          iconColor={"white"}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Service fee"}
          iconName={"account-cash"}
          iconColor={"white"}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Welfare Fund  "}
          iconName={"account-cash"}
          iconColor={"white"}
          balance={25000}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
          balanceTitle={"Book Sell"}
          iconName={"account-cash"}
          iconColor={"white"}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Entry Fee "}
          iconName={"account-cash"}
          iconColor={"white"}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Room Rent "}
          iconName={"account-cash"}
          iconColor={"white"}
          balance={25000}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
          balanceTitle={"Form Sell"}
          iconName={"account-cash"}
          iconColor={"white"}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Distribution "}
          iconName={"account-cancel-outline"}
          iconColor={"red"}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Withdraw  "}
          iconName={"account-cancel-outline"}
          iconColor={"red"}
          balance={25000}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
          balanceTitle={"Collection"}
          iconName={"account-cash"}
          iconColor={"white"}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Expense "}
          iconName={"account-cancel-outline"}
          iconColor={"red"}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Total "}
          iconName={"account-cash"}
          iconColor={"white"}
          balance={25000}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})