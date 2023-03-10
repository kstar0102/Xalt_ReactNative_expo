import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

import CheckBox from 'expo-checkbox';

const initialState = {
    high_energy: false,
    sense_humour: false,
    calm_cool: false,
    analyitical_result: false,
    always_positive: false,
    every_time: false,
    drill_sergeant: false,
    no_preference: false,
    stricly_business: false,
};

function Step7Screen({ navigation }) {
    const [state, setState] = React.useState(initialState);
    const [isFirst, setIsFirst] = useState(false);

    return (
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} stepStr={'7'}/>
                <Text style={{width: '70%', height: 10, backgroundColor: '#E6447D'}} />
                <View style={styles.headercontain}>
                    <Text style={styles.t20bold}>How would you describe your ideal</Text>
                    <Text style={styles.t20bold}>coach? Select all that apply.</Text>
                </View>

                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.high_energy}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, high_energy: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>High Energy</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.sense_humour}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, sense_humour: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Has a sense of humour</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.calm_cool}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, calm_cool: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Calm and cool</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.analyitical_result}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, analyitical_result: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Analyitical and results driven</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.always_positive}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, always_positive: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Always positive</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.every_time}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, every_time: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Goes the extra mile every time</Text>
                </View>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.drill_sergeant}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, drill_sergeant: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Drill Sergeant</Text>
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
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={state.stricly_business}
                        color="#E81E63"
                        onValueChange={value =>
                            setState({
                                ...state, stricly_business: value,
                            })
                        }
                    />
                    <Text style={styles.t18}>Stricly business</Text>
                </View>

                {
                isFirst ?
                    (<Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000' }]}>
                        You must choose at least 1 option!
                    </Text>) : null

                }

                <Footer navigationNext={() => { if ((!state.high_energy && !state.sense_humour && !state.calm_cool && !state.analyitical_result && !state.always_positive && !state.every_time && !state.drill_sergeant && !state.no_preference && !state.stricly_business)) { setIsFirst(true); } else { setIsFirst(false); navigation.navigate('step8'); } }}
                                navgationPrevious={() =>
                                navigation.navigate('step6')}/>


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

export default Step7Screen;