import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../components/Header/index';

function DetailScreen({ navigation }) {
    return(
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

});

export default DetailScreen;