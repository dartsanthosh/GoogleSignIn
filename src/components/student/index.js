import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Student = ({student}) => {
  return (
    <View style={styles.container}>
      <View style={styles.alignment}>
        <Text style={styles.name}>{student?.studentName}&nbsp;&nbsp;</Text>
        <Text style={styles.name}>{student?.fatherName}</Text>
      </View>
      <View
        style={[
          styles.alignment,
          {justifyContent: 'space-between', marginTop: 10},
        ]}>
        <View style={[styles.alignment, {flex: 1}]}>
          <View style={styles.alignment}>
            <Text style={styles.label}>Class: </Text>
            <Text style={{fontSize: 16, color: '#000'}}>{student?.class}</Text>
          </View>
          <View style={[styles.alignment, {paddingLeft: 10}]}>
            <Text style={styles.label}>Sec: </Text>
            <Text style={{fontSize: 16, color: '#000'}}>
              {student?.division}
            </Text>
          </View>
        </View>
        <View style={[styles.alignment, {flex: 1, justifyContent: 'flex-end'}]}>
          <Text style={styles.label}>Total Marks: </Text>
          <Text style={{fontSize: 16, color: '#000'}}>{student?.grade}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  alignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Student;
