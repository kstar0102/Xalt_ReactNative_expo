import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, BackHandler, TextInput, Modal, Button, ScrollView } from 'react-native';
import Header from '../../components/Header/index';
import List from '../../components/List'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as videoType from '../../utilities/videoType';
import moment from 'moment';
// import { ScrollView } from 'react-native-virtualized-view';

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
function MainScreen({ navigation }) {
    React.useEffect(() => {
      const focusHandler = navigation.addListener('focus', () => {
        AsyncStorage.getItem('xalt_user_id').then(
          (value) =>{
            setUserId(value);
            setTabState('top');
            setBGColor(
                { top: '#999999' },
                { own: '#' },
                { enroll: '#' },
                { search: '#' }
            );
            fetchChallenges('?type=top&include=user%2Cuser_member_challenges%2Cuser_member_challenge_check_ins')
        });
      });
      return focusHandler;
    }, [navigation]);
    useEffect(() => {
        AsyncStorage.getItem('xalt_user_id').then(
          (value) =>{
            setUserId(value);
            setTabState('top');
            setBGColor(
                { top: '#999999' },
                { own: '#' },
                { enroll: '#' },
                { search: '#' }
            );
            fetchChallenges('?type=top&include=user%2Cuser_member_challenges%2Cuser_member_challenge_check_ins')
        });
        BackHandler.addEventListener("hardwareBackPress", backActionHandler);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
    }, []);
    const [validForm, setValidForm] = useState({
        challenge_name: '',
        description: '',
        schedule: '',
        category: '',
        is_confirmed: '',
        video_url: '',
        date_range: '',
    });
    const [isVisible, setisVisible] = useState(false);
    const [tabState, setTabState] = useState('');
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [bgColor, setBGColor] = useState([
        { top: '#' },
        { own: '#' },
        { enroll: '#' },
        { search: '#' }
    ]);
    const [challenges, setChallenges] = useState([]);
    const [userId, setUserId] = useState('');
    const [startDate, setStartDate] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [genderOpen, setGenderOpen] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [gender, setGender] = useState([
        { label: "Walking", value: "walking" },
        { label: "Dieting", value: "dieting" },
        { label: "Running", value: "running" },
        { label: "Weight Loss", value: "weight_loss" },
        { label: "Gym", value: "gym" },
        { label: "Core", value: "core" },
    ]);
    const { handleSubmit, control } = useForm();
    const [isAccept, setIsAccept] = useState(false);
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
    const onGenderOpen = useCallback(() => {
    }, []);
    const backActionHandler = () => {
        return true;
    };
    const showDatePicker = (flag) => {
        flag ? setStartDate(true) : setStartDate(false);
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        if(startDate) {
            setFormData({...formData, start_date: date});
        } else {
            setFormData({...formData, end_date: date});
        }
        hideDatePicker();
    };
    const getDate = () => {
        let tempDate = formData.start_date.toString().split(' ');
        return formData.start_date !== ''
            ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
            : '';
    };
    const getLastDate = () => {
        let tempDate = formData.end_date.toString().split(' ');
        return formData.end_date !== ''
            ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
            : '';
    };

    const submitteAddChallenge = () => {
        let errors = validate(formData);
        setValidForm(errors);
        if (Object.keys(errors).length === 0) {
            fetchAddChallenges(toDataModelValues(formData))
        }
    }

    const changeSearchText = (e) => {
        setSearchKeyWord(e);
        if(e.length >= 3) {
            fetchChallenges('?search_word=' + e + '&type=search&include=user%2Cuser_member_challenges%2Cuser_member_challenge_check_ins')
        } else {
            setChallenges([]);
        }
    }

    const fetchChallenges = (params) => {
        AsyncStorage.getItem('xalt_header').then(
          (value) =>
            {
                let header = JSON.parse(value);
                console.log(header)
                fetch(
                    'http://10.10.10.49:3000/api/v1/member_challenges' + params,
                    {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Expose-Headers': 'access-token, client, uid' ,
                        'access-token': header['access-token'],
                        'client': header['client'],
                        'uid': header['uid']
                    },
                    }
                ).then((response) => response.json())
                .then((responseJson) => {
                    setChallenges(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
          }
        );
    }
    const fetchAddChallenges = (sendToData) => {
        AsyncStorage.getItem('xalt_header').then(
          (value) =>
            {
                let header = JSON.parse(value);
                fetch(
                    'http://10.10.10.49:3000/api/v1/member_challenges',
                    {
                    method: 'post',
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
                    console.log(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
          }
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <Header pressLogo={() => navigation.navigate('home')} />
            <View style={styles.mainContent}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.Topbutton, { backgroundColor: bgColor.top }]} onPress={() => {
                        setBGColor(
                            { top: '#999999' },
                            { own: '#' },
                            { enroll: '#' },
                            { search: '#' }
                        );
                        setTabState('top');
                        fetchChallenges('?type=top&include=user%2Cuser_member_challenges%2Cuser_member_challenge_check_ins')
                        // navigation.navigate('main')
                    }}>
                        <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                            TOP
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.Topbutton, { backgroundColor: bgColor.own }]} onPress={() => {
                        setBGColor(
                            { own: '#999999' },
                            { top: '#' },
                            { enroll: '#' },
                            { search: '#' }
                        );
                        setTabState('my');
                        fetchChallenges('?user_id=' + userId + '&type=my&include=user%2Cuser_member_challenges%2Cuser_member_challenge_check_ins')
                        // navigation.navigate('main')
                    }
                    }>
                        <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                            OWNED BY YOU
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.Topbutton, { backgroundColor: bgColor.enroll }]} onPress={() => {
                        setBGColor(
                            { enroll: '#999999' },
                            { top: '#' },
                            { own: '#' },
                            { search: '#' }
                        );
                        setTabState('enrolled');
                        fetchChallenges('?user_id=' + userId + '&type=enrolled&include=user%2Cuser_member_challenges%2Cuser_member_challenge_check_ins')
                        // navigation.navigate('main')
                    }}>
                        <Text style={[styles.t15, styles.textCenter, { fontWeight: '700' }]}>
                            ENROLLED
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.Topbutton, { backgroundColor: bgColor.search }]} onPress={() => {
                        setBGColor(
                            { search: '#999999' },
                            { top: '#' },
                            { own: '#' },
                            { enroll: '#' },
                        );
                        setTabState('search');
                        fetchChallenges('?search_word=' + searchKeyWord + '&type=search&include=user%2Cuser_member_challenges%2Cuser_member_challenge_check_ins')
                        // navigation.navigate('main')
                    }}>
                        <FontAwesome name="search" size={13} color="#000" style={{ marginTop: 3 }} />
                    </TouchableOpacity>
                </View>
                {
                    tabState == 'search' ? <TextInput placeholder='search' value={searchKeyWord} onChangeText={(e) => {changeSearchText(e)}} style={[styles.Topbutton, {width: '86.5%'}]} /> : <></>
                }
                <List challenges={challenges} navigationFunc={(e) => navigation.navigate('lstdetail', {'challenge': e, 'user_id': userId})} />
                <Modal
                    animationType={"slide"}
                    onRequestClose={() => {
                        console.log("Modal has been closed.");
                        setisVisible(false);
                    }}
                    style = {{backgroundColor: '#fff'}}
                    transparent={false}
                    visible={isVisible}>
                    <ScrollView>
                        <View style={styles.modalcontain}>
                            <Text style={styles.modalHeader}>New Challenge</Text>
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
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '42%', marginTop: 10 }}>
                                    <TextInput placeholder="Start date" value={getDate()}
                                        style={[styles.dateInput]} onPressIn  ={() => showDatePicker(true)} />
                                </View>
                                <Text style={{ width: '4%' }} />
                                <View style={{ width: '42%', marginTop: 10 }}>
                                    <TextInput placeholder="End date" style={[styles.dateInput]}
                                        onPressIn ={() => showDatePicker(false)} value={getLastDate()} />
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
                                        setisVisible(false);
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
            </View>
            <TouchableOpacity style={[styles.addbutton, {left: 20, bottom: 10, position: 'absolute'}]} onPress={() => {
                setisVisible(true);
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign name="pluscircleo" size={15} color="#E6447D" style={{ marginTop: 2, marginRight: 5 }} />
                    <Text style={[styles.t15, styles.textCenter, styles.colorPink, { fontWeight: '700' }]}>
                        Add New Challenge
                    </Text>
                </View>
            </TouchableOpacity>
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

export default MainScreen;