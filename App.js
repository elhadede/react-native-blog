import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/stack';

let page = '';

function read({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>elhadede ⚡</Text>
      <Text style={styles.text}>{page.title}</Text>
      <Text style={styles.text2}>{page.body}</Text>
    </View>
  );
}

function home({ navigation }) {
  const [data, setData] = useState([]);
  const [post, setpost] = useState({});
  fetch('https://p0l.herokuapp.com/get?db=blog&limit=5')
    .then((response) => response.json())
    .then((json) => setData(json));
  function loadshort(post) {
    setpost(post);
    page = post;
    navigation.push('read');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>elhadede ⚡</Text>
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.short}
            onPress={() => loadshort(item)}>
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  short: {
    margin: 10,
    backgroundColor: '#5C527F',
    textAlign: 'center',
    padding: 10,
  },
  text: {
    textAlign: 'center',
    margin: 10,
    fontSize: 32,
  },
  text2: {
    textAlign: 'center',
    fontSize: 16,
  },
});
const Stack = createStackNavigator();

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={home} />
        <Stack.Screen name="read" component={read} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
