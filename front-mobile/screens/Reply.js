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

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQuery } from "@apollo/client";

import { useMutation, useQuery } from "@apollo/client";
import { newReply,repliesTwiddit } from "../gql/queries";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

export default function Reply (props) {
    const { navigation } = props;
    const [userId,setuserId] = useState();
    const [text,settext] = useState("");
    const [twidditId,settwidditId] = useState();
    const [user,setuser] = useState("");
    const [twidditText,settwidditText] = useState("");
    const [replies,setreplies] = useState([]);
    const [feedLoadnig, setFeedLoading] = useState(true)

    useEffect(() => {
      getUserID()
      getParams()
      if (twidditId != ""){

  
        repliesQuery()
      }
    }, [])



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

    const getParams = async () => {
      try {
        const twidditIdvalue = await AsyncStorage.getItem("twidditId")
        const uservalue = await AsyncStorage.getItem("user")
        const twidditTextvalue = await AsyncStorage.getItem("textTwiddit")

        if(twidditIdvalue !== null && uservalue !== null && twidditTextvalue !== null) {
          settwidditId(JSON.parse(twidditIdvalue))
          setuser(JSON.parse(uservalue))
          settwidditText(JSON.parse(twidditTextvalue))
          return value
        }
      } catch(e) {
        // error reading value
      }
    }

    const [repliesQuery,{data, loading, error, refetch}] = useLazyQuery(repliesTwiddit, {
      variables: {
        twidditId: twidditId, 
      },
      
      onCompleted:(data) => {
        setreplies(data.repliesTwiddit)
        setFeedLoading(true)
        console.log(data)
      },
      onError(error){
        console.log(error)
      }
    })

    const [runMutation, {dataModifyReply, errorModifyReply}] = useMutation(newReply, {
      variables: {
        userId: userId,
        text: text, 
        twidditId: twidditId,
        creationDate: new Date()
      },
      enabled:false,
      onCompleted:(dataModifyReply) => {
        console.log(dataModifyReply)  
        navigation.navigate("Twiddit")
        
        
      },
      onError(errorModifyReply){
        console.log(errorModifyReply)
      }
    })



    if (!feedLoadnig){
      return(
        <Text>Loading</Text>
      )
    }else{



    return (
      
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.twidditRegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={10}>
                    @{user}
                  </Text>
                </Block>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={20}>
                    {twidditText}
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
                        placeholder="Any comment?"
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
                    

                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={() => {
                        runMutation()
                      }}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          REPLY
                        </Text>
                      </Button>
                    </Block>

                    <Block middle>
                    <Text bold size={14} color={argonTheme.COLORS.BLACK}>
                          Other users replied:
                        </Text>
                    </Block>

                    <Block flex={0.8} middle>
                <FlatList
                        data={replies}
                        renderItem={({item}) =>(
                          <Block style={styles.twidditsContainer}>
                            <Text size={14} style={styles.cardTitle}>@{item.userId}</Text>
                            <Text size={12} >{item.text}</Text>
                          </Block>
                        )}
                        keyExtractor={(item)=>item}
                      />
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