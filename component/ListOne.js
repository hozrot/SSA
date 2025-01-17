import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ListOne({name, type, onPress,date,iconName, iconSize,
    iconColor = 'green' }) {
  return (
         <TouchableOpacity style={styles.List} onPress={onPress}>
            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:.20,paddingRight:10}}>
           {/* <MaterialCommunityIcons name={'arrow-split-vertical'} size={36} color={"red"} /> */}
            <MaterialCommunityIcons name={iconName} size={48} color={iconColor} />
            {/* <Text style={{fontWeight:'bold',fontSize:10}}>Given {type}</Text> */}
            <Text style={{fontWeight:'bold',fontSize:10}}> {type}</Text>
            </View>
            <View style={{justifyContent:'space-between',flexDirection:'row',flex:.85}} >
                  
                    <View style={{justifyContent:'space-between',flex:80}} >
                        <Text  style={{fontWeight:'bold',fontSize:16}}>Name jhgj: {name}</Text>
                        <View style={{}}> 
                             <Text  style={{fontSize:12}}>12/12/2024 {date}</Text>
                             </View>
                       
                        <Text  style={{fontWeight:'bold',fontSize:16}}>Name : {name}</Text>
                        
                    </View>
                    <View  style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:20,flexDirection:'row',padding:10}} >
        
                        {/* <Text> Collected By </Text> */}
                       
                        <MaterialCommunityIcons name={'currency-try'} size={20} color={"black"} />
                        <Text  style={{fontWeight:'bold',fontSize:18}}>1000</Text>
        
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