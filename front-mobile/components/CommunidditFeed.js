import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import { communidditFeed, communidditsAll } from "../gql/queries";
import { useQuery } from "@apollo/client";


import { Card } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

export default function Communiddits (props)  {


  const {data, loading, error} = useQuery(communidditFeed, {
    enabled:false,
    onCompleted:(data) => {
      console.log(data)
    },
    onError(error){
      console.log(error)
    }
  })

  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[5]} horizontal  />
        </Block>
        <Block flex>
          <Card item={articles[5]} horizontal  />
        </Block>
        <Block flex>
          <Card item={articles[5]} horizontal  />
        </Block>
      </ScrollView>
    )
  }

    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
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
