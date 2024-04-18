import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView, 
  Image,
  VirtualizedList,
  FlatList
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input, Notification } from "../components";
import { Images, argonTheme } from "../constants";

import { useMutation } from "@apollo/client";
import { viewNotifications, userProfileData } from "../gql/queries";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get("screen");
import { useQuery, useLazyQuery } from "@apollo/client";

export default function Notifications (props){
    const { navigation } = props;
    let followers = []
    const [notification, setNotification] = useState([])
    const [followerId, setFollowerId] = useState(1)
    const [username, setUsername] = useState("USUARIO DE PRUEBA")
    const [cargando, setCargando] = useState(false)
    const [userId, setUserId] = useState(0)
    

    const getUserID = async () => {
      try {
        const value = await AsyncStorage.getItem("UserID")
  
        if(value !== null) {
          await setUserId(JSON.parse(value))
        }
      } catch(e) {
        console.log(e)
      }
    }
    
    useEffect(()=>{
      getUserID()
    }, [])

    useEffect(() => {
      if (userId != 0){
        console.log(userId)
  
        notificationsQuery()
      }
    }, [userId])
  

    const [notificationsQuery, {data, loading, error}] = useLazyQuery(viewNotifications, {
        variables: {
        userId: userId, 
        },
        enabled:false,
        onCompleted:(data) => {
            //console.log(data.viewNotifications)
            setNotification(data.viewNotifications) 
            setCargando(true)
        },
        onError(error){
            console.log(error)
        }
    })
    // Obtener los datos del usuario que me siguio
    const [runQuery, {dataFollower, loadingFollower, errorFollower}] = useLazyQuery(userProfileData, {
      variables: {
        userId: followerId, 
      },
      enabled:false,
      onCompleted:(data) => {
        console.log(data)
      },
      onError(error){
        console.log(error)
      }
    })




    if (cargando) {

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
                  <Text color="#8898AA" size={13}>
                    Hey there! These are your notifications
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    
                    <FlatList
                      data={data.viewNotifications}
                      renderItem={({item}) => <Block flex style={styles.twidditsContainer}><Text>{item.followerUsername} started following you</Text></Block>
                      }
                      keyExtractor={item => item.followerID}
                    />
                                        
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={() => {
                        navigation.navigate("Profile")
                      }}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          BACK TO PROFILE
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
  }


const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
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
  twidditsContainer: {
    // position: "relative",
    width:width*0.8,
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: 10,
    marginTop:0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
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
