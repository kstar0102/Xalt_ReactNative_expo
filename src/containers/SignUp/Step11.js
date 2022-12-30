import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/index';

function Step11Screen({ navigation }) {
    return (
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} stepStr={'11'}/>
                <Text style={{width: '90%', height: 10, backgroundColor: '#E6447D'}} />
                <View style={styles.step5Content}>
                    <Text style={styles.t20bold}>Get started with a Coach!</Text>
                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300', marginTop: 20 }]}>
                        These coaches are experts in training for your</Text>
                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300'}]}>
                        goals. Selet a coach to get started on your health</Text>
                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300'}]}>
                        and fitness journey!</Text>

                </View>
                <View style={[ { flexDirection: 'row', justifyContent:'center', position: 'absolute', bottom: 10, left: 10}]}>
                    <View style={{ paddingTop: 200, alignSelf: 'flex-start', }}>
                        <TouchableOpacity style={styles.previousButton} onPress={() =>
                            navigation.navigate('step8')}>
                            <Text style={[styles.t15, styles.colorPink, { fontWeight: '700' }]}>
                                PREVIOUS
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ width: "10%" }} />
                    <View style={{ paddingTop: 130, alignSelf: 'flex-end', }}>
                        <TouchableOpacity style={styles.signButton} onPress={() =>
                            navigation.navigate('step12')}>
                            <Text style={[styles.t15, styles.colorWhite, { fontWeight: '700' }]}>
                                NEXT
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingTop: 200, alignSelf: 'flex-end', marginLeft:10}}>
                        <TouchableOpacity style={styles.previousButton} onPress={() =>
                            navigation.navigate('step12')}>
                            <Text style={[styles.t15, styles.colorPink, { fontWeight: '700' }]}>
                                SKIP
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    step5Content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    t18: {
        fontSize: 16,
    },
    t20bold: {
        fontWeight: '700',
        fontSize: 21,
    },
    signButton: {
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E6447D',
        backgroundColor: '#E6447D'
    },
    previousButton: {
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#E6447D',
        backgroundColor: '#FEF9FB'
    },
    skipButton: {
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#E6447D',
        backgroundColor: '#FEF9FB'
    },
    bgPink: {
        backgroundColor: '#FEF9FB'
    },
    textCenter: {
        textAlign: 'center'
    },
    colorPink: {
        color: '#E6447D'
    },
    colorWhite: {
        color: '#fff'
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 10, //Here is the trick
    },
});

export default Step11Screen;