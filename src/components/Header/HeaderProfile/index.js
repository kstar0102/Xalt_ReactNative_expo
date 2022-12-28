import { View, Text, Button, StyleSheet } from 'react-native';

const HeaderProfile = (props) => {

  return (
    <View style={styles.container}>
      <Flex justifyContent="flex-end" alignItems="center">
        {role === 'coach' && <Earnings earnings={earnings} />}

        <NotificationIcon />

        <ProfileDropdown />
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    },
});

export default HeaderProfile;
