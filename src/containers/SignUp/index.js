import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../components/Header/index';
import { FontAwesome } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

function SignUpScreen({ navigation }) {
    const [isShown, setIsShown] = useState(true);
    const [isAccept, setIsAccept] = useState(false);

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accept, setAccept] = useState(false);

    const [isname, isSetName] = useState(true);
    const [isemail, isSetEmail] = useState(true);
    const [ispassword, isSetPassword] = useState(true);

    const signUp = () => {                          // <= Added this function
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        
        if(username.length <= 0){
            isSetName(false);
        } else {
            isSetName(true);
        }
        if (!strongRegex.test(email)) {
            isSetEmail(false);
        } else {
            isSetEmail(true);
        }
        if (password.length < 8) {
            isSetPassword(false);
        } else {
            isSetPassword(true);
        }
        if (!isAccept) {
            setAccept(true);
        } 

        if (username.length > 0 && strongRegex.test(email) && password.length > 7) {
            setUserName('');
            setEmail('');
            setPassword('');
            navigation.navigate('step1');
        }
    }

    const checkAccept = () => {
        setIsAccept((isAccept) => !isAccept);
    }

    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    }
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
                <View style={styles.signUpContent}>
                    <Text style={styles.t20bold}>Make the most of your health</Text>
                    <Text style={[styles.t20, { fontWeight: '300', paddingTop: 20 }]}>as a member</Text>

                    <View style={{ width: '88%', marginTop: 40 }}>
                        <TextInput 
                            placeholder="UserName" 
                            style={styles.signUpInput}
                            value={username}
                            onChangeText = {(username) => setUserName(username)} />
                    </View>

                    { !isname ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                Please, enter your name!
                            </Text>  
                        ) : null
                    }

                    <View style={{ width: '88%', marginTop: 20 }}>
                        <TextInput 
                            placeholder="Email" 
                            value={email}
                            style={styles.signUpInput} 
                            onChangeText = {(email) => setEmail(email)}/>
                    </View>

                    { !isemail ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                Please, enter your Valid email!
                            </Text>  
                        ) : null
                    }

                    <View style={{ width: '88%', marginTop: 20, display: 'flex', flexDirection: 'row' }}>
                        <TextInput 
                            placeholder="Password" 
                            style={styles.signUpInput} 
                            value={password}
                            secureTextEntry={isShown}
                            onChangeText = {(password) => setPassword(password)}/>
                        <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }} onPress={togglePassword}>
                            <FontAwesome name="eye-slash" size={24} color="#999999" />
                        </TouchableOpacity>
                    </View>
                    { !ispassword ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                Required Password!
                            </Text>  
                        ) : null
                    }

                    <View style={{ paddingTop: 50, width: '88%', display: 'flex', flexWrap: "wrap", flexDirection: 'row' }}>
                        <Checkbox value={isAccept} color="#ff0000" onValueChange={checkAccept} style={styles.checkBox}
                        />
                        <Text style={[styles.t15, styles.textCenter, { fontWeight: '300' }]}>
                            I confirm that I have read and agree to the {' '}
                        </Text>
                        <TouchableOpacity>
                            <Text style={[styles.t15, styles.textCenter, styles.colorPink, { fontWeight: '300' }]}>
                                Terms and Conditions</Text>
                        </TouchableOpacity>
                        <Text style={[styles.t15, styles.textCenter, { fontWeight: '300' }]}>{' '}and{' '}</Text>
                        <TouchableOpacity>
                            <Text style={[styles.t15, styles.textCenter, styles.colorPink, { fontWeight: '300' }]}>
                                Privacy Statement.</Text>
                        </TouchableOpacity>

                        {accept ? (!isAccept ? 
                            (
                                <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                    Please, accept Terms and Conditions and Privacy statement
                                </Text>  
                            ) : null) : null
                        }
                    </View>

                    <View style={{ paddingTop: 30 }}>
                        <TouchableOpacity style={styles.signButton} onPress={signUp}>
                            <Text style={[styles.t15, styles.textCenter, styles.colorWhite, { fontWeight: '700' }]}>
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingTop: 30, width: '88%', display: 'flex', flexWrap: "wrap", flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={[styles.t15, styles.textCenter, { fontWeight: '300' }]}>
                            If you have an account, {' '}
                        </Text>
                        <TouchableOpacity>
                            <Text style={[styles.t15, styles.textCenter, styles.colorPink, { fontWeight: '300' }]}>
                                Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    signUpContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    signUpInput: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#505d68',
        borderBottomColor: '#505d68',
        borderBottomWidth: 2,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
    },
    signButton: {
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E6447D',
        backgroundColor: '#E6447D'
    },
    checkBox: {
        marginRight: 7,
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
    colorRed: {
        color: '#ff0000'
    },
    marginTop: {
        marginTop: 10
    },
    t35: {
        fontWeight: '700',
        fontSize: 35
    },
    t25: {
        fontSize: 25
    },
    t20: {
        fontSize: 20,
    },
    t20bold: {
        fontWeight: '700',
        fontSize: 21,
    },
    t15: {
        fontSize: 17,
    },
});

export default SignUpScreen;