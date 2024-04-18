import {gql} from "apollo-boost";

export const login=gql `
query login($email:String!, $password:String!){
    login(loginBody:{
        email: $email,
        password: $password
      }){
        message
        data{
          accessToken
          userId
        }
    
    }
}`;

export const register=gql `
mutation register($username: String!, $email:String!, $password:String!, $birthday: String!, $phone: String!, $description: String!){
  register(registerBody:{
    username:$username
    email: $email,
    password: $password,
    birthday: $birthday,
    phone:$phone,
	  description:$description,  
    profilePhoto:"https://dummyimage.com/640x360/fff/aaa", 
	  
  })
  {
  	message  
  }
}`;

export const changePassword=gql`
mutation password($previous: String!, $new: String!, $authorization: String!){
  password(passwordChangeBody:{
    Previous: $previous
    NewPass: $new,
    Authorization: $authorization
  }) {
    message
  }
}
`

export const updateProfile=gql`
mutation updateProfile($userId: Int!, $email:String!, $phone: String!, $description: String!){
  updateProfile(id: $userId, profile: {
      email: $email
      phone: $phone
      description: $description
  }){
      email
      birthday
      phone
      profile_photo
      description
      username
  }
}

`

export const twidditFeed=gql`
query userFeed($userId: Int!){
  userFeed(userId: $userId){
    user{
      username 
    }
    twiddit {
      twiddit {
        _id
        communidditsId
        retwidditId
        text
        imageURL1
        imageURL2
        imageURL3
        imageURL4
        videoURL
      }
      number_of_replies
      number_of_likes
    }
  }
}
`
export const userProfileData=gql`
query viewProfile($userId: Int!){
  viewProfile(id:$userId){
    username
    email
    birthday
    phone
    profile_photo
    description
  }
}
`

export const userTwiddits=gql`
query MyTwiddits($userId: Int!){
    myTwiddits(userId:$userId){
      user {
        username
      }
      twiddit {
        twiddit {
          _id
          tags
          text
          imageURL1
          imageURL2
          imageURL3
          imageURL4
          communidditsId
          creationDate
          
        }

        number_of_likes
        number_of_replies
        number_of_dislikes
      }
    }
}

`

export const communidditsAll=gql`
query{
  communidditsAll{
    communidittId
    aboutUs
    name
    members
  }
}
`
export const createCommuniddit=gql`
mutation createCommuniddit($name: String!, $aboutUs:String!, $mods:[String!]){
  createCommuniddit(communiddit: {
    name: $name,
    aboutUs: $aboutUs,
    mods: $mods,
	})
}`

export const addCommunidditmember=gql`
mutation addCommunidditMember($communidditId: Int!, $userId: Int!){
  addCommunidditMember(communidditId:$communidditId,userId:$userId)
}
`
export const removeCommunidditMember=gql`
mutation removeCommunidditMember($communidditId: Int!, $userId: Int!){
  removeCommunidditMember(communidditId:$communidditId,userId:$userId)
}
`

export const communidditFeed=gql`
query communidditFeed($communidditId:Int!){
  communidditsFeed(communidditId:$communidditId){
    user {
      username
    }
    twiddit {
      twiddit {
        text
        creationDate
      }
    }
  }
}
`

export const viewNotifications=gql`
query viewNotifications($userId: Int!){
  viewNotifications(id: $userId){
      followerUsername
  }
}

`
export const getSingleTwidditData=gql`
query infoTwiddit($twidditId: String!){
  infoTwiddit(twidditId:$twidditId){
    number_of_likes
    number_of_replies
  }
}
`

export const getFollowerNumber=gql`
query numberFollowers($followedId: Int!){
	numberFollowers(followedId: $followedId){
		numberFollowers
}
}

`

export const getFollowedNumber=gql`
query numberFollowing($followerId: Int!){
	numberFollowing(followerId: $followerId){
		numberFollowing
}
}
`
export const newTwiddit=gql`
mutation createTwiddit($userId: Int!, $text:String!, $creationDate:String!, $imageURL1: String!, $imageURL2: String!, $imageURL3: String!, $imageURL4: String!, $communidditsId: String){
  createTwiddit(twiddit: {
    userId: $userId,
    text: $text,
    creationDate: $creationDate,
    imageURL1: $imageURL1,
    imageURL2: $imageURL2,
    imageURL3: $imageURL3,
    imageURL4: $imageURL4,
    communidditsId: $communidditsId
	}){
    _id
    text
    retwidditId
  }
}`

export const newReply=gql`
mutation createReply($userId: Int!, $text:String!, $twidditId:String!, $creationDate:String!){
  createReply(reply: {
    userId: $userId,
    text: $text,
    twidditId: $twidditId,
    creationDate: $creationDate
	}){
    twidditId
    text
  }
}`

export const repliesTwiddit=gql`
query repliesTwiddit($twidditId: String!){
	repliesTwiddit(twidditId: $twidditId){
		userId
    text
}
}
`

export const likesTwiddit = gql`
query likesTwiddit($twidditId: String!){
  likesTwiddit(twidditId:$twidditId){
    _id
    userId
    twidditId
    creationDate
    replyId
  }
}
`

export const likeTwiddit = gql`
mutation createLike($userId: Int!, $twidditId:String!, $creationDate: String!){
  createLike(like: {userId: $userId, twidditId: $twidditId, creationDate: $creationDate}){
      _id
  }
}
`

export const deleteLikeTwiddit = gql`
mutation deleteLike($likeId: String!){
  deleteLike(likeId: $likeId){
      userId
  }
}
`
export const communidditFeedQuery = gql`
query communidditsFeed($communidditId: Int!){
  communidditsFeed(communidditId: $communidditId){
    user{
      username 
    }
    twiddit {
      twiddit {
        _id
        communidditsId
        retwidditId
        text
        imageURL1
        imageURL2
        imageURL3
        imageURL4
        videoURL
      }
      number_of_replies
      number_of_likes
    }
  }
}
`