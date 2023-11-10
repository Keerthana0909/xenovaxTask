import {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, Image} from 'react-native';
import Colors from '../values/Colors';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
       source={require('../assets/logo.png')}
      // source={{uri: '../assets/logo.png'}}
       style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 160,
    width: 160,
    alignContent:'center'
  },
});

export default Splash;
