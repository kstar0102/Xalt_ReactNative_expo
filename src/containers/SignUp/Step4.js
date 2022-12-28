import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

import Card from '../../components/Card';

function Step4Screen({ navigation }) {
    return(
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
                <Text style={{width: '40%', height: 10, backgroundColor: '#E6447D'}} />
                <View style={styles.step4Content}>
                    <Text style={styles.t20bold}>What are your health and fitness</Text>
                    <Text style={styles.t20bold}>goals? Select up to 3 goals.</Text>

                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300', marginTop: 20 }]}>
                        Defining your goals helps us match you to a coach</Text>
                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300'}]}>
                        that will customize your experience to best suit</Text>
                    <Text style={[styles.t18, styles.textCenter, { fontWeight: '300'}]}>
                        your needs.</Text>

                    <Card style={styles.card}>
                        <Text style={styles.sectionTitle}>Basic CardView Example</Text>
                    </Card>

                    
                </View>
                <Footer navigationNext={() =>
                                navigation.navigate('step5')} 
                                navgationPrevious={() =>
                                navigation.navigate('step3')}/>
            </View>
    );
}

const styles = StyleSheet.create({
    step4Content: {
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
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    card: {
        height: 200,
        width: '90%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
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

export default Step4Screen;