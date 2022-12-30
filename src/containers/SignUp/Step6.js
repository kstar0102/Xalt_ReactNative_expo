import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

import CheckBox from 'expo-checkbox';

const initialState = {
    male: false,
    female: false,
    other: false,
    no_preference: false,
};

function Step6Screen({ navigation }) {
    const [state, setState] = React.useState(initialState);
    const [isFirst, setIsFirst] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <Header pressLogo={() => navigation.navigate('home')} stepStr={'6'}/>
            <Text style={{ width: '60%', height: 10, backgroundColor: '#E6447D' }} />
            <View style={styles.headercontain}>
                <Text style={styles.t20bold}>For your ideal coach, what gender do</Text>
                <Text style={styles.t20bold}>you prefer?</Text>
            </View>

            <View style={styles.checkboxWrapper}>
                <CheckBox
                    value={state.male}
                    color="#E81E63"
                    onValueChange={value =>
                        setState({
                            ...state, male: value,
                        })
                    }
                />
                <Text style={styles.t18}>Male</Text>
            </View>
            <View style={styles.checkboxWrapper}>
                <CheckBox
                    value={state.female}
                    color="#E81E63"
                    onValueChange={value =>
                        setState({
                            ...state, female: value,
                        })
                    }
                />
                <Text style={styles.t18}>Female</Text>
            </View>
            <View style={styles.checkboxWrapper}>
                <CheckBox
                    value={state.other}
                    color="#E81E63"
                    onValueChange={value =>
                        setState({
                            ...state, other: value,
                        })
                    }
                />
                <Text style={styles.t18}>Other</Text>
            </View>
            <View style={styles.checkboxWrapper}>
                <CheckBox
                    value={state.no_preference}
                    color="#E81E63"
                    onValueChange={value =>
                        setState({
                            ...state, no_preference: value,
                        })
                    }
                />
                <Text style={styles.t18}>No Preference</Text>
            </View>

            {
                isFirst ?
                    (<Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000' }]}>
                        You must choose at least 1 option!
                    </Text>) : null

            }

            <Footer navigationNext={() => { if ((!state.male && !state.female && !state.other && !state.no_preference)) { setIsFirst(true); } else { setIsFirst(false); navigation.navigate('step7'); } }}
                navgationPrevious={() =>
                    navigation.navigate('step5')} />


        </View>
    );

}

const styles = StyleSheet.create({
    headercontain: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    rangeView: {
        flexDirection: "row",
    },
    checkboxWrapper: {
        flexDirection: 'row',
        marginLeft: '10%',
        marginTop: 20,
        alignItems: 'flex-start',
        paddingVertical: 5,
    },
    t18: {
        fontSize: 18,
        marginLeft: 10,
        marginTop: -3
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
    dayButton: {
        marginTop: 30,
        paddingVertical: 13,
        paddingHorizontal: 40,
        borderRadius: 10,
        borderWidth: 1.5,
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

export default Step6Screen;