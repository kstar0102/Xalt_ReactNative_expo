import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownComponent from '../DropDown';

function Header({ pressLogo, stepStr, isLogin }) {
    const [savedUser, setUser] = useState('');
    const createAlert = () => {
        Alert.alert(
            "LogOut",
            "Are you sure to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: pressLogo
                }
            ],
            { cancelable: true }
        );
    }
    const getUser = async () => {
        try {
            const tempUser = await AsyncStorage.getItem("user");
            setUser(tempUser);
        } catch (error) {
            console.log(error);
        }
    };
    getUser();
    return (
        <View style={styles.headerContainner}>
            <TouchableOpacity onPress={pressLogo}>
                <Image
                    style={styles.logoImage}
                    source={require('../../../assets/logo.png')}
                />
                {
                    stepStr != null ?
                        (
                            stepStr != 'Final Step' ?
                                (<Text style={{ fontSize: 12, marginTop: 5 }}>
                                    Step {stepStr} of 12
                                </Text>) : (
                                    <Text style={{ fontSize: 12, marginTop: 5 }}>
                                        {stepStr}
                                    </Text>
                                )
                        )
                        : null
                }
            </TouchableOpacity>
            {
                !isLogin ? (
                    <TouchableOpacity onPress={createAlert} style={{ position: 'absolute', right: 10 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <SvgUri
                                width="50"
                                height="20"
                                uri="http://10.10.10.49:3004/assets/icons/empty-user-profile.svg"
                            />
                            <Text style={{ fontSize: 17, marginRight: 10, width: 70 }}>
                                {savedUser}
                            </Text>
                            <FontAwesome name="chevron-down" size={20} color="#FF0000" />
                        </View>
                    </TouchableOpacity>
                ) : null
            }
            <DropdownComponent></DropdownComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    logoImage: {
        width: 59,
        height: 18
    },
    headerContainner: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
});

export default Header;