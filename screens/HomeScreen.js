// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'


// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>HomeScreen</Text>
//     </View>
//   )
// }

// export default HomeScreen

// const styles = StyleSheet.create({})

import { useState } from 'react';
import { StyleSheet, View, FlatList, Text} from 'react-native';

import GoalItem from '../components/GoalItem';
import GoalInput from '../components/GoalInput';
import { auth } from './LoginScreen';


export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals( (currentCourseGoals) =>[
      ...currentCourseGoals,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
    console.log(id)
  }
  return (
    <View style={styles.appContainer}>
      <Text style={styles.userDetails} > User Email: {auth.currentUser?.email}! </Text>
      <GoalInput onAddGoal={addGoalHandler}/>
      <View style={styles.goalsContainter}>
        <FlatList
          data={courseGoals} 
          renderItem={(itemData) => {
            return (
              <GoalItem 
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}

          keyExtractor={(item, index)=> {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex:1,
    // paddingTop: ,
    paddingHorizontal: 16
  },
  goalsContainter: {
    flex: 6
  },
  userDetails: {
    fontSize: 15,
    fontWeight: '400',
    color: "#078259",
    paddingTop: 10
  }
});