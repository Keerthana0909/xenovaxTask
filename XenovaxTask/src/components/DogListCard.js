import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Card, Divider} from 'react-native-elements';

export const DogListCard = props => {
  return (
    <View>
      <Card containerStyle={styles.card}>
        <Text style={styles.headerText}>{props?.item?.name}</Text>

        <Text style={[styles.subTitle,{marginTop:10}]}>
          {"Life:  " + props?.item?.lifemin + ' - ' + props?.item?.lifemax}
        </Text>
        <Divider style={{marginVertical:10}} />
        <Text style={styles.headerText}>
          {"Weight"}
        </Text>
        <Text style={styles.subTitle}>
          {"Male weight:  " +props?.item?.male_weightmin + ' - ' + props?.item?.male_weightmax}
        </Text>
        <Text style={styles.subTitle}>
          {"Female weight:  " +props?.item?.female_weightmin +
            ' - ' +
            props?.item?.female_weightmax}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
});
