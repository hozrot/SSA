import React from 'react';
import { Text, StyleSheet, TouchableOpacity} from 'react-native';
import{MaterialCommunityIcons} from '@expo/vector-icons';

function MenuCard({onPress,menuTitle,iconName,iconSize,
                    iconColor='green'}) {
    return (
            <TouchableOpacity style={styles.Container}
                              onPress={onPress}>  
            <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />  
              <Text >  {menuTitle}  </Text>
              
            </TouchableOpacity>           
    );
}
const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor: "aliceblue",
        //backgroundColor: "#fc5c65",
        // backgroundColor: "#7fff00",
        borderRadius: 30,
        justifyContent:"center",
        alignItems:'center',
        margin: 5
    },
    
})

export default MenuCard;