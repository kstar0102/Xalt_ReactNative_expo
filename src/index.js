import React from 'react';
import { View, StyleSheet, Image, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../src/components/Header/index';

function HomeScreen({ navigation }) {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Header />
          <View>
            <Text style={[styles.t35, styles.textCenter, {paddingTop: 30}]}>
              Welcome to Your
            </Text>
            <Text style={[styles.t35, styles.textCenter, {marginTop: -10}]}>
              Health Dashboard!
            </Text>
          </View>
          <View>
            <Text style={[styles.t25, styles.textCenter, {paddingTop: 20, fontWeight: '400'}]}>
              xAlt puts a world of health & fitness into your hands.
            </Text>
            <Text style={[styles.t25, styles.textCenter, {fontWeight: '400'}]}>
              Get life-long results using proven principles.
            </Text>
          </View>
          <View style={styles.signContainner}>
            <TouchableOpacity style={styles.signButton} onPress={() =>
                navigation.navigate('login')}>
              <Text style={[styles.t15, styles.textCenter, styles.colorWhite, {fontWeight: '700'}]}>
                SIGN IN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.signButton, styles.bgPink]} onPress = {() => navigation.navigate('signup')}>
              <Text style={[styles.t15, styles.textCenter, styles.colorPink, {fontWeight: '700'}]}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainImageContent}>
            <Image
                style={styles.mainImage}
                source={require('../assets/Daco_3704977.png')}
            />
          </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainImageContent: {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 50
    },
    t35: {
      fontWeight: '700',
      fontSize: 30
    },
    t25: {
      fontSize: 18
    },
    t20: {
      fontSize: 20,
    },
    t15: {
      fontSize: 15,
    },
    colorWhite: {
      color: '#fff'
    },
    colorPink: {
      color: '#E6447D'
    },
    bgPink: {
      backgroundColor: '#fff'
    },
    mainImage: {
      height: 400,
      width: 200,
    },
    signContainner: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 40,
      paddingTop: 30,
    },
    signButton: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: '#E6447D',
      backgroundColor: '#E6447D'
    },
    textCenter: {
      textAlign: 'center'
    }
});

export default HomeScreen;