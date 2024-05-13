import React, {useContext} from 'react';

// Navigator
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Screens
import LoginPage from '../screens/LoginPage';
import StudentPage from '../screens/StudentPage';
import AuthContext from '../AuthContext/AuthContext';
import CustomLoader from '../components/CustomLoader';
import StudentDetails from '../screens/StudentDetails';
import Backup from '../components/Backup';

const Navigator = () => {
  const {user, loading} = useContext(AuthContext);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen name="StudentPage" component={StudentPage} />
            <Stack.Screen
              name="StudentDetails"
              component={StudentDetails}
              options={({route}) => ({
                title: route.params?.pageTitle,
              })}
            />
            <Stack.Screen name="Backup" component={Backup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
