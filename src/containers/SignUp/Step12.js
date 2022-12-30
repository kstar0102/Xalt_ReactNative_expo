import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Dimensions, Row, Switch } from 'react-native';
import Header from '../../components/Header/index';
import { Button } from 'react-native-paper';


const SCREEN_WIDTH = Dimensions.get('window').width;

function Step12Screen({ navigation }) {
    const [isSubscription, setSubscription] = useState(true);
    const [isMesasure, setMeasure] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={{ flex: 1 }}>
            <Header pressLogo={() => navigation.navigate('home')} stepStr={'12'}/>
            <ScrollView>
                <Text style={{ width: '95%', height: 10, backgroundColor: '#E6447D' }} />
                <View style={styles.step5Content}>
                    <Text style={styles.t20bold}>Payments</Text>
                    <View style={styles.tabView}>
                        <TouchableOpacity style={{ position: 'absolute', start: 0 }} onPress={() => { setSubscription(true); setMeasure(false); }}>
                            <Text style={[{ padding: 15, fontSize: 10, }, isSubscription ? { color: '#f00' } : '']}>
                                SUBSCRIPTION
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', start: '35%' }} onPress={() => { }}>
                            <Text style={{ fontSize: 10, padding: 15, color: 'grey' }}>
                                CONDITIONING{'\n    '} PRODUCT
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', end: 0 }} onPress={() => { setMeasure(true); setSubscription(false) }}>
                            <Text style={[{ padding: 15, fontSize: 10 }, isMesasure ? { color: '#f00' } : '']}>
                                MEASUREMENT{'\n'} ASSESSMENT
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        isMesasure ? (
                            <View style={[styles.tabContentView, { flexDirection: 'column', }]}>
                                <Text style={{ padding: 15, fontSize: 15, textAlign: 'center', }}>
                                    Measurement Assessment
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 12, textAlign: 'left', paddingLeft: 15, width: '65%' }}>
                                        In-depth, 90-minutes assessment with your trainer toc
                                        obtain measures of muscular strength, endurance, and
                                        mobility for more than 20 muscle groups and joint
                                        segements. Purchase includes lifetime access to a
                                        personalized report to track and compare score over
                                        time!
                                    </Text>
                                    <Text style={{ fontSize: 13, textAlign: 'right', paddingRight: 5, paddingTop: 80 }}>
                                        $150/assessment
                                    </Text>
                                </View>
                                <Text style={{ fontSize: 15, textAlign: 'left', paddingLeft: 15, marginTop: 10 }}>
                                    Total: <Text style={{ fontSize: 15, color: '#f00' }}> $150</Text>
                                </Text>
                            </View>
                        ) : null
                    }
                    {
                        isSubscription ? (
                            <View style={[styles.tabContentView, { flexDirection: 'column', display: 'flex' }, isEnabled ? { height: 300 } : '']}>
                                <Text style={{ padding: 15, fontSize: 15, textAlign: 'center', }}>
                                    Subscription
                                </Text>
                                <View style={{ flexDirection: 'row', display: 'flex', alignSelf: 'center' }}>
                                    <Switch
                                        trackColor={{ false: "#787777", true: "#F23A3A" }}
                                        thumbColor={'#fff'}
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                        style={{ height: 20 }}
                                    />
                                    <Text style={{ fontSize: 13, color: 'red' }}>
                                        Pay Monthly
                                    </Text>
                                </View>
                                {
                                    isEnabled ? (
                                        <View>
                                            <Text style={{ alignSelf: 'center', fontSize: 11 }}>
                                                No interest, no fees, no surprises.
                                            </Text>
                                            <Text style={{ alignSelf: 'center', fontSize: 13, marginTop: 10, marginBottom: 10 }}>
                                                Make the first of 12 payments now. {'\n      '}Pay the rest over 12 months.
                                            </Text>
                                        </View>
                                    ) : null
                                }
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 12, textAlign: 'left', paddingLeft: 15, width: '65%' }}>
                                        In-depth, 90-minutes assessment with your trainer toc
                                        obtain measures of muscular strength, endurance, and
                                        mobility for more than 20 muscle groups and joint
                                        segements. Purchase includes lifetime access to a
                                        personalized report to track and compare score over
                                        time!
                                    </Text>
                                    <Text style={{ fontSize: 13, textAlign: 'right', paddingRight: 5, paddingTop: 80 }}>
                                        1 day/Week
                                    </Text>
                                </View>
                                <Text style={{ fontSize: 15, textAlign: 'left', paddingLeft: 15, marginTop: 10 }}>
                                    Total: <Text style={{ fontSize: 15, color: '#f00' }}> {!isEnabled ? '$1000.0/annual' : '$85.0/monthly'}</Text>
                                </Text>
                            </View>
                        ) : null
                    }
                    <View style={{ width: '88%', marginTop: 40 }}>
                        <Text style={styles.t18bold}>Name on Card</Text>
                        <TextInput placeholder="Name" style={[styles.signUpInput]} />
                    </View>

                    <View style={{ width: '88%', marginTop: 20 }}>
                        <Text style={styles.t18bold}>Card Information</Text>
                        <TextInput placeholder="0000 0000 0000 0000" style={[styles.signUpInput]} />

                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                            <TextInput placeholder="10/24" style={[styles.paymentInput, { width: '48%' }]} />
                            <Text style={{ width: '4%' }} />
                            <TextInput placeholder="CVV" style={[styles.paymentInput, { width: '48%' }]} />
                        </View>
                    </View>

                    <View style={{ width: '88%', marginTop: 20 }}>
                        <Text style={styles.t18bold}>Coupon Code(Optinal)</Text>
                        <TextInput placeholder="Coupon Code" style={[styles.signUpInput]} />
                    </View>

                    <View style={{ marginTop: '5%' }}>
                        <TouchableOpacity style={styles.signButton} onPress={() =>
                            navigation.navigate('step2')}>
                            <Text style={[styles.t15, styles.colorWhite, { fontWeight: '700' }]}>
                                PAY NOW
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
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
            </ScrollView>
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
        marginTop: 5,
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
        marginTop: 5,
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
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 20,
        margin: 10,
        width: '88%'
    },
    tabView: {
        backgroundColor: '#ffffff',
        width: '84%',
        height: 50,
        borderBottomColor: '#ccc',
        borderLeftColor: '#ccc',
        borderRightColor: '#ccc',
        borderTopColor: '#fff',
        borderWidth: 2,
        flexDirection: 'row',
        marginTop: 10
    },
    tabContentView: {
        backgroundColor: '#ffffff',
        width: '88%',
        height: 240,
        borderBottomColor: '#ccc',
        borderLeftColor: '#ccc',
        borderRightColor: '#ccc',
        borderTopColor: '#fff',
        borderWidth: 2,
        flexDirection: 'row',
        marginTop: 20
    }
});

export default Step12Screen;