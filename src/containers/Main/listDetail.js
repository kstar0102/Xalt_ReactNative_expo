import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, Alert, ScrollView } from 'react-native';
import Header from '../../components/Header/index';
import { Calendar } from 'react-native-calendars';
import Overlay from 'react-native-modal-overlay';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { useForm, Controller, set } from 'react-hook-form';
import Checkbox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker'
import * as videoType from '../../utilities/videoType';

const toDataModelValues = (values) => {
    return {
      name: values.challenge_name,
      description: values.description,
      schedule: `${values.monday ? 'M' : '-'}${values.tuesday ? 'T' : '-'}${
        values.wednesday ? 'W' : '-'
      }${values.thursday ? 'R' : '-'}${values.friday ? 'F' : '-'}`,
      category: values.category,
      video_url: values.video_url,
      incentives: values.incentives,
      start: values.start_date,
      end: values.end_date,
    };
  };
  
  const validate = (values) => {
    const errors = {};
    if (values.challenge_name == '') {
      errors.challenge_name = 'Must specify a name';
    }
  
    if (values.challenge_name.length >= 50) {
      errors.challenge_name = 'Name too long, name name cannot be longer than 50 characters';
    }
    if (values.description == '') {
      errors.description = 'Must provide a description';
    }
    if (
      !['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].some((value) => {
        return values[value];
      })
    ) {
      errors.schedule = 'Must select at least one day';
    }
    if (values.category == '') {
      errors.category = 'Please select a theme for your challenge';
    }
    if (values.start_date == '' || values.end_date == '') {
      errors.date_range = 'Must specify both a start and end time for the challenge';
    }
  
    if (!values.is_confirmed) {
      errors.is_confirmed = 'Please confirm that your video meets the criteria';
    }
    if (!videoType.validVimeoLink(values.video_url) && !videoType.validYoutubeLink(values.video_url)) {
      errors.video_url = 'Please provide a valid youtube or vimeo link';
    }
    console.log(errors, '33333')
    return errors;
  };
