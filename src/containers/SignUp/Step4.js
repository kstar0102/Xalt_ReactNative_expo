import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

import Card from '../../components/Card';
import { Image } from 'react-native';

function Step4Screen({ navigation }) {
    let items = [
        {
            id: 0,
            icon: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df',
            description: 'Improve strength and cardiovascular fitness',
            color: '#ffffff'
        },
        {
            id: 1,
            icon: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df',
            description: 'Improve strength and cardiovascular fitness',
            color: '#ffffff'
        },
        {
            id: 2,
            icon: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df',
            description: 'Improve strength and cardiovascular fitness',
            color: '#ffffff'
        },
        {
            id: 3,
            icon: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df',
            description: 'Improve strength and cardiovascular fitness',
            color: '#ffffff'
        }
    ];
    const [bgColors, setBgColors] = useState(
        items
    );
    const setColor = (id) => {
        let newItems = [];
        newItems = bgColors.map((item) => {
            if (item.id == id) {
                if (item.color == '#ff0000') {
                    item.color = '#ffffff'
                } else {
                    item.color = '#ff0000'
                }
            }
            return item;
        });
        setBgColors(
            newItems
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Header pressLogo={() => navigation.navigate('home')} stepStr={'4'} />
            <Text style={{ width: '40%', height: 10, backgroundColor: '#E6447D' }} />
            <View style={styles.step4Content}>
                <Text style={styles.t20bold}>What are your health and fitness</Text>
                <Text style={styles.t20bold}>goals? Select up to 3 goals.</Text>

                <Text style={[styles.t18, styles.textCenter, { fontWeight: '300', marginTop: 20 }]}>
                    Defining your goals helps us match you to a coach</Text>
                <Text style={[styles.t18, styles.textCenter, { fontWeight: '300' }]}>
                    that will customize your experience to best suit</Text>
                <Text style={[styles.t18, styles.textCenter, { fontWeight: '300' }]}>
                    your needs.</Text>

            </View>
            <ScrollView >
                {
                    bgColors.map((item, id) => {

                        return (
                            <TouchableOpacity onPress={() => setColor(id)}>
                                <Card style={{
                                    height: 200,
                                    width: '80%',
                                    marginTop: 20,
                                    marginHorizontal: 40,
                                    marginBottom: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: item.color,
                                    borderWidth: 2,
                                }}>
                                    <Image
                                        source={{ uri: item.icon }}
                                        style={{ width: 100, height: 70, marginBottom: 20, }}
                                    />
                                    <Text style={styles.sectionTitle}>{item.description}</Text>
                                </Card>
                            </TouchableOpacity>
                        );
                    })
                }
                <View style={{ height: 60 }}></View>
            </ScrollView>

            <Footer navigationNext={() =>
                navigation.navigate('step5')}
                navgationPrevious={() =>
                    navigation.navigate('step3')} />
        </View>
    );
}

const styles = StyleSheet.create({
    step4Content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    t18: {
        fontSize: 16,
    },
    t20bold: {
        fontWeight: '700',
        fontSize: 21,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    card: {
        height: 200,
        width: '80%',
        marginTop: 20,
        marginHorizontal: 40,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',

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
});

export default Step4Screen;