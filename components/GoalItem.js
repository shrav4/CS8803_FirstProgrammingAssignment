import { StyleSheet, View, Text, Pressable, Alert} from 'react-native'



// 
function GoalItem(props) {
    const removeItem = () =>
        Alert.alert('Are you sure you want to remove this task?', "", [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'Yes', onPress: props.onDeleteItem.bind(this, props.id)}
    ]);

    return (
        <Pressable onPress={removeItem}>
            <View style={styles.goalItem}>
                <Text style={styles.goalText}>
                    {props.text}
                </Text>
            </View>
        </Pressable>
    ); 
}
export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#078259',
  },
  goalText: {
    color: 'white'
  }
})