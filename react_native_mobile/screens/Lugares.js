import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Image,
  FlatList
} from "react-native";



import { Block, Checkbox, Text, theme } from "galio-framework";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQuery } from "@apollo/client";
import { Platform } from 'react-native';

import { useMutation, useQuery } from "@apollo/client";
import { get_ciudades, newLugar } from "../gql/queries";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { View } from 'react-native';

const { width, height } = Dimensions.get("screen");

export default function NewLugar(props) {

    const { navigation } = props;
    // const [userId,setuserId] = useState();
    const [name, setname] = useState("");
    const [hood,sethood] = useState("");
    const [address,setaddress] = useState("");
    const [city, setcity] = useState(1);
 
    // const [communidditId,setCommunidditId] = useState(null);

    const [singleFile, setSingleFile] = useState(null);

    const storeData = async (key, value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
      } catch (e) {
        console.log(e)
        // saving error
      }
    }

    const getCommunidditId = async () => {
      try {
  
        const value = await AsyncStorage.getItem("communidditId")
        if(value !== null) {
          setCommunidditId(JSON.parse(value))
        }
      } catch(e) {
        console.log(e)
      }
    }

    const getUserID = async () => {
      try {
        const value = await AsyncStorage.getItem("UserID")

        if(value !== null) {
          setuserId(JSON.parse(value))
          return value
        }
      } catch(e) {
        // error reading value
      }
    }    


    console.log("Variables enviadas a la mutación:", { name, hood, address, city: city});

    const [runMutation, {dataModifyLugar, errorModifyLugar}] = useMutation(newLugar, {
      variables: {
        name: name,
        hood: hood,
        address: address,
        city: city,
      },
      enabled:false,
      onCompleted:(dataModifyLugar) => {
        console.log(dataModifyLugar)  
        navigation.navigate("Twiddit")                
      },
      onError(errorModifyLugar){
        console.log(errorModifyLugar)
      }
    })


    useEffect(() => {
      getUserID()
      getCommunidditId()
    }, [])

    const { loading, error, data } = useQuery(get_ciudades);

    if (loading) return <Text>Cargando...</Text>;
    if (error) return <Text>Error </Text>;

    return (
      
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.twidditRegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Image source={Images.twidditFilledLogo} style={styles.logo}/>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={20}>
                    Busca amigos y comparte tus planes
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        style={{
                          height:70
                        }}
                        multiline
                        placeholder="Ponle un nombre a tu lugar"
                        onChangeText={name => setname(name)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ungroup"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        style={{
                          height:70
                        }}
                        multiline
                        placeholder="Barrio"
                        onChangeText={hood => sethood(hood)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ungroup"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        style={{
                          height:70
                        }}
                        multiline
                        placeholder="Direccion"
                        onChangeText={address => setaddress(address)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ungroup"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>               
          
                    <Picker
                      selectedValue={city}
                      onValueChange={(itemValue, itemIndex) => setcity(itemValue)}
                    >
                      {data.getCiudades.map((city) => (
                      <Picker.Item key={city.id} label={city.name} value={city.id} />
                      ))}
                    </Picker> 
                    
                    
                      {/* <FlatList
                        data={imageURL}
                        horizontal={true}
                        renderItem={({item}) =>(
                            <Image source={{uri: item}} style={{
                              width:70,
                              height:50
                            }}/>
                        )}
                        keyExtractor={(item)=>item}
                      /> */}
                    
                    {/* <Block middle>
                        
                        <Button color="primary" style={styles.createButton} onPress={() => {
                            pickImage();
                        }}>
                            <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="palette"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        </Button>
                    </Block> */}
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={() => {
                        runMutation()
                      }}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          POST
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }


const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.90,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  logo: {
    width: 100,
    height: 100,
    zIndex: 2,
    position: 'relative',

  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    backgroundColor: "#2E2E2E"
  }
});