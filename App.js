import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const Tab2Screen = (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Tab 2</Text>
    <Button
      title="Go to Details"
      onPress={() => props.navigation.navigate('Details')}
    />
  </View>
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Tab2: Tab2Screen,
  },
  {
    initialRouteName: 'Home',
  }
);

const RootStack = createStackNavigator(
  {
    TabNavigator,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'TabNavigator',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
