import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Footer({ navigationNext, navgationPrevious }) {
    return (
        <View style={[styles.bottomView, { flexDirection: 'row', justifyContent:'center',  }]}>
            <View style={{  alignSelf: 'flex-start',}}>
                <TouchableOpacity style={styles.previousButton} onPress={navgationPrevious}>
                    <Text style={[styles.t15, styles.colorPink, { fontWeight: '700' }]}>
                        PREVIOUS
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style = {{width: "20%"}}/>
            <View style={{ alignSelf: 'flex-end',  }}>
                <TouchableOpacity style={styles.signButton} onPress={navigationNext}>
                    <Text style={[styles.t15, styles.colorWhite, { fontWeight: '700' }]}>
                        NEXT
                    </Text>
                </TouchableOpacity>
            </View>
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

    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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

export default Footer;