import React from 'react';
import { View ,StyleSheet,Image,Text, TouchableOpacity} from 'react-native';

function PersonList({name, designation, image,office,onPress}) {
    return (
        <TouchableOpacity style={styles.List} onPress={onPress}>  
              {image &&  <Image  style={styles.imageBox} source={image}/>}
                <View>
                <Text>{name}</Text>
                <Text>{designation}</Text>
                <Text>{office}</Text>
                
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    List:{
        flexDirection:'row',
        margin:15
    },
    imageBox:{
        height: 70,
        width: 70,
        borderRadius: 35 ,
        marginRight:10
    },
    
})
export default PersonList;