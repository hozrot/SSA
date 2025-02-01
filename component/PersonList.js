import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

function PersonList({ name, designation, image, mobile, joindate, onPress }) {
    return (
        <TouchableOpacity style={styles.List} onPress={onPress}>
            {image && <Image style={styles.imageBox} source={image} />}
            <View style={{}} >
                <Text> {name}</Text>
                <Text> {mobile}</Text>
            </View>
            <View>
                <Text> {designation}</Text>
                <Text> {joindate}</Text>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    List: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#DBFD82',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 15
    },
    imageBox: {
        height: 70,
        width: 70,
        borderRadius: 35,
        marginRight: 10
    },

})
export default PersonList;