import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { generateMockEvents } from '../utils/mockEvents';

const mockEvents = generateMockEvents();

type ViewMode = 1 | 3 | 7;

export default function Index() {
  const [numberOfDays, setNumberOfDays] = useState<ViewMode>(7);

  const handleViewChange = (days: ViewMode) => {
    setNumberOfDays(days);
  };

  return (
    <View style={styles.container}>
      {/* View Switcher */}
      <View style={styles.viewSwitcher}>
        <TouchableOpacity
          style={[styles.viewButton, numberOfDays === 1 && styles.activeButton]}
          onPress={() => handleViewChange(1)}
        >
          <Text style={[styles.buttonText, numberOfDays === 1 && styles.activeButtonText]}>
            Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewButton, numberOfDays === 3 && styles.activeButton]}
          onPress={() => handleViewChange(3)}
        >
          <Text style={[styles.buttonText, numberOfDays === 3 && styles.activeButtonText]}>
            3 Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewButton, numberOfDays === 7 && styles.activeButton]}
          onPress={() => handleViewChange(7)}
        >
          <Text style={[styles.buttonText, numberOfDays === 7 && styles.activeButtonText]}>
            Week
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <CalendarContainer
	    allowDragToCreate={true}
        numberOfDays={numberOfDays}
        scrollByDay={numberOfDays === 1}
        events={mockEvents}
        onPressEvent={(event) => {
          console.log('Event pressed:', event);
        }}
        onLongPressEvent={(event) => {
          console.log('Event long-pressed:', event);
        }}
      >
        <CalendarHeader />
        <CalendarBody />
      </CalendarContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewSwitcher: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 60,
    gap: 8,
    backgroundColor: '#f5f5f5',
  },
  viewButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeButton: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
  },
});
