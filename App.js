import {useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Animated, ImageBackground, Image } from 'react-native';

export default function App() {
  const moonAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moonAnimation, {
          toValue: 1,
          duration: 16000,
          useNativeDriver: false,
        }),
        Animated.timing(moonAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [moonAnimation]);

  const moonLeft = moonAnimation.interpolate({
    inputRange: [0,1],
    outputRange: ['0%', '90%',]
  });

  const moonColor = moonAnimation.interpolate({
    inputRange: [0, 0.20, 0.45, 0.75, 1],
    outputRange: ['#c9c9c9', '#a7a7a7', '#000000', '#a7a7a7', '#c9c9c9']
  });

  return (
    <ImageBackground source={require('./images/fondo.jpg')} resizeMode='cover' style={styles.fondo}>
      <View style={styles.container}>
        <View>
          <Text style={styles.tittle}>Eclipse 08 de abril del 2024 🌒</Text>
        </View>
        <Image source={require('./images/sol.png')} style={styles.sun} />
        <Animated.View style={[styles.moon, {left: moonLeft, backgroundColor: moonColor}]} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondo:{
    flex: 1
  },
  tittle: {
    paddingBottom: 600,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  moon: {
    position: 'absolute',
    bottom: '50%',
    width: 110,
    height: 110,
    borderRadius: 100,
    zIndex: 1,
  },
  sun: {
    position: 'absolute',
    bottom: '50%',
    width: 140,
    height: 140,
    borderRadius: 35,
  },
});