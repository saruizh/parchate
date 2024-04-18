import React from 'react';
import { StyleSheet, Dimensions, ScrollView, VirtualizedList } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { userFeed } from "../gql/queries";
import { useQuery } from "@apollo/client";


import { Card } from '../components';
import twiddits_prueba from '../constants/twiddits_prueba';
const { width } = Dimensions.get('screen');

let itemIndex = -1;

const getItem = (_data, index) => {
  itemIndex += 1;
  return twiddits_prueba[itemIndex]


};

<VirtualizedList
                initialNumToRender={4}
                renderItem={({item}) => <Text>{item.twiddit.text}</Text>}
                keyExtractor={item => item.twiddit._id}
                getItemCount={getItemCountData}
                getItem={getItemData}
              />

const getItemCount = _data => twiddits_prueba.length;

export default function Twiddits (props)  {


  const Render = ({user, data}) => {

    let itemIndexData = -1;

    const getItemData = (_data, index) => {
      itemIndexData += 1;
      return data[itemIndexData]
    };

    const getItemCountData = _data => data.length;

    return (
      <>
        <VirtualizedList
            initialNumToRender={data.length}
            renderItem={({item}) => <Card user = {user} twiddit = {item.twiddit}/>}
            keyExtractor={item => item.twiddit._id}
            getItemCount={getItemCountData}
            getItem={getItemData}
          />
      </>
    )
  }

    return (
      
        <VirtualizedList
          initialNumToRender={twiddits_prueba.length}
          renderItem={({item}) => <Render user={item.user} data = {item.twiddit} />}
          keyExtractor={item => item.user.username}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      
    );
  
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});