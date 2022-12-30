import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import Header from '../../components/Header/index';
import List from '../../components/List'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Checkbox from 'expo-checkbox';
import { ScrollView } from 'react-native-virtualized-view'

function MainScreen({ navigation }) {
    const [isVisible, setisVisible] = useState(false);
    const [bgColor, setBGColor] = useState([
        { top: '#' },
        { own: '#' },
        { enroll: '#' },
        { search: '#' }
    ]);
    const [mon, setMon] = useState(false);
    const [tue, seTtue] = useState(false);
    const [wed, setWed] = useState(false);
    const [thu, setThu] = useState(false);
    const [fri, setFri] = useState(false);


    const [date, setDate] = useState('');
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
    const getLastDate = () => {
        let tempDate = lastDate.toString().split(' ');
        return date !== ''
            ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
            : '';
    };

    const [genderOpen, setGenderOpen] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [gender, setGender] = useState([
        { label: "Walking", value: "walking" },
        { label: "Dieting", value: "dieting" },
        { label: "Running", value: "running" },
        { label: "Weight Loss", value: "weight" },
        { label: "Gym", value: "gym" },
        { label: "Core", value: "core" },
    ]);
    const { handleSubmit, control } = useForm();
    const onGenderOpen = useCallback(() => {
    }, []);

    const [isAccept, setIsAccept] = useState(false);

    const checkAccept = () => {
        setIsAccept((isAccept) => !isAccept);
    }

    return (
        <View style={{ flex: 1 }}>
            <Header pressLogo={() => navigation.navigate('home')} />
            <View style={styles.mainContent}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity id='topbutton' style={[styles.Topbutton, { backgroundColor: bgColor.top }]} onPress={() => {
                        setBGColor(
                            { top: '#999999' },
                            { own: '#' },
                            { enroll: '#' },
                            { search: '#' }
                        );
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
                        // navigation.navigate('main')
                    }}>
                        <FontAwesome name="search" size={13} color="#000" style={{ marginTop: 3 }} />
                    </TouchableOpacity>
                </View>

                <List navigationFunc={() => navigation.navigate('lstdetail')} />

                <TouchableOpacity style={styles.addbutton} onPress={() => {
                    setisVisible(true);
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign name="pluscircleo" size={15} color="#E6447D" style={{ marginTop: 2, marginRight: 5 }} />
                        <Text style={[styles.t15, styles.textCenter, styles.colorPink, { fontWeight: '700' }]}>
                            Add New Challenge
                        </Text>
                    </View>
                </TouchableOpacity>

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={isVisible}>
                    <ScrollView>
                        <View style={styles.modalcontain}>
                            <Text style={styles.modalHeader}>New Challenge</Text>
                            <View style={{ width: '88%', marginTop: 10 }}>
                                <TextInput
                                    placeholder="Name of Challenge..."
                                    onChangeText={e => console.log(e)}
                                    value={'aa'}
                                    style={[styles.loginInput]} />
                            </View>

                            <View style={{ width: '88%', marginTop: 10 }}>
                                <TextInput multiline={true} numberOfLines={4}
                                    placeholder="Description of How to Perform Challenge..." style={[styles.loginInput]} />
                            </View>

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
                                            zIndex={3000}
                                            zIndexInverse={1000}
                                        />
                                    </View>
                                )}
                            />

                            <View style={{ width: '88%', marginTop: 10 }}>
                                <TextInput placeholder="Reward to consistent participants(if any)" style={[styles.loginInput]} />
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
                                        style={[styles.dateInput]} onFocus={() => showDatePicker(true)} />
                                </View>
                                <Text style={{ width: '4%' }} />
                                <View style={{ width: '42%', marginTop: 10 }}>
                                    <TextInput placeholder="End date" style={[styles.dateInput]}
                                        onFocus={() => showDatePicker(false)} value={getLastDate()} />
                                </View>
                            </View>

                            <Text style={styles.scheduletile}>Schedule</Text>

                            <View style={{ flexDirection: 'row', width: '88%', marginTop: 10 }}>
                                <TouchableOpacity id='topbutton' onPress={() => setMon(!mon)} style={[styles.schedulebutton, mon ? { backgroundColor: '#E6447D' } : '']}>
                                    <Text style={[styles.t15, styles.textCenter, styles.colorWhite, { fontWeight: '700' }]}>
                                        MON
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity id='topbutton' onPress={() => seTtue(!tue)} style={[styles.schedulebutton, tue ? { backgroundColor: '#E6447D' } : '']}>
                                    <Text style={[styles.t15, styles.textCenter, styles.colorWhite, { fontWeight: '700' }]}>
                                        TUES
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity id='topbutton' onPress={() => setWed(!wed)} style={[styles.schedulebutton, wed ? { backgroundColor: '#E6447D' } : '']}>
                                    <Text style={[styles.t15, styles.textCenter, styles.colorWhite, { fontWeight: '700' }]}>
                                        WED
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity id='topbutton' onPress={() => setThu(!thu)} style={[styles.schedulebutton, thu ? { backgroundColor: '#E6447D' } : '']}>
                                    <Text style={[styles.t15, styles.textCenter, styles.colorWhite, { fontWeight: '700' }]}>
                                        THUR
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity id='topbutton' onPress={() => setFri(!fri)} style={[styles.schedulebutton, fri ? { backgroundColor: '#E6447D' } : '']}>
                                    <Text style={[styles.t15, styles.textCenter, styles.colorWhite, { fontWeight: '700' }]}>
                                        FRI
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '88%', marginTop: 10 }}>
                                <TextInput placeholder="Copy/paste link of Challenge" style={[styles.loginInput]} />
                            </View>

                            <View style={{ flexDirection: 'row', width: '88%', marginTop: 20 }}>
                                <Checkbox value={isAccept} color="#E6447D"
                                    onValueChange={checkAccept} style={{ marginTop: 2 }} />
                                <Text style={styles.checkboxtile}>I confirm that the video being submitted:</Text>
                            </View>

                            <Text style={styles.checkboxdes}>- Uses appropriate anatomical language</Text>
                            <Text style={styles.checkboxdes1}> and has no profanity</Text>

                            <Text style={styles.checkboxdes}>- Has no persons wearing revealing/</Text>
                            <Text style={styles.checkboxdes1}> inappropriate clothing</Text>

                            <Text style={styles.checkboxdes}>- Has good lighting and camera set-up,</Text>
                            <Text style={styles.checkboxdes1}> and clear quality</Text>

                            <Text style={styles.checkboxdes}>- Is between 30-90 seconds</Text>

                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 30 }}>
                                <View style={{ alignSelf: 'flex-start', }}>
                                    <TouchableOpacity style={styles.signButton} onPress={() =>
                                        navigation.navigate('step1')}>
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

    colorWhite: {
        color: '#fff'
    },
});

export default MainScreen;