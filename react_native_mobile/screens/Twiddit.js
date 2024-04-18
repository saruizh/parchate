import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { twidditFeed, likesTwiddit,likeTwiddit, deleteLikeTwiddit } from "../gql/queries";
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
  const [userFeed, setUserFeed] = useState([]);
  const [userId, setUserId] = useState(0)
  const [feedLoadnig, setFeedLoading] = useState(false)

  useEffect(()=>{
    getUserID()
  }, [])

  useEffect(() => {
    if (userId != 0){
      console.log(userId)

      feedQuery()
    }
  }, [userId])

  useEffect(() => {

  }, [userFeed])



  let [feedQuery, {data, error, refetch}] = useLazyQuery(twidditFeed, {
    variables: {
      userId: userId, 
    },
    enabled:false,
    onCompleted:(data) => {
      setFeedLoading(true)
      setUserFeed(data.userFeed)
      
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

  

  const [likeQuery, dataLikes] = useLazyQuery(likesTwiddit)
    
  

  const [likeMutation] = useMutation(likeTwiddit) 

  const [deleteLikeMutation] = useMutation(deleteLikeTwiddit)
  
  const createLike = (twiddit, user) => {
    likeMutation({
      variables: {
        twidditId: twiddit,
        userId: user ,
        creationDate: Date.now()
      },
      refetchQueries: [likeQuery],
      enabled:false,
      onCompleted:(data) => {
        console.log("LikeMutation")
        console.log(twiddit)
        console.log("Like añadido correctamente")
        dataLikes.refetch()
        refetch()
        
      },
      onError(error){
        console.log(error)
      }
    })
  }

  const deleteLike = likeId => {
    deleteLikeMutation({
      variables: {
        likeId: likeId
      },
      enabled:false,
      onCompleted:(data) => {
        console.log("Like eliminado exitosamente")
        dataLikes.refetch()
        refetch()
      },
      onError(error){
        console.log(error)
      }
    })
  }

  const like = id => {
      isLike = true
      likeQuery({
      variables: {
        twidditId: id 
      },
      
      enabled:false,
      onCompleted:(data) => {
        if (isLike) {
          likes = data.likesTwiddit.filter((like) => ((like.userId == 1) && (like.twidditId == id) ))
          console.log(likes)
          if (likes.length > 0) {
            deleteLike(likes[0]._id)
          }else{
            createLike(id, 1)
          }
  
        }
        isLike=false
        
      },
      onError(error){
        console.log(error)
      }
    })
  }


  if (!feedLoadnig){

    return(
      <Text>Loading</Text>
    )
  }else{
    console.log(data)
    const getItem = (_data, index) => {
      itemIndex += 1;
      return userFeed[itemIndex]
    };
  
    const getItemCount = _data => userFeed.length;

    

    const Render = ({dataR}) => {

      let itemIndexData = -1;

      const getItemData = (_data, index) => {
        itemIndexData += 1;
        return data[itemIndexData]
      };

      const getItemCountData = _data => data.length;


      const reply= (_id,user,textTwiddit)=>{
        storeData("twidditId",_id)
        storeData("user",user)
        storeData("textTwiddit",textTwiddit)
        navigation.navigate('Reply')
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


      return (
          <FlatList
              data={dataR.twiddit}
              renderItem={({item}) => 
              <Block style={styles.twidditsContainer}>
                <Text size={14} style={styles.cardTitle}>@{dataR.user.username}</Text>
                <Text size={12} >{item.twiddit.text}</Text>
                <Text size={10} color={argonTheme.COLORS.ACTIVE} bold>{item.twiddit.tags}</Text>
                
                  <Block row flex={0.25} middle style={styles.socialConnect}>
                    <Block flex left>
                        <Button small center color="default" style={styles.twidditButton} onPress={()=>{reply(item.twiddit._id, dataR.user.username, item.twiddit.text)}}>
                            <Block row>
                                <Icon
                                    size={12}
                                    color={argonTheme.COLORS.WHITE}
                                    name="ic_mail_24px"
                                    family="ArgonExtra"
                                />
                                <Text style={styles.twidditInteractions}> {item.number_of_replies}</Text>
                            </Block>
                        </Button>
                    </Block>
                    <Block flex center>
                        <Button onPress = {()=>{like(item.twiddit._id)}} small center color="default" style={styles.twidditButton}>
                            <Block row>
                                <Icon
                                    size={12}
                                    color={argonTheme.COLORS.WHITE}
                                    name="diamond"
                                    family="ArgonExtra"
                                />
                                <Text style={styles.twidditInteractions}> {item.number_of_likes}</Text>
                            </Block>
                        </Button>
                    </Block>
                    <Block flex right>
                        
                    </Block>
            </Block>
          </Block>
        
              
            }
              keyExtractor={item => item.twiddit._id}
            />
        
      )
    }

      return (
        
          <FlatList
            data={userFeed}
            renderItem={({item}) => <Render dataR={item}/>}
            keyExtractor={item => item.user.username}
          />
        
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