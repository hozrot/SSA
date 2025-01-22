import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ListTwo({ expanse, earning, total, date, iconName, iconSize, onPress,
    iconColor = 'green' }) {
    return (
        <TouchableOpacity style={styles.List} onPress={onPress}>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: .20, paddingRight: 10 }}>
                {/* <MaterialCommunityIcons name={'arrow-split-vertical'} size={36} color={"red"} /> */}
                {/* <MaterialCommunityIcons name={iconName} size={48} color={iconColor} /> */}
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>January</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>2025</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: .85 }} >

                <View style={{ justifyContent: 'space-between', flex: 80 }} >
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Expense  {expanse}</Text>


                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Earning : {earning}</Text>
                    <View style={{ flexDirection: 'row' }} >

                        {/* <Text> Collected By </Text> */}
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Total Balance </Text>
                        <MaterialCommunityIcons name={'currency-try'} size={20} color={"black"} />

                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{total}</Text>

                    </View>

                </View>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    List: {
        flexDirection: 'row',
        margin: 5,
        padding: 5,
        backgroundColor: '#7FC56C',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 15,

    },
    imageBox: {
        height: 70,
        width: 70,
        borderRadius: 35,
        marginRight: 10
    },

})