/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import appreg from './appRegistryController';
import {name as appName} from './app.json';

// HERE WE IMPORT GAMES FROM FOLDER 'Games' :

import Balloons from './Games/Balloons/Balloons';
import Maze from './Games/Maze/Maze';
import Chickens from './Games/Chickens/Chickens';
import Dziugas from './Games/Dziugas/Dziugas';

var theprops;
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    theprops = props;
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>

              <View style={styles.button}>
                <Text>.</Text>
                <Button
                  onPress={onButtonPressedBaloons}
                  title="click for Balloons"
                  color="#841584"
                />
              </View>

              <View style={styles.button}>
                <Text>.</Text>
                <Button
                  onPress={onButtonPressedMaze}
                  title="click for Maze    "
                  color="#841584"
                />
              </View>

              <View style={styles.button}>
                <Text>.</Text>
                <Button
                  onPress={onButtonPressedChickens}
                  title="click for Chickens    "
                  color="#841584"
                />
              </View>

              <View style={styles.button}>
                <Text>.</Text>
                <Button
                  onPress={onButtonPressedDziugas}
                  title="click for Dziugas    "
                  color="#841584"
                />
              </View>


              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> APPPP11111
              </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
              </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    borderColor: "#338",
    backgroundColor: "#e7f3f2",

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  }
});


function onButtonPressedBaloons() {
  appreg.registerComponent(appName, () => Balloons);
  appreg.runApplication(appName,theprops);
}

function onButtonPressedMaze() {
  appreg.registerComponent(appName, () => Maze);
  appreg.runApplication(appName,theprops);
}

function onButtonPressedChickens() {
  appreg.registerComponent(appName, () => Chickens);
  appreg.runApplication(appName,theprops);
}

function onButtonPressedDziugas() {
  appreg.registerComponent(appName, () => Dziugas);
  appreg.runApplication(appName,theprops);
}
