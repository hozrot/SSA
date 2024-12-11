import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function ImageCard({ onPress, cardTitle, image, name, designation, office }) {
    return (
        <TouchableOpacity style={styles.Container}
            onPress={onPress}>

            {image && <Image style={styles.imageBox} source={image} />}

            <View style={styles.textContainer}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>  {cardTitle}  </Text>
                <Text>{name}</Text>
                <Text>{designation}</Text>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#7fff00",
        margin: 5

    },
    imageBox: {
        height: 80,
        width: 100,
        borderRadius: 15,
        backgroundColor: "#7fff00"

    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})