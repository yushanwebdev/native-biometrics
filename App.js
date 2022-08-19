/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableHighlight,
  Linking,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ReactNativeBiometrics from 'react-native-biometrics';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';

  // .then(resultObject => {
  //   const {available, biometryType} = resultObject;
  //   if (available && biometryType === ReactNativeBiometrics.Biometrics) {
  //     console.log('TouchID is supported', biometryType);
  //   }

  //   // if (available && biometryType === ReactNativeBiometrics.TouchID) {
  //   // } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
  //   //   console.log('FaceID is supported');
  //   // } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
  //   //   console.log('Biometrics is supported');
  //   // } else {
  //   //   console.log('Biometrics not supported');
  //   // }
  // });

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onEnableBiometric = async () => {
    let {available, biometryType} =
      await ReactNativeBiometrics.isSensorAvailable();
    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      console.log('TouchID is supported', biometryType);
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      console.log('FaceID is supported', biometryType);
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      console.log('Biometrics is supported', biometryType);

      ReactNativeBiometrics.createKeys().then(resultObject => {
        const {publicKey} = resultObject;
        console.log('publicKey', publicKey);
      });
    } else {
      await Linking.openSettings();
    }
  };

  const isBiometricSupport = async () => {
    let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
    let payload = epochTimeSeconds + 'some message';

    ReactNativeBiometrics.createSignature({
      promptMessage: 'Sign in',
      payload: payload,
    }).then(resultObject => {
      const {success, signature} = resultObject;

      console.log('resultObject', resultObject);

      if (success) {
        console.log(signature);
      }
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <TouchableHighlight
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 60,
          }}>
          <Button
            title="Enable Biometric Authentication"
            color="#fe7005"
            onPress={onEnableBiometric}
          />
        </TouchableHighlight>
        <TouchableHighlight
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 60,
          }}>
          <Button
            title="Login with Biometrics"
            color="#fe7005"
            onPress={isBiometricSupport}
          />
        </TouchableHighlight>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug" onClick={isBiometricSupport}>
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
