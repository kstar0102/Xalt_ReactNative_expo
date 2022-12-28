import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';


function Step5Screen({ navigation }) {
    return (
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
                <Text style={{width: '50%', height: 10, backgroundColor: '#E6447D'}} />
                <View style={styles.step5Content}>
                    <Text style={styles.t20bold}>Almost Done!</Text>
                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300', marginTop: 20 }]}>
                        We have a few questions about who yur ideal</Text>
                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300'}]}>
                        coach would be.</Text>

                   
                </View>
                <Footer navigationNext={() =>
                            navigation.navigate('step6')} 
                            navgationPrevious={() =>
                            navigation.navigate('step4')}/>
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