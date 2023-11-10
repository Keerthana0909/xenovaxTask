import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../values/Colors';
import {apiCall} from '../api/ServiceConfig';
import {DogListCard} from '../components/DogListCard';
import {Dogschema} from '../db/schema/DogListSchema';
import Realm from 'realm';
import {deleteAll, getAllData} from '../db/service/DogService';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const [data, setData] = useState(null);
  const realm = new Realm({schema: [Dogschema]});
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState(route?.params?.searchText);

  useEffect(() => {
    deleteAll();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (route?.params?.searchText !== undefined) {
      filterDogList();
    }
  }, [isFocused]);

  const getData = () => {
    apiCall('https://dogapi.dog/api/v2/breeds')
      .then(async res => {
        const dogList = res?.data.map(item => ({
          id: item?.id,
          name: item?.attributes?.name,
          description: item?.attributes?.description,
          lifemax: item?.attributes?.life.max,
          lifemin: item?.attributes?.life.min,

          male_weightmax: item?.attributes?.male_weight?.max,
          male_weightmin: item?.attributes?.male_weight?.min,

          female_weightmax: item?.attributes?.female_weight?.max,
          female_weightmin: item?.attributes?.female_weight?.min,

          hypoallergenic: item?.attributes?.hypoallergenic,
        }));

        realm.write(() => {
          dogList.forEach(dog => {
            realm.create('Dog', dog);
          });
        });
        await getDogList();
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Api error', error);
      });
  };

  const getDogList = () => {
    let list = getAllData();
    setData(list);
    setIsLoading(false);
  };

  const sortDogList = () => {
    const sortedList = [...data];
    sortedList.sort((a, b) => {
      const asc = a.name.toUpperCase();
      const desc = b.name.toUpperCase();

      if (sortOrder === 'asc') {
        return asc.localeCompare(desc);
      } else {
        return desc.localeCompare(asc);
      }
    });

    setData(sortedList);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // const filterDogList = () => {
  //   const filteredList = data.filter(dog => {
  //     return dog.name?.toLowerCase() || dog.name || dog.male_weightmax || dog.male_weightmin || dog.female_weightmax || dog.female_weightmin  ?.includes(route?.params?.searchText?.toLowerCase())
  //   });

  //   console.log("filterDogList", filteredList,data[0].name, route?.params?.searchText)

  //   setData(filteredList);

  // };

  const filterDogList = () => {
    const filteredList = data.filter(dog => {
      const nameMatch =
        dog.name
          ?.toLowerCase()
          .includes(route?.params?.searchText?.toLowerCase()) ||
        dog.name.includes(route?.params?.searchText);

      const maleWeightMatch =
        (dog.male_weightmax >= route?.params?.maleLowWeight &&
          dog.male_weightmin <= route?.params?.maleHighWeight) ||
        (route?.params?.maleLowWeight === 0 &&
          route?.params?.maleHighWeight === 0);

      const femaleWeightMatch =
        (dog.female_weightmax >= route?.params?.femaleLowWeight &&
          dog.female_weightmin <= route?.params?.femaleHighWeight) ||
        (route?.params?.femaleLowWeight === 0 &&
          route?.params?.femaleHighWeight === 0);

      return nameMatch && maleWeightMatch && femaleWeightMatch;
    });

    setData(filteredList);
  };

  return (
    <ScrollView>
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
          <Text style={styles.toolBarText}>Dog List </Text>
          <View style={styles.headerStyle}>
            <TouchableOpacity
              onPress={() => {
                sortDogList();
              }}>
              <FontAwesome name={'arrows-v'} color={'white'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingHorizontal: 20}}
              onPress={() => {
                navigation.navigate('Filter');
              }}>
              <FontAwesome name={'filter'} color={'white'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} color={Colors.primaryColor} />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <View style={{}}>
                    <DogListCard item={item} />
                  </View>
                );
              }}
              ListFooterComponent={() => <View />}
              ListFooterComponentStyle={{
                marginBottom: 10,
              }}
            
            />
          </View>
        )}
      </View>
      {/* <ActivityIndicator /> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loading: {
    // flex: 1,
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,

    height: Dimensions.get('window').height - 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export default Home;
