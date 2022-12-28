import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/index';
import CheckBox from 'expo-checkbox';

const initialState = {
    Gym: false,
    Fitness_Studio: false,
    Home: false,
    Outdoors: false,
    dont_exercise: false,
};

function Step3Screen({ navigation }) {
    const [state, setState] = React.useState(initialState);

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
                <View style={styles.headercontain}>
                    <Text style={styles.t20bold}>Where do you typically exercise?</Text>
                    <Text style={styles.t20bold}>Choose all that apply.</Text>
                </View>

                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.Gym}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, Gym: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Gym</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.Fitness_Studio}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, Fitness_Studio: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Fitness Studio</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.Home}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, Home: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Home</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.Outdoors}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, Outdoors: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Outdoors</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.dont_exercise}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, dont_exercise: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>I don't exercise at the moment</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent:'center', marginTop:'85%' }}>
                        <View style={{  alignSelf: 'flex-start',}}>
                            <TouchableOpacity style={styles.previousButton} onPress={() =>
                                navigation.navigate('step2')}>
                                <Text style={[styles.t15, styles.colorPink, { fontWeight: '700' }]}>
                                    PREVIOUS
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style = {{width: "20%"}}/>
                        <View style={{ alignSelf: 'flex-end',  }}>
                            <TouchableOpacity style={styles.signButton} onPress={() =>
                                navigation.navigate('step4')}>
                                <Text style={[styles.t15, styles.colorWhite, { fontWeight: '700' }]}>
                                    NEXT
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


            </View>
        </ScrollView>
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

export default Step3Screen;