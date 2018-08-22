import React from 'react';
import { Button, View, Text, Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import StyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import getSceneIndicesForInterpolationInputRange from 'react-navigation/src/utils/getSceneIndicesForInterpolationInputRange';

import ModalScreen from './ModalScreen';

// create custom transitioner without the opacity animation, ie. for iOS
function forVertical(props) {
  const { layout, position, scene } = props;

  const index = scene.index;
  const height = layout.initHeight;

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange: ([index - 1, index, index + 1]: Array<number>),
    outputRange: ([height, 0, 0]: Array<number>)
  });

  return {
    transform: [{ translateX }, { translateY }]
  };
}

function forModal(props) {
  return {
    transform: [{ translateX: 0 }, { translateY: 0 }]
  };
}

// function forFade(props) {
//   const { layout, position, scene } = props;
//
//   if (!layout.isMeasured) {
//     return forInitial(props);
//   }
//   const interpolate = getSceneIndicesForInterpolationInputRange(props);
//
//   if (!interpolate) return { opacity: 0 };
//
//   const { first, last } = interpolate;
//   const index = scene.index;
//   const opacity = position.interpolate({
//     inputRange: [first, index, last],
//     outputRange: [0, 1, 1],
//   });
//
//   return {
//     opacity,
//   };
// }


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

const modalContentA = (onComplete) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 2, backgroundColor: 'transparent', }} />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', }}>
      <Text style={{ fontSize: 30 }}>This is a modal A!</Text>
      <Button
        onPress={onComplete.bind(this)}
        title="Dismiss"
      />
    </View>
    <View style={{ flex: 2, backgroundColor: 'transparent', }} />
  </View>
);

const modalContentB = (onComplete) => (
  <View style={{ flex: 1, backgroundColor: 'transparent' }}>
    <View style={{ flex: 2, backgroundColor: 'transparent', }} />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', }}>
      <Text style={{ fontSize: 30 }}>This is a modal B!</Text>
      <Button
        onPress={onComplete.bind(this)}
        title="Dismiss"
      />
    </View>
    <View style={{ flex: 2, backgroundColor: 'transparent', }} />
  </View>
);

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
          onPress={() =>  this.props.navigation.navigate('MyModal', { renderChildren: modalContentA })}
          title="Modal A"
        />
        <Button
          onPress={() =>  this.props.navigation.navigate('MyModal', { renderChildren: modalContentB })}
          title="Modal B"
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
        <Button
          onPress={() =>  this.props.navigation.navigate('MyModal', { renderChildren: modalContentA })}
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
    mode: 'card',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',//'rgba(0, 0, 0, 0.8)',
      opacity: 1,
    },
    // transitionConfig: () => ({ screenInterpolator: StyleInterpolator.forFade })
    transitionConfig : () => ({
      screenInterpolator: forModal,
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
      containerStyle: {
        backgroundColor: 'transparent',
      }
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
