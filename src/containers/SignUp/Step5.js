import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/index';

function Step5Screen({ navigation }) {
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
                <View style={styles.step5Content}>
                    <Text style={styles.t20bold}>Almost Done!</Text>
                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300', marginTop: 20 }]}>
                        We have a few questions about who yur ideal</Text>
                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300'}]}>
                        coach would be.</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 200, alignSelf: 'flex-start', }}>
                            <TouchableOpacity style={styles.previousButton} onPress={() =>
                                navigation.navigate('step4')}>
                                <Text style={[styles.t15, styles.colorPink, { fontWeight: '700' }]}>
                                    PREVIOUS
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ width: "20%" }} />
                        <View style={{ paddingTop: 130, alignSelf: 'flex-end', }}>
                            <TouchableOpacity style={styles.signButton} onPress={() =>
                                navigation.navigate('step6')}>
                                <Text style={[styles.t15, styles.colorWhite, { fontWeight: '700' }]}>
                                    NEXT
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
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
});

export default Step5Screen;