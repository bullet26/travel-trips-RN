import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {formatToDateString} from './utils';
import {AccordionCard} from './AccordionCard';
import {colors} from '../../theme';
import {TripProps} from '../../types';

interface TripDaysAccordionProps {
  unassignedPlacesId: number;
  tripDays: {id: number; date: Date}[];
  navigation: TripProps;
}

export const TripDaysAccordion = (props: TripDaysAccordionProps) => {
  const {unassignedPlacesId, tripDays, navigation} = props;

  const [openCollapse, setCollapse] = useState<number[]>([]);

  const isExist = (id: number) => openCollapse.includes(id);

  const onPress = (id: number) => {
    if (isExist(id)) {
      setCollapse(prevState => prevState.filter(item => item !== id));
    } else {
      setCollapse(prevState => [...prevState, id]);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => onPress(unassignedPlacesId)}>
          <Text style={styles.headerText}>unassigned places</Text>
        </TouchableOpacity>
        <Collapsible collapsed={!isExist(unassignedPlacesId)}>
          <View style={styles.content}>
            <AccordionCard
              id={unassignedPlacesId}
              type="up"
              navigation={navigation}
            />
          </View>
        </Collapsible>
      </View>
      {tripDays.map(item => (
        <View style={styles.container} key={item.id}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => onPress(item.id)}>
            <Text style={styles.headerText}>
              {formatToDateString(item.date)}
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={!isExist(item.id)}>
            <View style={styles.content}>
              <AccordionCard id={item.id} type="td" navigation={navigation} />
            </View>
          </Collapsible>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  header: {
    backgroundColor: colors.backgroundAccent,
    padding: 15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: colors.backgroundAccent,
    borderWidth: 2,
    borderColor: colors.border,
  },
});
