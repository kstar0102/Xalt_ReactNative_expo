import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import Header from '../../components/Header/index';
import Overlay from 'react-native-modal-overlay';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarPicker from 'react-native-calendar-picker';

function ListDetail({ route, navigation }) {
    const [isVisible, setisVisible] = useState(false);
    const [date, setDate] = useState("")
    const [datecolor, setDateColor] = useState("")

    const [lastDate, setLastDate] = useState('');
    const [startDate, setStartDate] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = (flag) => {
        flag ? setStartDate(true) : setStartDate(false);
        console.log("startdate:" + startDate);
        console.log("date: " + date);
        console.log("lastdate: " + lastDate);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        startDate ? setDate(date) : setLastDate(date);
        hideDatePicker();
    };

    const getDate = () => {
        let tempDate = date.toString().split(' ');
        return date !== ''
            ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
            : '';
    };

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

    const createAlert = () =>
    Alert.alert(
      "Alert",
      "Do you want to enroll in this challenge?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
                <Text style={styles.detailTitle}>Test 1 Challenge</Text>

                {/* <View style = {styles.youtubeView}>

                </View> */}

                <View style={styles.detailView}>
                    <Text style={styles.t18}>Description</Text>
                    <Text style={styles.t15}>aaa</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.t16}>Participants:</Text>
                        <Text style={styles.t15}> 3</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '88%' }}>
                        <Text style={styles.t16}>Schedule:</Text>
                        <Text style={styles.t15}> Monday, Tuesday, Wedenesday Friday</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row', width: '88%', alignItems: 'center',
                    marginLeft: '6%', marginTop: 10
                }}>
                    <TouchableOpacity style={[styles.detailCalbutton,
                    { backgroundColor: '#fff', width: '55%' }]}>
                        <Text style={[styles.t15, { fontWeight: '700' }]}>
                            testUser
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.detailCalbutton,
                    { backgroundColor: '#fff', width: '45%' }]}>
                        <Text style={[styles.t15, { fontWeight: '700', color:'#E6447D'}]}>
                            Select Different User
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <Calendar
                    markedDates={{
                        [date]: { selected: true, marked: true, selectedColor: 'blue' },
                    }}
                    current={getCurrentDate().toString()}
                    minDate={getMinDate().toString()}
                    maxData={'2023-01-10'}
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
                    style={{ width: '88%', marginLeft: '6%' }}
                /> */}

                <CalendarPicker 
                    style={{ width: '88%', marginLeft: '6%' }}
                    startFromMonday = {true}
                    allowRangeSelection = {false}
                    disabledDates = {['2023-01-15', '2023-01-16']}
                    minDate = {getCurrentDate()}
                    maxDate = {new Date(2050,6,3)}
                    weekdays = {['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                    selectedDayColor = '#E6447D'
                    selectedStartDate = '2023-01-01'
                    selectedEndDate = '2023-01-03'
                    onDateChange={() => console.log('aaaaa')}
                />

                <View style={{ alignSelf: 'flex-start', marginLeft: '6%', marginTop: 10 }}>
                    <TouchableOpacity style={styles.detailbutton} onPress={() => {
                        setisVisible(true);
                    }}>
                        <Text style={[styles.t14, { fontWeight: '400' }]}>
                            CHECK IN
                        </Text>
                    </TouchableOpacity>
                </View>

                <Overlay 
                visible={isVisible} 
                onClose={() => setisVisible(false)}
                containerStyle={{backgroundColor: 'rgba(156, 156, 157, 0.68)'}}
                closeOnTouchOutside>
                    <View style = {{alignItems: "flex-start", width:'100%'}}>
                        <Text style = {styles.modalTitle}>CheckIn</Text>

                        <View style={{ width: '60%', marginTop: 10 }}>
                            <TextInput placeholder="Start date" value={getDate()}
                                style={[styles.dateInput]} onFocus={() => showDatePicker(true)} />
                        </View>

                        <View style={{ width: '100%', marginTop: 10 }}>
                            <TextInput multiline={true} numberOfLines={4}
                                placeholder="What did you do today?" style={[styles.loginInput]} />
                        </View>

                        <View style={{ width: '100%', marginTop: 10 }}>
                            <TextInput placeholder="Link ot proof(optional)" style={[styles.loginInput]} />
                        </View>

                        <View style = {{flexDirection:'row', marginTop:15}}>
                            <View style={{ alignSelf: 'flex-end',  }}>
                                <TouchableOpacity style={styles.signButton}>
                                    <Text style={[styles.t15, styles.colorWhite, { fontWeight: '700', color:'#fff' }]}>
                                        SUBMIT
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style = {{width: "10%"}}/>
                            <View style={{  alignSelf: 'flex-start',}}>
                                <TouchableOpacity style={styles.closeButton} 
                                onPress = {() => setisVisible(false)}>
                                    <Text style={[styles.t15, { fontWeight: '700' }]}>
                                        CLOSE
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                </Overlay>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <Text style={[styles.t18, {marginLeft: '6%', marginTop: 20}]}>Challenge Management</Text>

                <View style={{
                    flexDirection: 'row', width: '88%', alignItems: 'center',
                    marginLeft: '5%', marginTop: 10
                }}>
                    <TouchableOpacity style={styles.detailbutton1}>
                        <Text style={[styles.t14, { fontWeight: '400' }]}>
                            Approve Check-ins
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.detailbutton1, { marginHorizontal: 5 }]}>
                        <Text style={[styles.t14, { fontWeight: '400' }]}>
                            Edit Challenge
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailbutton1}>
                        <Text style={[styles.t14, { fontWeight: '400' }]}>
                            Share Challenge
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignSelf: 'center', marginLeft: '6%', marginTop: 10 }}>
                    <TouchableOpacity style={styles.detailbutton} onPress = {createAlert}>
                        <Text style={[styles.t14, { fontWeight: '400' }]}>
                            Leave Challenge
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignSelf: 'flex-end', marginRight: '6%', marginTop: 10, marginBottom: 30 }}>
                    <TouchableOpacity style={styles.signButton} onPress={() => navigation.navigate('main')}>
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
    dateInput: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#505d68',
        borderBottomColor: '#505d68',
        borderBottomWidth: 2,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
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
    youtubeView: {
        width: '88%',
        height: 280,
        backgroundColor: "#474747",
        alignSelf: 'center'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        height: '50%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
        marginLeft: 40,
    },
    detailView: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#E6447D',
        backgroundColor: '#FEF9FB',
        width: '88%',
        alignSelf: 'center',
        marginTop: 20
    },
    detailTitle: {
        color: '#E6447D',
        fontSize: 21,
        fontWeight: '500',
        marginTop: 10,
        marginLeft: '6%',
        marginBottom: 10
    },
    modalTitle: {
        fontSize: 21,
        fontWeight: '500',
        marginLeft: 5,
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
    closeButton: {
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#000',
        backgroundColor: '#fofofo'
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