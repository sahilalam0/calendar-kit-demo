import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Generate comprehensive mock events for performance testing
const generateMockEvents = () => {
  const events = [];
  const colors = [
    '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#9C27B0',
    '#FF5722', '#00BCD4', '#3F51B5', '#E91E63', '#FF9800',
    '#009688', '#795548', '#607D8B', '#8BC34A', '#CDDC39'
  ];
  
  const eventTitles = [
    'Team Meeting', 'Client Call', 'Project Review', 'Design Workshop',
    'Code Review', 'Standup', 'Lunch Meeting', 'Training Session',
    'Conference Call', 'Planning Session', '1-on-1', 'Sprint Planning',
    'Retrospective', 'Demo', 'Interview', 'Workshop', 'Presentation',
    'Brainstorming', 'Strategy Meeting', 'Budget Review'
  ];
  
  let eventId = 1;
  
  // Current week (Oct 20-26, 2025)
  const dates = [
    '2025-10-20', '2025-10-21', '2025-10-22', '2025-10-23',
    '2025-10-24', '2025-10-25', '2025-10-26'
  ];
  
  dates.forEach((date, dayIndex) => {
    // Add all-day events (1-2 per week)
    if (dayIndex === 0) {
      events.push({
        id: String(eventId++),
        title: 'Company All-Hands',
        start: { date },
        end: { date },
        color: colors[0],
      });
    }
    
    if (dayIndex === 4) {
      events.push({
        id: String(eventId++),
        title: 'Team Building Day',
        start: { date },
        end: { date },
        color: colors[5],
      });
    }
    
    // Skip weekends for most events (Saturday/Sunday)
    const isWeekend = dayIndex === 5 || dayIndex === 6;
    const numberOfEvents = isWeekend ? 2 : 6 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < numberOfEvents; i++) {
      const startHour = isWeekend ? 10 + Math.floor(Math.random() * 6) : 8 + Math.floor(Math.random() * 10);
      const startMinute = Math.random() > 0.5 ? 0 : 30;
      const durationHours = Math.random() > 0.7 ? 2 : 1;
      const durationMinutes = Math.random() > 0.5 ? 0 : 30;
      
      const startTime = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`;
      const endHour = startHour + durationHours;
      const endMinute = startMinute + durationMinutes;
      const endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute % 60).padStart(2, '0')}:00`;
      
      events.push({
        id: String(eventId++),
        title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
        start: { dateTime: `${date}T${startTime}Z` },
        end: { dateTime: `${date}T${endTime}Z` },
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    // Add some overlapping events for each day (to test rendering performance)
    if (!isWeekend && Math.random() > 0.5) {
      const overlapStartHour = 13 + Math.floor(Math.random() * 2);
      
      // Create 2-3 overlapping events
      for (let j = 0; j < 2 + Math.floor(Math.random() * 2); j++) {
        events.push({
          id: String(eventId++),
          title: `${eventTitles[Math.floor(Math.random() * eventTitles.length)]} ${j + 1}`,
          start: { dateTime: `${date}T${String(overlapStartHour).padStart(2, '0')}:${String(j * 15).padStart(2, '0')}:00Z` },
          end: { dateTime: `${date}T${String(overlapStartHour + 1).padStart(2, '0')}:${String(j * 15).padStart(2, '0')}:00Z` },
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }
  });
  
  // Add recurring events
  events.push({
    id: String(eventId++),
    title: 'Daily Standup',
    start: { dateTime: '2025-10-20T09:00:00Z' },
    end: { dateTime: '2025-10-20T09:15:00Z' },
    color: colors[6],
    recurrenceRule: 'RRULE:FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR',
  });
  
  events.push({
    id: String(eventId++),
    title: 'Weekly Team Sync',
    start: { dateTime: '2025-10-22T10:00:00Z' },
    end: { dateTime: '2025-10-22T11:00:00Z' },
    color: colors[1],
    recurrenceRule: 'RRULE:FREQ=WEEKLY;BYDAY=WE',
  });
  
  return events;
};

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
