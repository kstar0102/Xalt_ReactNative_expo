import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function Header({ pressLogo }) {
    return (
        <View style={styles.headerContainner}>
            <TouchableOpacity onPress={pressLogo}>
                <Image
                    style={styles.logoImage}
                    source={require('../../../assets/logo.png')}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logoImage: {
        width: 59,
        height: 18
    },
    headerContainner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff'
    },
});

export default Header;