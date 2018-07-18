import React from 'react';
import { Button, View, Text, Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';

class RootScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>RootScreen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('ModalRootStack')}
          title="ModalRootStack"
        />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          onPress={() =>  this.props.navigation.navigate('MyModal')}
          title="Modal"
        />
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <AndroidBackHandler onBackPress={() => true}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
        </View>
      </AndroidBackHandler>
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
        <Button
          onPress={() =>  this.props.navigation.navigate('MyModal')}
          title="Modal"
        />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const ModalRootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  }
);

const RootStack = createStackNavigator(
  {
    RootScreen: RootScreen,
    ModalRootStack: ModalRootStack,
  },
  {
    initialRouteName: 'RootScreen',
    headerMode: 'none',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
