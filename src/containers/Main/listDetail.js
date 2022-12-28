import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, Button, ScrollView } from 'react-native';
import Header from '../../components/Header/index';
import {Calendar} from 'react-native-calendars';

function ListDetail({ route, navigation }) {   
    const [date, setDate] = useState("")
    const [datecolor,setDateColor]=useState("")

    const addZero = (a) => {
        if (a < 10 && a > 0) {
            return '0' + a.toString();
        } else {
            return a;
        }
    }
    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return year + '-' + addZero(month) + '-' + addZero(date);//yyyy-mm-dd
    }

    const getMinDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return year + '-' + addZero(month) + '-' + addZero(date);//yyyy-mm-dd
    }
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
                <Text style = {styles.detailTitle}>Test 1 Challenge</Text>

                <View style = {styles.youtubeView}>

                </View>

                <View style = {styles.detailView}>
                    <Text style = {styles.t18}>Description</Text>
                    <Text style = {styles.t15}>aaa</Text>

                    <View style = {{flexDirection:'row'}}>
                        <Text style = {styles.t16}>Participants:</Text>
                        <Text style = {styles.t15}> 3</Text>
                    </View>

                    <View style = {{flexDirection:'row', width:'88%'}}>
                        <Text style = {styles.t16}>Schedule:</Text>
                        <Text style = {styles.t15}> Monday, Tuesday, Wedenesday Friday</Text>
                    </View>
                </View>

                <View style = {{flexDirection: 'row', width: '88%', alignItems:'center', 
                marginLeft:'6%', marginTop:10}}>
                    <TouchableOpacity style={[styles.detailCalbutton, 
                        {backgroundColor: '#fff', width:'60%'}]}>
                        <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                            testUser
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.detailCalbutton, 
                        {backgroundColor: '#fff', width:'40%'}]}>
                        <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                            Select Otheruser
                        </Text>
                    </TouchableOpacity>                                                             
                </View>

                <Calendar
                    markedDates={{
                    [date]: { selected: true, marked: true, selectedColor: 'blue' },
                    }}
                    current={getCurrentDate().toString()}
                    minDate={getMinDate().toString()}
                    maxData={'2050-01-01'}
                    monthFormat={'MMMM yyyy'}
                    onDayPress={(day) => {
                    setDate(day.dateString);
                    setDateColor('#000');
                    }}
                    hideArrows={false}
                    hideExtraDays={true}
                    disableMonthChange={false}
                    firstDay={1}
                    theme={{
                    todayTextColor: 'red',
                    }}
                    style = {{width: '88%', marginLeft:'6%'}}
                />

                <View style={{alignSelf: 'flex-start', marginLeft:'6%', marginTop:10}}>
                    <TouchableOpacity style={styles.detailbutton}>
                        <Text style={[styles.t14, { fontWeight: '400' }]}>
                            Check In
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style = {{flexDirection: 'row', width: '88%', alignItems:'center', 
                marginLeft:'5%', marginTop:10}}>
                    <TouchableOpacity style={styles.detailbutton1}>
                        <Text style={[styles.t14, { fontWeight: '400'}]}>
                            Approve Challenge
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.detailbutton1, {marginHorizontal:5} ]}>
                        <Text style={[styles.t14, { fontWeight: '400'}]}>
                            Edit Challenge
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailbutton1}>
                        <Text style={[styles.t14, { fontWeight: '400' }]}>
                            Share Challenge
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{alignSelf: 'flex-start', marginLeft:'6%', marginTop:10}}>
                    <TouchableOpacity style={styles.detailbutton}>
                        <Text style={[styles.t14, { fontWeight: '400' }]}>
                            Leave Challenge
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{alignSelf: 'flex-end', marginRight:'6%', marginTop:10, marginBottom:30}}>
                    <TouchableOpacity style={styles.signButton} onPress = {() => navigation.navigate('main')}>
                        <Text style={[styles.t16, { fontWeight: '400', color: '#fff' }]}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    youtubeView:{
        width:'88%',
        height:280,
        backgroundColor: "#474747",
        alignSelf:'center'
    },
    detailView:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#E6447D',
        backgroundColor: '#FEF9FB',
        width:'88%',
        alignSelf:'center',
        marginTop: 20
    },
    detailTitle:{
        color: '#E6447D',
        fontSize: 21,
        fontWeight: '500',
        marginTop: 10,
        marginLeft: '6%',
        marginBottom: 10
    },
    detailbutton: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: '#000',
        backgroundColor: '#fofofo',
    },

    detailbutton1: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: '#000',
        backgroundColor: '#fofofo',
    },
    detailCalbutton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    signButton: {
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E6447D',
        backgroundColor: '#E6447D'
    },
    t18: {
        fontSize: 18,
    },
    t14: {
        fontSize: 14,
    },
    t16: {
        fontSize: 16,
    },
});

export default ListDetail;