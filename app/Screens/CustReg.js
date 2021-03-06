import React, { useContext, useState,useEffect } from 'react';
import { 
  ActivityIndicatorBase,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View ,
  StatusBar,
  ImageBackground,
  Picker,
  ScrollView,
  Platform,
  Button,
  Image
} from 'react-native';
//import * as firebase from "firebase";
import LoginScreen from './LoginScreen';
import { AuthContext } from '../navigation/AuthProvider';
import { firebase } from '../navigation/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


export default function CustReg({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname]  = useState('')
  const [gender, setgender] = useState('')
  const [mobileno, setmobile] = useState('')
  const [address, setaddress] = useState('')
  const [confirmPassword, setcofirmPassword] = useState('')
  const [image,setImage]= useState(null);
  const [selectedValue, setSelectedValue] = useState("Gender");
  // useEffect( async () => {
  //   if (Platform.OS !== 'web') {
  //     const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('Permission denied!')
  //     }
  //   }
  // },[])

  // state={gender:""};
  // showgender=(option) =>{
  //   alert(option);
  //   this.setState({gender: option});
  // }

  

  const onRegisterPress = () => {
     if (password !== confirmPassword) {
         alert("Passwords don't match.")
         return
     }
    firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    firstname,
                    lastname,
                    gender,
                    mobileno,
                    address,
                    password,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Login', {user: data})
                    })
                  })
  }

    const PickImage = async() =>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[4,3],
        quality:1
      })
      console.log(result)
      if (!result.cancelled) {
        setImage(result.uri)
      }
    }
    return (
      <KeyboardAvoidingWrapper>

      <ImageBackground style={styles.container}
        source={require('../assets/bg-01.png')}>
        <TouchableOpacity>
          <Image
            style={{width:28, height:28,position:'absolute',top:"10%",left:"-45%",}}
            source={require('../assets/back.png')}
            onPress={() => navigation.navigate("SelectScreen")}
          />          
        </TouchableOpacity>

        <Text style={styles.header}>Register as Customer</Text>
        {/* <Image
          style={{width:105, height:111, top:'2%'}}
          source={require('../assets/pic.png')}/> */}
        <Button title ="Choose Image" onPress={PickImage} />
        {image && <Image source={{uri:image}} style={{
          width:200,
          height:200
        }}/>}

        <TextInput style={styles.textinput1} 
        placeholder="First Name" 
        underlineColorAndroid={'transparent'}
        labelValue={firstname}
        onChangeText={(firstname)=>setfirstname(firstname)}
        autoCapitalize="none"
        autoCorrect={false}
        />

        <TextInput style={styles.textinput2}
        placeholder="Last Name" 
        underlineColorAndroid={'transparent'}
        labelValue={lastname}
        onChangeText={(lastname)=>setlastname(lastname)}
        autoCapitalize="none"
        autoCorrect={false}
        />

        <TextInput style={styles.textinput} 
        labelValue={email}
        onChangeText={(userEmail)=>setEmail(userEmail)}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        />
        
        <Picker style={styles.textinput3}
          itemStyle={{backgroundColor:'#fff'}}
          placeholder="Gender"
          labelValue={gender}
          selectedValue={selectedValue}
          onValueChange={(gender, itemIndex) => 
            {if(gender !== "disabled"){
              setSelectedValue(gender)}
              setgender(gender)
            }}
          
        >
          <Picker.Item label="Gender" value="disabled" color="#aaa" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
        
        
        <TextInput style={styles.textinput4} 
        placeholder="Birthday" 
        underlineColorAndroid={'transparent'}
        />
        
        <TextInput style={styles.textinput5} 
        placeholder="Mobile Number" 
        underlineColorAndroid={'transparent'}
        labelValue={mobileno}
        onChangeText={(mobileno)=>setmobile(mobileno)}
        autoCapitalize="none"
        autoCorrect={false}
        />
        
        <TextInput style={styles.textinput5} 
        placeholder="Address" 
        underlineColorAndroid={'transparent'}
        labelValue={address}
        onChangeText={(address)=>setaddress(address)}
        autoCapitalize="none"
        autoCorrect={false}
        />
        
        <TextInput style={styles.textinput5} 
        labelValue={password}
        onChangeText={(userPassword)=>setPassword(userPassword)}
        placeholder="Password"
        secureTextEntry={true}
        />
        
        <TextInput style={styles.textinput5} 
        placeholder=" Confirm Password" 
        underlineColorAndroid={'transparent'} 
        secureTextEntry={true}
        labelValue={confirmPassword}
        onChangeText={(confirmPassword)=>setcofirmPassword(confirmPassword)}
        />
        
        <TouchableOpacity style={styles.button}
        onPress={() =>{onRegisterPress()}}>
            <Text style={styles.btnTxt}>
                Sign Up
            </Text>
            
        </TouchableOpacity>
      </ImageBackground>
      </KeyboardAvoidingWrapper>
    );
  }



  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor:"#EFE5DA",
      justifyContent:'center',
      alignItems:'center',
    },
    header:{
      fontFamily:'Roboto',
      fontWeight:'bold',
      fontSize:30,
      top:'0%',
      color:"#3A292A",
      position:"relative",
      paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,
      paddingLeft: 10,
    },
    textinput:{
      width:375,
      height:40,
      top:'-6%',
      backgroundColor:'#fff',
      borderRadius:25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#3A292A',
      elevation:5,
      shadowColor:'#000',
      shadowOffset:{
        width:1,
        height:1,
      },
      shadowRadius:100,
      marginVertical:10,
      marginHorizontal:10,
    },
    textinput1:{
      width:175,
      height:40,
      backgroundColor:'#fff',
      borderRadius:25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#3A292A',
      top:'1.4%',
      left:'-25%',
      elevation:5,
      shadowColor:'#000',
      shadowOffset:{
        width:1,
        height:1,
      },
      shadowRadius:100,
      marginVertical:10,
      marginHorizontal:10,
    },
    textinput2:{
      width:175,
      height:40,
      backgroundColor:'#fff',
      borderRadius:25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#3A292A',
      top:'-6%',
      left:'25%',
      elevation:5,
      shadowColor:'#000',
      shadowOffset:{
        width:1,
        height:1,
      },
      shadowRadius:100,
      marginVertical:10,
      marginHorizontal:10,
    },
    textinput3:{
      width:175,
      height:40,
      //backfaceVisibility : "visible",
      // borderRadius:25,
      // paddingHorizontal:16,
      // fontSize:16,
      color:'#3A292A',
      top:'-6.7%',
      left:'-25%',
      // elevation:5,
      // shadowColor:'#000',
      // shadowOffset:{
      //   width:1,
      //   height:1,
      // },
      // shadowRadius:100,
      marginVertical:10,
      marginHorizontal:10,
    },
    textinput4:{
      width:175,
      height:40,
      backgroundColor:'#fff',
      borderRadius:25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#3A292A',
      top:'-14%',
      left:'25%',
      elevation:5,
      shadowColor:'#000',
      shadowOffset:{
        width:1,
        height:1,
      },
      shadowRadius:100,
      marginVertical:10,
      marginHorizontal:10,
    },
    textinput5:{
      width:375,
      height:40,
      backgroundColor:'#fff',
      borderRadius:25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#3A292A',
      top:'-14%',
      elevation:5,
      shadowColor:'#000',
      shadowOffset:{
        width:1,
        height:1,
      },
      shadowRadius:100,
      marginVertical:10,
      marginHorizontal:10,
    },


    btnTxt:{
      fontSize:20,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    },
    button:{
      backgroundColor:'#3A292A',   
      borderRadius:25,
      width:200,
      marginVertical:10,
      paddingVertical:12,
      elevation:5,
      shadowColor:'#000',
      shadowOffset:{
        width:1,
        height:1,
      },
      shadowRadius:100,
      marginVertical:10,
      marginHorizontal:10,
      position:'absolute',
      top:'86.5%',
      //left:'40%',
    },
});