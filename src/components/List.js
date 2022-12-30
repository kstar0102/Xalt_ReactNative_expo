import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
   
class List extends Component {
   constructor(props) {
      super(props);
   }
   alertItemName = (item) => {
      alert(item.title)
   }
   render() {
      return (
         <View style = {styles.container}>
            {
               this.props.challenges.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     onPress = {() => this.props.navigationFunc(item)}>
                    <View style = {{flexDirection:'row'}}>
                        <View style = {{alignSelf:'flex-start', width:'60%'}}>
                            <Text style = {styles.text}>{item.name}</Text>
                            <Text style = {styles.text}>{item.user.name}</Text>
                        </View>                        
                        <Text style = {styles.text}>PARTICIPANTS: {' '}</Text>
                        <Text style = {styles.text}>{item.user_member_challenges.length}</Text>
                        
                    </View>
                     
                  </TouchableOpacity>
               ))
            }
         </View>
      )
   }
}
export default List

const styles = StyleSheet.create ({
   container: {
    width:'100%',
    padding: 10,
    marginTop: 3,
    marginLeft:20,
    alignSelf: 'flex-start',
   },
   text: {
      color: '#000',
   }
})