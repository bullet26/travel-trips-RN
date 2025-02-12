import {useState} from 'react';
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

interface TripDaysAccordionProps {
  unassignedPlacesId: number;
  tripDays: {id: number; date: Date}[];
}

export const TripDaysAccordion = (props: TripDaysAccordionProps) => {
  const {unassignedPlacesId, tripDays} = props;

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => setIsCollapsed(!isCollapsed)}>
          <Text style={styles.headerText}>unassigned places</Text>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed}>
          <View style={styles.content}>
            <AccordionCard id={unassignedPlacesId} type="up" />
          </View>
        </Collapsible>
      </View>
      {tripDays.map(item => (
        <View style={styles.container} key={item.id}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => setIsCollapsed(!isCollapsed)}>
            <Text style={styles.headerText}>
              {formatToDateString(item.date)}
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={isCollapsed}>
            <View style={styles.content}>
              <AccordionCard id={item.id} type="td" />
            </View>
          </Collapsible>
        </View>
      ))}
    </>
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
    padding: 15,
    backgroundColor: colors.backgroundAccent,
    borderWidth: 2,
    borderColor: colors.border,
  },
});
