import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import ListTwo from '../component/ListTwo';

const data = [
    { id: 1, expense: 2000, earning: 40000, total: 10000 },
    { id: 2, expense: 2000, earning: 40000, total: 10000 },
    { id: 3, expense: 2000, earning: 40000, total: 10000 },
    { id: 4, expense: 2000, earning: 40000, total: 10000 },
    { id: 5, expense: 2000, earning: 40000, total: 10000 },
    { id: 6, expense: 2000, earning: 40000, total: 10000 },
    // ... more items
];
export default function BalanceSheet({ navigation }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListTwo
                        expanse={item.expense}
                        earning={item.earning}
                        total={item.total}
                        iconName={"arrow-split-vertical"}
                        iconColor={'#8300FD'}
                        onPress={() => navigation.navigate("CostDetails")}
                    />
                    // <View style={styles.item}>
                    //   <Text>{item.title}</Text>
                    //   <Text>Join Date:  {item.Date}</Text>
                    // </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    item: {
        backgroundColor: 'green',
        padding: 10,
        marginVertical: 8,
    },
});