import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/index';

function Step12Screen({ navigation }) {
    return (
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
                <Text style={{width: '95%', height: 10, backgroundColor: '#E6447D'}} />
                <View style={styles.step5Content}>
                    <Text style={styles.t20bold}>Payments</Text>

                    <View style={{ width: '88%', marginTop: 40 }}>
                        <Text style={styles.t18bold}>Name on Card</Text>
                        <TextInput placeholder="Name" style={[styles.signUpInput]} />
                    </View>
                    
                    <View style={{ width: '88%', marginTop: 20 }}>
                        <Text style={styles.t18bold}>Card Information</Text>
                        <TextInput placeholder="0000 0000 0000 0000" style={[styles.signUpInput]} />

                        <View style = {{flexDirection:'row', width: '100%', marginTop: 10}}>
                            <TextInput placeholder="10/24" style={[styles.paymentInput, {width:'48%'}]} />
                            <Text style = {{width : '4%'}} />
                            <TextInput placeholder="CVV" style={[styles.paymentInput, {width:'48%'}]} />
                        </View>
                    </View>

                    <View style={{ width: '88%', marginTop: 20 }}>
                        <Text style={styles.t18bold}>Coupon Code(Optinal)</Text>
                        <TextInput placeholder="Coupon Code" style={[styles.signUpInput]} />
                    </View>

                    <View style={{marginTop: '5%'}}>
                        <TouchableOpacity style={styles.signButton} onPress={() =>
                            navigation.navigate('step2')}>
                            <Text style={[styles.t15, styles.colorWhite, { fontWeight: '700' }]}>
                                PAY NOW
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ paddingTop: 150, alignSelf: 'flex-start', }}>
                            <TouchableOpacity style={styles.previousButton} onPress={() =>
                                navigation.navigate('step11')}>
                                <Text style={[styles.t15, styles.colorPink, { fontWeight: '700' }]}>
                                    PREVIOUS
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ width: "20%" }} />
                        <View style={{ paddingTop: 130, alignSelf: 'flex-end', }}>
                            <TouchableOpacity style={styles.previousButton} onPress={() =>
                                navigation.navigate('step13')}>
                                <Text style={[styles.t15, styles.colorPink, { fontWeight: '700' }]}>
                                    SKIP
                                </Text>
                            </TouchableOpacity>
                        </View>
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
    signUpInput: {
        width: '100%',
        marginTop:5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#505d68',
        borderBottomColor: '#505d68',
        borderBottomWidth: 2,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
    },
    paymentInput: {
        width: '50%',
        marginTop:5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#505d68',
        borderBottomColor: '#505d68',
        borderBottomWidth: 2,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
    },
  
    t18: {
        fontSize: 16,
    },
    t18bold: {
        fontSize: 18,
        fontWeight: '700',
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

export default Step12Screen;