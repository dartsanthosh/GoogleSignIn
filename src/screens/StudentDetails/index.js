import {View, TextInput, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentDetails({navigation, route}) {
  const students = route?.params?.students;
  const item = route?.params?.item;
  const index = route?.params?.index;

  const [studentInfo, setStudentInfo] = useState({
    studentName: '',
    fatherName: '',
    class: '',
    division: '',
    grade: '',
  });

  useEffect(() => {
    if (item) {
      setStudentInfo(item);
    }
  }, [item]);

  const onChangeText = (text, value) => {
    setStudentInfo({...studentInfo, [value]: text});
  };

  const saveStudent = async () => {
    try {
      let updatedStudents = null;
      const newStudent = studentInfo;
      if (item) {
        students[index] = newStudent;
        updatedStudents = students;
      } else {
        updatedStudents = [...students, newStudent];
      }
      await AsyncStorage.setItem('students', JSON.stringify(updatedStudents));
      navigation.goBack();
    } catch (error) {
      console.error('Error saving student', error);
    }
  };

  return (
    <View style={{margin: 15}}>
      <TextInput
        placeholder="Student Name"
        placeholderTextColor={'grey'}
        value={studentInfo?.studentName}
        onChangeText={text => onChangeText(text, 'studentName')}
        style={styles.input}
      />
      <TextInput
        placeholder="Father Name"
        placeholderTextColor={'grey'}
        value={studentInfo?.fatherName}
        onChangeText={text => onChangeText(text, 'fatherName')}
        style={styles.input}
      />
      <View style={styles.inputWrap}>
        <TextInput
          placeholder="Class"
          placeholderTextColor={'grey'}
          value={studentInfo?.class}
          onChangeText={text => onChangeText(text, 'class')}
          style={[styles.input, {flex: 1}]}
          keyboardType="number-pad"
        />
        <TextInput
          placeholder="Section"
          placeholderTextColor={'grey'}
          value={studentInfo?.division}
          onChangeText={text => onChangeText(text, 'division')}
          style={[styles.input, {flex: 1, marginHorizontal: 5}]}
        />
        <TextInput
          placeholder="Total Marks"
          placeholderTextColor={'grey'}
          value={studentInfo?.grade}
          onChangeText={text => onChangeText(text, 'grade')}
          style={[styles.input, {flex: 1}]}
          keyboardType="number-pad"
        />
      </View>
      <Button
        title={item ? 'Update Student' : 'Add Student'}
        onPress={saveStudent}
        disabled={
          !studentInfo.studentName ||
          !studentInfo.fatherName ||
          !studentInfo.class ||
          !studentInfo.division ||
          !studentInfo.grade
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchables: {
    backgroundColor: 'skyblue',
    flex: 1,
    margin: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
});
