import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../values/Colors';
import {useNavigation} from '@react-navigation/native';
import RangeSlider from 'rn-range-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Filter = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [maleLowWeight, setaMaleLowWeight] = useState('');
  const [maleHighWeight, setaMaleHighWeight] = useState('');
  const [femaleLowWeight, setaFeMleLowWeight] = useState('');
  const [femaleHighWeight, setFemaleHihgWeight] = useState(7);

  const renderThumb = (item, index) => {
    return <FontAwesome name="circle" size={20} color={Colors.primaryColor} />;
  };

  const renderRailSelected = (item, index) => {
    return <RailSelected />;
  };

  const RailSelected = () => {
    return <View style={styles.selectroot} />;
  };

  const renderRail = (item, index) => {
    return <Rail />;
  };

  const renderNotch = (item, index) => {
    return <Notch />;
  };
  const Notch = props => {
    return <View style={styles.notchroot} {...props} />;
  };

  const Rail = () => {
    return <View style={styles.root1} />;
  };
  const renderText = (value, index) => {
    return <Label text={value} />;
  };

  const Label = ({text, ...restProps}) => {
    return (
      <View style={styles.root} {...restProps}>
        <Text style={styles.rangetextstyle}>{text}</Text>
      </View>
    );
  };

  const handleValueChange = useCallback((low, high) => {
    setaMaleLowWeight(low);
    setaMaleHighWeight(high);
  }, []);

  const handleValueChange1 = useCallback((low, high) => {
    setFemaleHihgWeight(high);
    setaFeMleLowWeight(low);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.toolBar}>
          <View style={styles.backArrow}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialIcons
                name={'arrow-back-ios-new'}
                color={'white'}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.toolBarText}>Filter </Text>
        </View>

        <View style={styles.mainContainer}>
          <Text style={styles.titleTextContatiner}>Dog name</Text>

          <TextInput
            style={[styles.editTextcontainer, {flex: 1, marginEnd: 0}]}
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />

          <Text style={styles.titleTextContatiner}>Male Weight</Text>

          <RangeSlider
            style={styles.slider}
            min={0}
            max={20}
            minimumTrackTintColor={'#E7E9EB'}
            maximumTrackTintColor={Colors.secondaryColor}
            step={1}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderText}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />

          <Text style={styles.titleTextContatiner}>FeMale Weight</Text>

          <RangeSlider
            style={styles.slider}
            min={0}
            max={20}
            minimumTrackTintColor={'#E7E9EB'}
            maximumTrackTintColor={Colors.secondaryColor}
            step={1}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderText}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange1}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home', {
              searchText: searchText,
              femaleHighWeight: femaleHighWeight,
              femaleLowWeight: femaleLowWeight,
              maleHighWeight: maleHighWeight,
              maleLowWeight: maleLowWeight,
            });
          }}>
          <View style={styles.mainConatiner}>
            <Text style={styles.levelText}>Apply</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    margin: 16,
  },
  slider: {
    width: '80%',
    marginHorizontal: 20,
    marginTop: -20,
  },
  toolBar: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
  },
  toolBarText: {
    width: '80%',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    marginStart: -20,
  },
  backArrow: {
    alignSelf: 'center',
    paddingStart: 20,
  },
  headerStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  editTextcontainer: {
    marginTop: 5,
    borderColor: Colors.hintGrey,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
  },
  titleTextContatiner: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 15,
    marginHorizontal: 8,
  },
  root1: {
    flex: 1,
    height: 3,
    borderRadius: 10,
    backgroundColor: '#F5F7FA',
  },
  notchroot: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  selectroot: {
    height: 3,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
  },
  mainConatiner: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
  levelText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
});

export default Filter;
