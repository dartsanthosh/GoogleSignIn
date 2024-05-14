import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Student from '../../components/student';
import {useIsFocused} from '@react-navigation/native';
import AuthContext from '../../AuthContext/AuthContext';
import firestore from '@react-native-firebase/firestore';

const StudentPage = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadStudents();
    dataAvailableCheck(user?.id);
  }, [isFocused, user]);

  const dataAvailableCheck = async user => {
    const collectionRef = await firestore()
      .collection('students')
      .doc(user)
      .get();

    let fetchedStudentsData = await collectionRef?.data().students;
    if (fetchedStudentsData.length > 0) {
      setFetchedData(true);
    }
  };

  const loadStudents = async () => {
    try {
      const studentsData = await AsyncStorage.getItem('students');
      if (studentsData !== null) {
        setStudents(JSON.parse(studentsData));
      }
    } catch (error) {
      console.error('Error loading students', error);
    }
  };

  const deleteObjectAtIndex = async index => {
    let deletedStudent = [...students];
    let filteredStudents = deletedStudent.filter((_, i) => i !== index);
    await AsyncStorage.setItem('students', JSON.stringify(filteredStudents));
    setStudents(filteredStudents);
  };

  const renderStudent = ({item, index}) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#f2fcf4',
      }}>
      <Student student={item} />
      <View style={styles.inputWrap}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('StudentDetails', {
              students,
              item,
              index,
              pageTitle: 'Update Student',
            });
          }}
          style={styles.touchables}>
          <Text>update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteObjectAtIndex(index)}
          style={[styles.touchables, {backgroundColor: '#d95351'}]}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleDataBackup = async user => {
    const collectionRef = firestore().collection('students');
    collectionRef.doc(user).set({students});
  };

  const handleDataRetrieve = async user => {
    const collectionRef = await firestore()
      .collection('students')
      .doc(user)
      .get();

    let fetchedStudentsData = await collectionRef?.data().students;

    let combinedStudentDetails = await fetchedStudentsData.concat(students);

    await AsyncStorage.setItem(
      'students',
      JSON.stringify(combinedStudentDetails),
    );

    setStudents(combinedStudentDetails);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('StudentDetails', {
              students,
              pageTitle: 'Add Student',
            });
          }}
          style={[styles.touchables, {backgroundColor: '#0e4377'}]}>
          <Text style={{color: '#fff', fontSize: 16}}>+ Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!students.length > 0}
          onPress={() => handleDataBackup(user.id)}
          style={[
            styles.touchables,
            {
              backgroundColor: students.length > 0 ? '#0E9C9B' : '#d2d2d4',
              flex: 0.3,
            },
          ]}>
          <Text style={{color: '#fff', fontSize: 16}}>Backup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!fetchedData}
          onPress={() => handleDataRetrieve(user.id)}
          style={[
            styles.touchables,
            {backgroundColor: fetchedData ? '#0E9C9B' : '#d2d2d4', flex: 0.3},
          ]}>
          <Text style={{color: '#fff', fontSize: 16}}>Retrieve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchables: {
    backgroundColor: '#1e8a61',
    flex: 1,
    margin: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
});

export default StudentPage;
