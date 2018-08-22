import React from 'react';
import { Button, View, Text, Animated, Easing } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

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

  onComplete() {
    this.props.navigation.goBack();
  }

  render() {
    // const textColor = this.props.isFocused ? 'red' : 'black';
    // const backgroundColor = 'rgba(0, 0, 0, 0.8)';
    const backgroundColor = 'transparent';
    return (
      <AndroidBackHandler onBackPress={() => true}>
        <View style={{ flex: 1, backgroundColor, }}>
          {this.props.renderChildren(this.onComplete.bind(this))}
        </View>
      </AndroidBackHandler>
    );
  }
}

export default withMappedNavigationProps()(withNavigationFocus(ModalScreen));
