import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
   
class List extends Component {
   state = {
      names: [
         {
            id: 0,
            title: 'Ben',
            username:'Mark Denis',
            users: 2
         },
         {
            id: 1,
            title: 'Susan',
            username:'John Doe',
            users: 3
         },
         {
            id: 2,
            title: 'Diet',
            username:'testUser',
            users: 1
         },
      ]
   }
   
   alertItemName = (item) => {
      alert(item.title)
   }
   render() {
      return (
         <View style = {styles.container}>
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     onPress = {this.props.navigationFunc}>
                    <View style = {{flexDirection:'row'}}>
                        <View style = {{alignSelf:'flex-start', width:'60%'}}>
                            <Text style = {styles.text}>{item.title}</Text>
                            <Text style = {styles.text}>{item.username}</Text>
                        </View>                        
                        <Text style = {styles.text}>PARTICIPANTS: {' '}</Text>
                        <Text style = {styles.text}>{item.users}</Text>
                        
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