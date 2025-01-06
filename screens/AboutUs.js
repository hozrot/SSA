import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

export default function AboutUs() {

  const image = require("../assets/ssa.jpeg");
  return (
    <View>
    <ImageBackground
          source={image}
          style={{ width: '100%', height: '100%', justifyContent: 'center'}}
    
          imageStyle={{ borderRadius: 10 , resizeMode:'contain'}}
        // Background Linear Gradient
        // colors={['#A52306', '#ffffff']}
        // start={{x: 0.3, y: 0.8}} end={{x: 0.1, y: .5}}
        // locations={[0.9,0.1]}
    
        // colors={['#A52306','#FFC0B3', '#FFC0B3']}
        // start={{x: 0, y: .5}} 
        // end={{x: .5, y: 0}}
        // locations={[.1,.5,.9]}
    
        >
          </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({})