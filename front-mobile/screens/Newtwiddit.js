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
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQuery } from "@apollo/client";

import { useMutation } from "@apollo/client";
import { newTwiddit } from "../gql/queries";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

export default function NewTwiddit (props) {

    const { navigation } = props;
    const [userId,setuserId] = useState();
    const [text,settext] = useState("");
    const [images,setimages] = useState([]);
    const [imageURL,setimageURL] = useState([]);
    const [communidditId,setCommunidditId] = useState(null);

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

    const uploadImage = async () => {
      const BASE_URL = 'xxxx';
  
      // Check if any file is selected or not
      if (singleFile != null) {
        // If file selected then create FormData
        const data = new FormData();
  
        data.append('file_attachment', {
          uri: singleFile.uri,
          name: singleFile.name,
          type: singleFile.mimeType,
        });
  
        // return
        try {
          let res = await fetch(BASE_URL + 'tutorial/upload.php', {
            method: 'post',
            body: data,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            timeout: 5000,
          });
  
          let result = await res.json();
          console.log('result', result);
          if (result.status == 1) {
            Alert.alert('Info', result.msg);
          }
        } catch (error) {
          // Error retrieving data
          // Alert.alert('Error', error.message);
          console.log('error upload', error);
        }
      } else {
        // If no file selected the show alert
        Alert.alert('Please Select File first');
      }
    };
  

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        selectionLimit: 4,
        //allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setimages(result.assets);
        let uris = [];
        for (const image of result.assets ){
          uris.push(image.uri)
        }
        setimageURL(uris)
      }else{
        alert("Image load cancelled")
      }
    };

    const [runMutation, {dataModifyTwiddit, errorModifyTwiddit}] = useMutation(newTwiddit, {
      variables: {
        userId: userId,
        text: text, 
        creationDate: new Date(), 
        imageURL1: imageURL[0] ? imageURL[0] : "",
        imageURL2: imageURL[1] ? imageURL[1] : "",
        imageURL3: imageURL[2] ? imageURL[2] : "",
        imageURL4: imageURL[3] ? imageURL[3] : "",
        communidditsId: communidditId
      },
      enabled:false,
      onCompleted:(dataModifyTwiddit) => {
        console.log(dataModifyTwiddit)  
        storeData("communidditId", null)
        navigation.navigate("Twiddit")
        
        
      },
      onError(errorModifyTwiddit){
        console.log(errorModifyTwiddit)
      }
    })


    useEffect(() => {
      getUserID()
      getCommunidditId()
    }, [])

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
                    Share your thoughts
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
                        placeholder="What's happening?"
                        onChangeText={text => settext(text)}
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
                    
                      <FlatList
                        data={imageURL}
                        horizontal={true}
                        renderItem={({item}) =>(
                            <Image source={{uri: item}} style={{
                              width:70,
                              height:50
                            }}/>
                        )}
                        keyExtractor={(item)=>item}
                      />
                    
                    <Block middle>
                        
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
                    </Block>
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
    height: height * 0.70,
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
    backgroundColor: "#d10a30"
  }
});