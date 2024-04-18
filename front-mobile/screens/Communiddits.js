import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { communidditsAll, addCommunidditmember, removeCommunidditMember } from "../gql/queries";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';



import { HeaderHeight } from "../constants/utils";
import { Icon, Button } from '../components';
import {Images} from '../constants';
import { argonTheme } from "../constants";
import { FlatList } from "react-native-gesture-handler";

const { width ,height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

let likes = []

let isLike = false



export default function Twiddits (props)  {

  const { navigation } = props;
  const [communidditsList, setCommunidditsList] = useState([]);
  const [userId, setUserId] = useState(0)

  useEffect(()=>{
    getUserID()
  }, [])

  useEffect(() => {
    if (userId != 0){
      console.log(userId)
    }
  }, [userId])

  const [joinCommunidditMutation, dataJoinCommuniddit] = useMutation(addCommunidditmember)
  const [removeCommunidditMemberMutation, dataRemoveCommunidditMember] = useMutation(removeCommunidditMember)


  const {loading, data, error, refetch} = useQuery(communidditsAll, {
    enabled:false,
    onCompleted:(data) => {
      setCommunidditsList(data.communidditsAll)
      
    },
    onError(error){
      console.log(error)
    }
  })

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

  const joinCommuniddit = (id) => {
    joinCommunidditMutation({
      variables: {
        communidditId: id,
        userId: userId ,
      },
      enabled:false,
      onCompleted:(data) => {
        console.log(data)
        refetch()
      },
      onError(error){
        console.log(error)
      }
    })
  }

  const removeMember = (id) => {
    removeCommunidditMemberMutation({
      variables: {
        communidditId: id,
        userId: userId ,
      },
      enabled:false,
      onCompleted:(data) => {
        console.log(data)
        refetch()
      },
      onError(error){
        console.log(error)
      }
    })

  }

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(e)
      // saving error
    }
  }

  const ViewCommuniddit = (communidditId) => {
    storeData("communidditId", communidditId)
    navigation.navigate("ViewCommuniddits")
  }


  if (loading){

    return(
      <Text>Loading</Text>
    )
  }else{

    const ButtonComunniddit = ({x, item}) => {
      if (x) {
        return (
          <>
          <Block flex left>

          <Button onPress = {()=>{ViewCommuniddit(item.communidittId)}} small center color="default" style={styles.twidditButton}>
              <Block row>
                  
                  <Text style={styles.twidditInteractions}>Ver Twiddits</Text>
              </Block>
          </Button>
          </Block>
          <Block flex right>

          <Button onPress = {()=>{removeMember(item.communidittId)}} small center color="default" style={styles.twidditButton}>
              <Block row>
                  
                  <Text style={styles.twidditInteractions}>Dejar Comunidad</Text>
              </Block>
          </Button>
          </Block>
          </>
        )
      }else{
        return (
          
          <Block flex center>

          <Button onPress = {()=>{joinCommuniddit(item.communidittId)}} small center color="default" style={styles.twidditButton}>
              <Block row>
                  
                  <Text style={styles.twidditInteractions}>Unirme</Text>
              </Block>
          </Button>
          </Block>
          
)
      }
    }

    return (
        
          <Block style={styles.registerContainer}>
            <Block middle>
                      <Button color="primary" style={styles.createButton}  onPress={() => {
                        navigation.navigate("NewCommuniddit")
                      }}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          New Communiddit
                        </Text>
                      </Button>
            </Block>
          <FlatList
            data={communidditsList}
            renderItem={({item}) => 
            
            <Block style={styles.twidditsContainer}>
              <Text size={14} style={styles.cardTitle}>@{item.name}</Text>
              <Text size={12} >{item.aboutUs}</Text>
              
                <Block row flex={0.25} middle style={styles.socialConnect}>
                      <ButtonComunniddit item = {item} x = {item.members.includes(userId)}/>
                  
                </Block>
            </Block>
          }
            keyExtractor={item => item.communidittId}
          />
        </Block>
      );
    }
  }

  const styles = StyleSheet.create({
    profile: {
      marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
      // marginBottom: -HeaderHeight * 2,
      flex: 1
    },
    
    profileContainer: {
      width: width,
      height: height,
      padding: 0,
      zIndex: 1
    },
    profileBackground: {
      width: width,
      height: height
    },
    home: {
      width: width,    
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
    },
    twidditsContainer: {
      // position: "relative",
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
    info: {
      paddingHorizontal: 40
    },
    avatarContainer: {
      position: "relative",
      marginTop: -80
    },
    avatar: {
      width: 124,
      height: 124,
      borderRadius: 62,
      borderWidth: 0
    },
    nameInfo: {
      marginTop: 35
    },
    divider: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#E9ECEF"
    },
    twidditButton: {
      backgroundColor: "#d10a30"
    },
    twidditInteractions: {
      color: argonTheme.COLORS.WHITE,
      fontSize:12,
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: "center",
      width: thumbMeasure,
      height: thumbMeasure
    },
  
    card: {
      backgroundColor: theme.COLORS.WHITE,
      marginVertical: theme.SIZES.BASE,
      borderWidth: 0,
      minHeight: 114,
      marginBottom: 16
    },
    cardTitle: {
      flex: 1,
      flexWrap: 'wrap',
      paddingBottom: 6,
      fontWeight:100
    },
    cardDescription: {
      padding: theme.SIZES.BASE / 2
    },
    imageContainer: {
      borderRadius: 3,
      elevation: 1,
      overflow: 'hidden',
    },
    image: {
      // borderRadius: 3,
    },
    horizontalImage: {
      height: 122,
      width: 'auto',
    },
    horizontalStyles: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    verticalStyles: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0
    },
    fullImage: {
      height: 215
    },
    shadow: {
      shadowColor: theme.COLORS.BLACK,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 2,
    },
    socialConnect: {
      backgroundColor: argonTheme.COLORS.WHITE,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: "#8898AA"
    }
});
