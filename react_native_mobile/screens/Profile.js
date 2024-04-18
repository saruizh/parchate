import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Platform,
  VirtualizedList
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Twiddit, Icon } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import articles from '../constants/articles';
import { userProfileData, userTwiddits, getSingleTwidditData, getFollowerNumber, getFollowedNumber } from "../gql/queries";
import { useQuery, useLazyQuery } from "@apollo/client";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

export default function Profile (props) {
  const { navigation } = props;
  const [userId, setUserId] = useState(0)
  const [feed, setFeed] = useState([])
  const [followerNumber, setFollowerNumber] = useState(0)
  const [followedNumber, setFollowedNumber] = useState(0)
  const [cargando, setCargando] = useState(false)

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

      profileQuery()
      followedNumberQuery()
      followedNumberQuery()
      userTwidditsQuery()
    }
  }, [userId])

  // Query for user profile data
  const [profileQuery, {data, loading, error}] = useLazyQuery(userProfileData, {
    variables: {
      userId: userId, 
    },
    enabled:false,
    onCompleted:(data) => {
      console.log(data)
    },
    onError(error){
      console.log(error)
    }
  })

  // Query for number of followers
  const [followerNumberQuery, {dataFollowers, loadingFollowers, errorFollowers}] = useLazyQuery(getFollowerNumber, {
    variables: {
      followedId: userId, 
    },
    enabled:false,
    onCompleted:(dataFollowers) => {
      console.log("Cuentas que siguen al usuario")
      console.log(dataFollowers)
      setFollowerNumber(dataFollowers.numberFollowers.numberFollowers)
    },
    onError(error){
      console.log(errorFollowers)
    }
  })

  // Query for number of followed accounts
  const [followedNumberQuery, {dataFollowed, loadingFollowed, errorFollowed}] = useLazyQuery(getFollowedNumber, {
    variables: {
      followerId: userId, 
    },
    enabled:false,
    onCompleted:(dataFollowed) => {
      console.log("Cuentas que sigue el usuario")
      console.log(dataFollowed)
      setFollowedNumber(dataFollowed.numberFollowing.numberFollowing)
    },
    onError(errorFollowed){
      console.log(errorFollowed)
    }
  })

  // Query for users twiddits
  const [userTwidditsQuery, {dataMyTwiddits, loadingTwiddits, errorMyTwiddits}] = useLazyQuery(userTwiddits, {
    variables: {
      userId: userId, 
    },
    enabled:false,
    onCompleted:(dataMyTwiddits) => {
      // console.log(dataMyTwiddits.myTwiddits.twiddit)
      setFeed(dataMyTwiddits.myTwiddits.twiddit)
      setCargando(true)
    },
    onError(errorMyTwiddits){
      console.log(errorMyTwiddits)
    }
  })

  //reply
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

  if (!cargando){
    return (
      <Text>Loading</Text>
    );
  }

  if (cargando) {
    let itemIndexData=-1;
    const getItemData = (_data, index) => {
      itemIndexData += 1;
      console.log(feed[itemIndexData])
      return feed[itemIndexData]
    };

    const getTwidditInfo = (twidditId) => {
      setTwidditId(twidditId)
      runTwidditInfoQuery()
      return 0 
    }


    const getItemCountData = _data => 1;
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.twidditRegisterBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%', height }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      small
                      style={{ backgroundColor: "#d10a30", width: 100 }}
                      onPress={() => navigation.navigate('EditProfile')}
                    >
                      EDIT PROFILE
                    </Button>
                    <Button
                      small
                      style={{ backgroundColor: "#d10a30", width: 100 }}
                      onPress={() => navigation.navigate('Notifications')}
                    >
                      <Icon
                            size={16}
                            color={argonTheme.COLORS.WHITE}
                            name="bell"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                    </Button>
                    
                  </Block>
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}></Text>
                    </Block>
                    
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        {followerNumber}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Followers</Text>
                    </Block>

                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        {followedNumber}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Followed</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}></Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {data.viewProfile.username}
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                      {data.viewProfile.email}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                      {data.viewProfile.description}
                    </Text>
                  </Block>
                </Block>
              </Block>
      
            </ScrollView>
            
            <FlatList
                data={feed}
                renderItem={({item}) => 
                <Block style={styles.twidditsContainer}>
                  <Text size={14} style={styles.cardTitle}>@{data.viewProfile.username}</Text>
                  <Text size={12} >{item.twiddit.text}</Text>
                  <Text size={10} color={argonTheme.COLORS.ACTIVE} bold>{item.twiddit.tags}</Text>
                  
                    <Block row flex={0.25} middle style={styles.socialConnect}>
                      <Block flex left>
                          <Button small center color="default" style={styles.twidditButton}onPress={()=>{reply(item.twiddit._id, data.viewProfile.username, item.twiddit.text)}}>
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
                          <Button small center color="default" style={styles.twidditButton}>
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
            
          </ImageBackground>
          
        </Block>
        {}
        
      </Block>
      
    );
  }

    // End inf
  }
    

  /* 
        !!!!!!!!!

        ESTO PUEDE SERVIR PARA HACER LA GALERIA DE IMAGENEEEES!!!!!!!!!!!!!!!!!!
        <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                      {Images.Viewed.map((img, imgIndex) => (
                        <Image
                          source={{ uri: img }}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      ))}
                    </Block>
                  </Block>
        <ScrollView showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{ flex: 1, width, height, zIndex: 9000, backgroundColor: 'red' }}>
        <Block flex style={styles.profileCard}>
          <Block middle style={styles.avatarContainer}>
            <Image
              source={{ uri: Images.ProfilePicture }}
              style={styles.avatar}
            />
          </Block>
          <Block style={styles.info}>
            <Block
              middle
              row
              space="evenly"
              style={{ marginTop: 20, paddingBottom: 24 }}
            >
              <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }}>
                CONNECT
              </Button>
              <Button
                small
                style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
              >
                MESSAGE
              </Button>
            </Block>

            <Block row space="between">
              <Block middle>
                <Text
                  bold
                  size={12}
                  color="#525F7F"
                  style={{ marginBottom: 4 }}
                >
                  2K
                </Text>
                <Text size={12}>Orders</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 4 }}>
                  10
                </Text>
                <Text size={12}>Photos</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 4 }}>
                  89
                </Text>
                <Text size={12}>Comments</Text>
              </Block>
            </Block>
          </Block>
          <Block flex>
              <Block middle style={styles.nameInfo}>
                <Text bold size={28} color="#32325D">
                  Jessica Jones, 27
                </Text>
                <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                  San Francisco, USA
                </Text>
              </Block>
              <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <Block middle>
                <Text size={16} color="#525F7F" style={{ textAlign: "center" }}>
                  An artist of considerable range, Jessica name taken by
                  Melbourne …
                </Text>
                <Button
                  color="transparent"
                  textStyle={{
                    color: "#233DD2",
                    fontWeight: "500",
                    fontSize: 16
                  }}
                >
                  Show more
                </Button>
              </Block>
              <Block
                row
                style={{ paddingVertical: 14, alignItems: "baseline" }}
              >
                <Text bold size={16} color="#525F7F">
                  Album
                </Text>
              </Block>
              <Block
                row
                style={{ paddingBottom: 20, justifyContent: "flex-end" }}
              >
                <Button
                  small
                  color="transparent"
                  textStyle={{ color: "#5E72E4", fontSize: 12 }}
                >
                  View all
                </Button>
              </Block>
              <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                <Block row space="between" style={{ flexWrap: "wrap" }}>
                  {Images.Viewed.map((img, imgIndex) => (
                    <Image
                      source={{ uri: img }}
                      key={`viewed-${img}`}
                      resizeMode="cover"
                      style={styles.thumb}
                    />
                  ))}
                </Block>
              </Block>
          </Block>
        </Block>
                  </ScrollView>*/
  

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
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
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