function ListDetail({ route, navigation }) {
    const [enrolled, setEnrolled] = useState(false);
    useEffect(() => {
        let temp = route.params.challenge;
        setEnrolled(
            temp != null &&
              temp.user_member_challenges.find((user_member_challenge) => {
                return user_member_challenge.user_id == route.params.user_id;
              }) != null);
        setChallenge(temp);
        setGenderValue(temp.category);
        setFormData({
            challenge_name: temp.name,
            description: temp.description,
            monday: temp.schedule[0] == "M" ? true : false,
            tuesday: temp.schedule[1] == "T" ? true : false,
            wednesday: temp.schedule[2] == "W" ? true : false,
            thursday: temp.schedule[3] == "R" ? true : false,
            friday: temp.schedule[4] == "F" ? true : false,
            category: temp.category,
            incentives: temp.incentives,
            video_url: temp.video_url,
            start_date: temp.start,
            end_date: temp.end,
            is_confirmed: false,
        });
        // console.log(temp)
        setUserId(route.params.user_id);
        setParticipants(temp.user_member_challenges == undefined ? 0 : temp.user_member_challenges.length)
    }, []);
    const [participants, setParticipants] = useState(0);
    const [isVisible, setisVisible] = useState(false);
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState("")
    const [datecolor, setDateColor] = useState("")
    const [challenge, setChallenge] = useState({})
    const [lastDate, setLastDate] = useState('');
    const [startDate, setStartDate] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isModalDatePickerVisible, setModalDatePickerVisibility] = useState(false);
    const [isModalVisible, setisModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        challenge_name: '',
        description: '',
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        category: '',
        incentives: '',
        video_url: '',
        start_date: '',
        end_date: '',
        is_confirmed: false,
    });
    const [validForm, setValidForm] = useState({
        challenge_name: '',
        description: '',
        schedule: '',
        category: '',
        is_confirmed: '',
        video_url: '',
        date_range: '',
    });
    const [genderOpen, setGenderOpen] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [checkInData, setCheckInData] = useState({
        checkin_date: '',
        comments: '',
        proof: ''
    });
    const [gender, setGender] = useState([
        { label: "Walking", value: "walking" },
        { label: "Dieting", value: "dieting" },
        { label: "Running", value: "running" },
        { label: "Weight Loss", value: "weight_loss" },
        { label: "Gym", value: "gym" },
        { label: "Core", value: "core" },
    ]);
    const onGenderOpen = useCallback(() => {
    }, []);

    const { handleSubmit, control } = useForm();
    
    const unenrollInChallenge = () => {
        Alert.alert(
          "Alert",
          "Do you want to enroll in this challenge?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {
                
                AsyncStorage.getItem('xalt_header').then(
                    (value) =>
                    {
                        let header = JSON.parse(value);
                        // console.log(header)
                        var sendToData = {user_member_challenge:{member_challenge_id: challenge.id, user_id: route.params.user_id, status: 'unenrolled'}};
                        fetch(
                            'http://10.10.10.49:3000/api/v1/user_member_challenges/' + challenge.id,
                        {
                            method: 'put',
                            body: JSON.stringify(sendToData),
                            headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Expose-Headers': 'access-token, client, uid',
                            'access-token': header['access-token'],
                            'client': header['client'],
                            'uid': header['uid']
                            },
                        }
                        ).then((response) => response.json() )
                        .then((responseJson) => {
                            if(responseJson.status == 'unenrolled') {
                                setEnrolled(false)
                                setParticipants(participants - 1);
                            }
                        })
                        .catch((error) => {
                        alert(JSON.stringify(error));
                        console.log(error);
                        });
                    }
                )
            } }
          ]
        );
    }
    const enrollInChallenge = () => {
        Alert.alert(
          "Alert",
          "Do you want to enroll in this challenge?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {
                AsyncStorage.getItem('xalt_header').then(
                  (value) =>
                    {
                        let header = JSON.parse(value);
                        var sendToData = {user_member_challenge:{member_challenge_id: challenge.id, user_id: route.params.user_id, status: 'enrolled'}};
                        fetch(
                            'http://10.10.10.49:3000/api/v1/user_member_challenges',
                        {
                            method: 'post',
                            body: JSON.stringify(sendToData),
                            headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Expose-Headers': 'access-token, client, uid',
                            'access-token': header['access-token'],
                            'client': header['client'],
                            'uid': header['uid']
                            },
                        }
                        ).then((response) => response.json() )
                        .then((responseJson) => {
                            if(responseJson.status == 'enrolled') {
                                setEnrolled(true)
                                setParticipants(participants + 1);
                            }
                        })
                        .catch((error) => {
                        alert(JSON.stringify(error));
                        console.log(error);
                        });
                    }
                )} }
          ]
        );
    }
    
    const showDatePicker = (flag) => {
        flag ? setStartDate(true) : setStartDate(false);
        setDatePickerVisibility(true);
    };
    const showModalDatePicker = (flag) => {
        flag ? setStartDate(true) : setStartDate(false);
        setModalDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const hideModalDatePicker = () => {
        setModalDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        if(startDate) {
            setFormData({...formData, start_date: date});
        } else {
            setFormData({...formData, end_date: date});
        }
        hideModalDatePicker();
    };
    const handleConfirm = (date) => {
        setCheckInData({
            ...checkInData, checkin_date: date
        })
        hideDatePicker();
    };

    const getLastDate = () => {
        let tempDate = Date(formData.end_date).toString().split(' ');
        return formData.end_date !== ''
            ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
            : '';
    };

    const getStartDate = () => {
        let tempDate = Date(formData.start_date).toString().split(' ');
        return formData.start_date !== ''
            ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
            : '';
    };
    const getDate = () => {
        let tempDate = checkInData.checkin_date.toString().split(' ');
        return checkInData.checkin_date !== ''
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

    const scheduleList = () => {
        if(challenge.schedule == undefined) {
            return;
        }
        const dayList = [];
        if (challenge.schedule.indexOf('M') >= 0) {
            dayList.push('Monday');
        }
        if (challenge.schedule.indexOf('T') >= 0) {
            dayList.push('Tuesday');
        }
        if (challenge.schedule.indexOf('W') >= 0) {
            dayList.push('Wednesday');
        }
        if (challenge.schedule.indexOf('R') >= 0) {
            dayList.push('Thursday');
        }
        if (challenge.schedule.indexOf('F') >= 0) {
            dayList.push('Friday');
        }
    
        if (dayList.length == 1) {
            return dayList[0];
        }
    
        return dayList.join(', ');
    };
  
    const submitteAddChallenge = () => {
        let errors = validate(formData);
        setValidForm(errors);
        if (Object.keys(errors).length === 0) {
            fetchAddChallenges(toDataModelValues(formData))
        }
    }

    const fetchAddChallenges = (sendToData) => {
        AsyncStorage.getItem('xalt_header').then(
          (value) =>
            {
                let header = JSON.parse(value);
                fetch(
                    'http://10.10.10.49:3000/api/v1/member_challenges/' + challenge.id,
                    {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Expose-Headers': 'access-token, client, uid' ,
                        'access-token': header['access-token'],
                        'client': header['client'],
                        'uid': header['uid']
                    },
                    body: JSON.stringify(sendToData),
                    }
                ).then((response) => response.json())
                .then((responseJson) => {
                    setisModalVisible(false);
                    let str = "";
                    str += formData.monday ? "M" : "-";
                    str += formData.tuesday ? "T" : "-";
                    str += formData.wednesday ? "W" : "-";
                    str += formData.thursday ? "R" : "-";
                    str += formData.friday ? "F" : "-";
                    setChallenge({
                        ...challenge, name: formData.challenge_name,
                         description: formData.description, category: formData.category, incentives: formData.incentives,
                        video_url: formData.video_url, start: formData.start_date, end: formData.end_date, schedule: str
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
          }
        );
    }

    const fetchCheckIn = () => {
        var sendData = {
            member_challenge_id: challenge.id,
            user_id: userId,
            checkin_date: checkInData.checkin_date,
            comments: checkInData.comments,
            proof: checkInData.proof,
        };
        AsyncStorage.getItem('xalt_header').then(
          (value) =>
            {
                let header = JSON.parse(value);
                fetch(
                    'http://10.10.10.49:3000/api/v1/user_member_challenge_check_ins',
                    {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Expose-Headers': 'access-token, client, uid' ,
                        'access-token': header['access-token'],
                        'client': header['client'],
                        'uid': header['uid']
                    },
                    body: JSON.stringify({user_member_challenge_check_in: sendData}),
                    }
                ).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
          }
        );
    }

    return (
    <>
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Header pressLogo={() => navigation.navigate('home')} />
                <Text style={styles.detailTitle}>{challenge.name}</Text>
                <WebView
                    style={styles.container}
                    javaScriptEnabled={true}
                    source={{
                        uri: challenge.video_url,
                    }}
                    />
                <View style={styles.detailView}>
                    <Text style={styles.t18}>Description</Text>
                    <Text style={styles.t15}>{challenge.description}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.t16}>Participants:</Text>
                        <Text style={styles.t15}>{participants}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '88%' }}>
                        <Text style={styles.t16}>Schedule:</Text>
                        <Text style={styles.t15}>{scheduleList()}</Text>
                    </View>
                </View>
                {enrolled == true ? 
                <>
                <View style={{
                    flexDirection: 'row', width: '88%', alignItems: 'center',
                    marginLeft: '6%', marginTop: 10
                }}>
                    <TouchableOpacity style={[styles.detailCalbutton,
                    { backgroundColor: '#fff', width: '40%' }]}>
                        <Text style={[styles.t15, { fontWeight: '700' }]}>
                            testUser
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.detailCalbutton,
                    { backgroundColor: '#fff', width: '60%' }]}>
                        <Text style={[styles.t15, { fontWeight: '700', color:'#E6447D'}]}>
                            Select Different User
                        </Text>
                    </TouchableOpacity>
                </View>
                <Calendar
                    markedDates={{
                        [date]: { selected: true, marked: true, selectedColor: 'blue' },
                    }}
                    current={getCurrentDate().toString()}
                    minDate={challenge.start}
                    maxData={challenge.end}
                    monthFormat={'MMMM yyyy'}
                    onDayPress={(day) => {
                        setDate(day.dateString);
                        setDateColor('#000');
                    }}
                    hideArrows={false}
                    hideExtraDays={true}
                    disableDate={(e) => {
                        return false
                    }}
                    allowSelectionOutOfRange={false}
                    firstDay={1}
                    theme={{
                        todayTextColor: 'red',
                    }}
                    style={{ width: '88%', marginLeft: '6%' }}
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
                </> : <></> }
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
                            <TextInput multiline={true} numberOfLines={4} value={checkInData.comments} onChangeText={(e) => setCheckInData({...checkInData, comments: e})}
                                placeholder="What did you do today?" style={[styles.loginInput]} />
                        </View>
                        <View style={{ width: '100%', marginTop: 10 }}>
                            <TextInput placeholder="Link ot proof(optional)" value={checkInData.proof} onChangeText={(e) => setCheckInData({...checkInData, proof: e})} style={[styles.loginInput]} />
                        </View>
                        <View style = {{flexDirection:'row', marginTop:15}}>
                            <View style={{ alignSelf: 'flex-end',  }}>
                                <TouchableOpacity style={styles.signButton} onPress={fetchCheckIn}>
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
                { challenge.user != undefined ? challenge.user.id == userId ? <>
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
                    <TouchableOpacity onPress={() => setisModalVisible(true)} style={[styles.detailbutton1, { marginHorizontal: 5 }]}>
                        <Text style={[styles.t14, { fontWeight: '400' }]}>
                            Edit Challenge
                        </Text>
                    </TouchableOpacity>
                </View></> : <></>  : <></>}


                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    {enrolled == true ? 
                    <View style={{ marginLeft: '6%', marginTop: 10 }}>
                        <TouchableOpacity onPress={unenrollInChallenge} style={styles.detailbutton}>
                            <Text style={[styles.t14, { fontWeight: '400' }]}>
                                Leave Challenge
                            </Text>
                        </TouchableOpacity>
                    </View> : 
                    <View style={{ marginLeft: '6%', marginTop: 10 }}>
                        <TouchableOpacity onPress={enrollInChallenge} style={styles.detailbutton}>
                            <Text style={[styles.t14, { fontWeight: '400' }]}>
                                Join Challenge
                            </Text>
                        </TouchableOpacity>
                    </View>}
                    <View style={{ alignSelf: 'flex-end', marginRight: '6%', marginTop: 10, marginBottom: 30 }}>
                        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.navigate('main')}>
                            <Text style={[styles.t16, { fontWeight: '400', color: '#fff' }]}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
        
        <Modal
            animationType={"slide"}
            onRequestClose={() => {
                console.log("Modal has been closed.");
                setisModalVisible(false);
            }}
            style = {{backgroundColor: '#fff'}}
            transparent={false}
            visible={isModalVisible}>
            <ScrollView>
                <View style={styles.modalcontain}>
                    <Text style={styles.modalHeader}>Edit Challenge</Text>
                    <View style={{ width: '88%', marginTop: 10 }}>
                        <TextInput placeholder="Name of Challenge..." value={formData.challenge_name} onChange={(e) => setFormData({...formData, challenge_name: e.nativeEvent.text})} style={[styles.loginInput]} />
                    </View>
                    { validForm.challenge_name != "" ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                {validForm.challenge_name}
                            </Text>
                        ) : null
                    }
                    <View style={{ width: '88%', marginTop: 10 }}>
                        <TextInput multiline={true} 
                            value={formData.description} 
                            numberOfLines={4} 
                            onChangeText={(e) => {setFormData({...formData, description: e});}}
                            placeholder="Description of How to Perform Challenge..." 
                            style={[styles.loginInput]} />
                    </View>

                    { validForm.description != "" ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                {validForm.description}
                            </Text>
                        ) : null
                    }
                    <Controller
                        name="gender"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.dropdownGender}>
                                <DropDownPicker
                                    style={styles.dropdown}
                                    open={genderOpen}
                                    value={genderValue} //genderValue
                                    items={gender}
                                    setOpen={setGenderOpen}
                                    setValue={setGenderValue}
                                    setItems={setGender}
                                    placeholder="Theme of Challenge"
                                    placeholderStyle={styles.placeholderStyles}
                                    onOpen={onGenderOpen}
                                    onChangeValue={onChange}
                                    onSelectItem={(e) => {setFormData({...formData, category: e.value})}}
                                    dropDownContainerStyle={{ backgroundColor: 'white',zIndex: 1000, elevation: 1000 }}
                                />
                            </View>
                        )}
                    />

                    { validForm.category != "" ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                {validForm.category}
                            </Text>
                        ) : null
                    }
                    <View style={{ width: '88%', marginTop: 10 }}>
                        <TextInput placeholder="Reward to consistent participants(if any)" style={[styles.loginInput]} value={formData.incentives} onChangeText={(e)=>{setFormData({...formData, incentives: e})}} />
                    </View>
                    <DateTimePickerModal
                        isVisible={isModalDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideModalDatePicker}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '42%', marginTop: 10 }}>
                            <TextInput placeholder="Start date" value={getStartDate()}
                                style={[styles.dateInput]} onPressIn={() => showModalDatePicker(true)} />
                        </View>
                        <Text style={{ width: '4%' }} />
                        <View style={{ width: '42%', marginTop: 10 }}>
                            <TextInput placeholder="End date" style={[styles.dateInput]}
                                onPressIn={() => showModalDatePicker(false)} value={getLastDate()} />
                        </View>
                    </View>

                    { validForm.date_range != "" ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                {validForm.date_range}
                            </Text>
                        ) : null
                    }
                    <Text style={styles.scheduletile}>Schedule</Text>

                    <View style={{ flexDirection: 'row', width: '88%', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => setFormData({...formData, monday: !formData.monday})} style={[styles.schedulebutton, formData.monday ? { backgroundColor: '#E6447D' } : '']}>
                            <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                                MON
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setFormData({...formData, tuesday: !formData.tuesday})} style={[styles.schedulebutton, formData.tuesday ? { backgroundColor: '#E6447D' } : '']}>
                            <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                                TUES
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setFormData({...formData, wednesday: !formData.wednesday})} style={[styles.schedulebutton, formData.wednesday ? { backgroundColor: '#E6447D' } : '']}>
                            <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                                WED
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setFormData({...formData, thursday: !formData.thursday})} style={[styles.schedulebutton, formData.thursday ? { backgroundColor: '#E6447D' } : '']}>
                            <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                                THUR
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setFormData({...formData, friday: !formData.friday})} style={[styles.schedulebutton, formData.friday ? { backgroundColor: '#E6447D' } : '']}>
                            <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                                FRI
                            </Text>
                        </TouchableOpacity>
                    </View>

                    { validForm.schedule != "" ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                {validForm.schedule}
                            </Text>
                        ) : null
                    }
                    <View style={{ width: '88%', marginTop: 10 }}>
                        <TextInput  value={formData.video_url} onChangeText={(e)=>{setFormData({...formData, video_url: e})}}  placeholder="Copy/paste link of Challenge" style={[styles.loginInput]} />
                    </View>

                    { validForm.video_url != "" ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                {validForm.video_url}
                            </Text>
                        ) : null
                    }
                    <View style={{ flexDirection: 'row', width: '88%', marginTop: 20 }}>
                        <Checkbox value={formData.is_confirmed} color="#E6447D"
                            onValueChange={() => setFormData({...formData, is_confirmed: !formData.is_confirmed})} style={{ marginTop: 2 }} />
                        <Text style={styles.checkboxtile}>I confirm that the video being submitted:</Text>
                    </View>
                    { validForm.is_confirmed != "" ? 
                        (
                            <Text style={[styles.t15, styles.textCenter, styles.marginTop, { fontWeight: '300', color: '#ff0000'} ]}>
                                {validForm.is_confirmed}
                            </Text>
                        ) : null
                    }

                    <Text style={styles.checkboxdes}>- Uses appropriate anatomical language</Text>
                    <Text style={styles.checkboxdes1}> and has no profanity</Text>

                    <Text style={styles.checkboxdes}>- Has no persons wearing revealing/</Text>
                    <Text style={styles.checkboxdes1}> inappropriate clothing</Text>

                    <Text style={styles.checkboxdes}>- Has good lighting and camera set-up,</Text>
                    <Text style={styles.checkboxdes1}> and clear quality</Text>

                    <Text style={styles.checkboxdes}>- Is between 30-90 seconds</Text>

                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 30 }}>
                        <View style={{ alignSelf: 'flex-start', }}>
                            <TouchableOpacity style={styles.signButton} onPress={() => submitteAddChallenge()}>
                                <Text style={[styles.t15, styles.colorWhite, { fontWeight: '700' }]}>
                                    SUBMIT
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ width: "20%" }} />
                        <View style={{ alignSelf: 'flex-end', }}>
                            <TouchableOpacity style={styles.signButton} onPress={() => {
                                setisModalVisible(false);
                            }}>
                                <Text style={[styles.t15, styles.colorWhite, { fontWeight: '700' }]}>
                                    CLOSE
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '88%',
        height: 300,
    },
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
    closeBtn: {
        paddingVertical: 8,
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
    schedulebutton: {
        width: '20%',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#f0f0f0'
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
    dropdown: {
        borderColor: "#505d68",
        height: 50,
        width: '88%',
        marginTop: 10
    },
    modalHeader: {
        fontWeight: '700',
        fontSize: 21,
        color: '#E6447D',
        alignSelf: 'flex-start',
        marginLeft: '6%'
    },
    scheduletile: {
        fontWeight: '400',
        fontSize: 21,
        color: '#505d68',
        alignSelf: 'flex-start',
        marginLeft: '6%',
        marginTop: 20
    },

    checkboxtile: {
        fontWeight: '400',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: '2%',
    },

    checkboxdes: {
        fontWeight: '400',
        fontSize: 16,
        alignSelf: 'flex-start',
        width: '88%',
        color: '#505d68',
        marginLeft: '12%',
        marginTop: 10
    },

    checkboxdes1: {
        fontWeight: '400',
        fontSize: 16,
        alignSelf: 'flex-start',
        width: '88%',
        color: '#505d68',
        marginLeft: '12%',
    },

    signButton: {
        paddingVertical: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E6447D',
        backgroundColor: '#E6447D'
    },

    t15: {
        fontSize: 17,
    },
    colorWhite: {
        color: '#fff'
    },
});

export default ListDetail;