import React from 'react';
import { Button, View, Text, Animated, Easing } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';

class ModalScreen extends React.Component {
  constructor() {
    super();
    this.state = { textColor: 'black' };
  }

  // didFocus(payload) {
  //   console.log('ModalScreen.didFocus', payload);
  //   this.setState({ textColor: 'red' });
  //   this.didFocusSubscription.remove();
  //   this.didFocusSubscription = null;
  // }
  //
  // componentDidMount() {
  //   console.log('ModalScreen.componentDidMount');
  //   this.didFocusSubscription = this.props.navigation.addListener(
  //     'didFocus',
  //     () => this.didFocus,
  //   );
  // }

  render() {
    const textColor = this.props.isFocused ? 'red' : 'black';
    return (
      <AndroidBackHandler onBackPress={() => true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', }}>
          <View style={{ flex: 2, backgroundColor: 'transparent', }} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', }}>
            <Text style={{ fontSize: 30, color: textColor }}>This is a modal!</Text>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Dismiss"
            />
          </View>
          <View style={{ flex: 2, backgroundColor: 'transparent', }} />
        </View>
      </AndroidBackHandler>
    );
  }
}

export default withNavigationFocus(ModalScreen);
