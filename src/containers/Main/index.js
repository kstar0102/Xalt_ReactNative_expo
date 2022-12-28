import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import Header from '../../components/Header/index';
import List from '../../components/List'
import { FontAwesome, AntDesign } from '@expo/vector-icons';

function MainScreen({ navigation }) {
    const [isVisible, setisVisible] = useState(false);

    return(
        <View style={{ flex: 1 }}>
            <Header pressLogo={() => navigation.navigate('home')} />
            <View style={styles.mainContent}>
                <View style = {{flexDirection:'row'}}>
                    <TouchableOpacity id = 'topbutton' style={styles.Topbutton} onPress={() =>
                        navigation.navigate('main')}>
                        <Text style={[styles.t15, styles.textCenter, styles.colorWhite, { fontWeight: '700' }]}>
                            TOP
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Topbutton} onPress={() =>
                        navigation.navigate('main')}>
                        <Text style={[styles.t15, styles.textCenter, styles.colorWhite, { fontWeight: '700' }]}>
                            OWNED BY YOU
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Topbutton} onPress={() =>
                        navigation.navigate('main')}>
                        <Text style={[styles.t15, styles.textCenter, styles.colorWhite, { fontWeight: '700' }]}>
                            ENROLLED
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Topbutton} onPress={() =>
                        navigation.navigate('main')}>
                        <FontAwesome name="search" size={13} color="#000" style = {{marginTop:3}} />
                    </TouchableOpacity>
                </View>

                <List />

                <TouchableOpacity style={styles.addbutton} onPress={() => {
                    setisVisible(true);
                }}>
                    <View style = {{flexDirection:'row'}}>
                        <AntDesign name="pluscircleo" size={15} color="#E6447D" style = {{marginTop:2, marginRight:5}} />
                        <Text style={[styles.t15, styles.textCenter, styles.colorPink, { fontWeight: '700' }]}>
                            Add New Challenge
                        </Text>
                    </View>
                </TouchableOpacity>

                <Modal
                    animationType = {"slide"}
                    transparent={false}
                    visible={isVisible}>
                    <View style = {styles.modalcontain}>
                        <Text style = { styles.modalHeader }>New Challenge</Text>
                        <View style={{ width: '88%', marginTop: 10 }}>
                            <TextInput placeholder="Name of Challenge..." style={[styles.loginInput]} />
                        </View>

                        <View style={{ width: '88%', marginTop: 10 }}>
                            <TextInput multiline = {true} numberOfLines={4} 
                            placeholder="Description of How to Perform Challenge..." style={[styles.loginInput]} />
                        </View>

                        <View style={{ width: '88%', marginTop: 10 }}>
                            <TextInput placeholder="Reward to consistent participants(if any)" style={[styles.loginInput]} />
                        </View>

                        <Text 
                            style={styles.closeText}
                            onPress={() => {
                            setisVisible(false);}}>Close Modal</Text>
                    </View>
                    
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    modalcontain: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    Topbutton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff'
    },
    addbutton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: '#000',
        backgroundColor: '#fff',
    },
    colorPink: {
        color: '#E6447D'
    },
    loginInput: {
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
    modalHeader: {
        fontWeight: '700',
        fontSize: 21,
        color: '#E6447D',
        alignSelf:'flex-start',
        marginLeft:'6%'
    },
    signButton: {
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E6447D',
        backgroundColor: '#E6447D'
    },
});

export default MainScreen;