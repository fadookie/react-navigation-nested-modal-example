import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

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
          title="Go to Other"
          onPress={() => this.props.navigation.navigate('Other')}
        />

        <Button
          title="Go to Other 2"
          onPress={() => this.props.navigation.navigate('Other2')}
        />
        <Button
          title = "Other Deeplink"
          onPress={() => {
            const pathAction = RootStack.router.getActionForPathAndParams('details/other', undefined);
            console.log('DEEPLINK:', pathAction);
            this.props.navigation.dispatch(pathAction);
          }}
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
          title="Go to Other"
          onPress={() => this.props.navigation.navigate('Other')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const OtherScreen = (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Other Screen</Text>
    <Button
      title="Go back"
      onPress={() => props.navigation.goBack()}
    />
  </View>
);

const OtherScreen2 = (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Other Screen 2</Text>
    <Button
      title="Go back"
      onPress={() => props.navigation.goBack()}
    />
  </View>
);

const DetailsFlow = createStackNavigator(
  {
    Details: DetailsScreen,
    Other: {
      screen: OtherScreen,
      path: 'other',
    },
    Other2: OtherScreen2,
  },
  {
    initialRouteName: 'Details',
  }
);

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    DetailsFlow: {
      screen: DetailsFlow,
      path: 'details',
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
