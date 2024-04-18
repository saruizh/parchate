import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import Twiddit from '../components/Twiddit';
const { width } = Dimensions.get('screen');

class Search extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Twiddit item={articles[7]}></Twiddit>
        </Block>
        <Block flex>
          <Twiddit item={articles[8]}></Twiddit>
        </Block>
        <Block flex>
          <Twiddit item={articles[6]}></Twiddit>
        </Block>
        <Block flex>
          <Twiddit item={articles[9]}></Twiddit>
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        
        {this.renderArticles()}
      </Block>
    );
  }
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

export default Search;
