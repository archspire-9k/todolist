
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Our global authentication state, with default values
export const AuthContext = createContext({
  hasUser: '', 
  setUser: () => {},
});

//The main page
class MainPage extends React.Component {

  // Declare a new state variable
  constructor(props) {
    super(props);
    this.state = {
    text: '',
    todo: ['do nothing', 'testing'],
    }
  }

  //add the todo from the text input into the list after onPress is called
  addTodo = () => {
    var newToDo = this.state.text;
    var arr = this.state.todo;
    arr.push(newToDo);
    this.setState({todo: arr, text: ''})
  }

  //remove the existing todo element
  removeTodo = (t) => {
    var arr = this.state.todo;
    var pos = arr.indexOf(t);
    arr.splice(pos, 1);
    this.setState({todo: arr})
  }

  //show the new todolist
  renderTodo = () => (
    this.state.todo.map(t => (
      <Text key = {t}
            onPress = {() => {this.removeTodo(t)}}> {t} </Text>
    ))
  )
  render() {
    return(
      <View style = {styles.container}>
        <TextInput
            style = {styles.input}
            onChangeText = {(text) => this.setState({text})} 
            placeholder = 'enter '
            value = {this.state.text} 
            />
        <Button title = 'add todo'
                color = 'cyan'
                onPress = {this.addTodo }
                />
        <View style = {styles.submitButton}>
          <Button onPress = {() => setUser('wrong')}
                title = 'logout'
                color = 'gray'/>
                </View>
        {this.renderTodo()}
    </View>

   )
  }
}



const LoginScreen = () => {
  const { setUser } = useContext(AuthContext);
  const [text, onChangeText] = React.useState('');

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput 
                style={styles.input} 
                onChangeText = {onChangeText}
                value = {text}
                placeholder = "Uhm name?"
                keyboardType = 'default' />
      <Button onPress = {() => setUser(text)}
              title = 'Get started'
              color = 'gray'/>
              
    </View>
  );
};

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { hasUser } = useContext(AuthContext);

  return (
    <Stack.Navigator>
    { hasUser == 'Duc' ? 
      <Stack.Screen name="Main" component={MainPage} />
     :
     <Stack.Screen name= 'Login' component = {LoginScreen}/>
    }
    </Stack.Navigator>
  );
};

const App = () => {
  // This is linked to our global authentication state.
  // We connect this in React to re-render components when changing this value.
  const [hasUser, setUser] = useState('');

  return (
    <AuthContext.Provider value={{ hasUser, setUser }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
  },
});
