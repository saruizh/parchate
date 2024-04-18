import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, Image, KeyboardAvoidingView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import Twiddit from '../components/Twiddit';
const { width, height } = Dimensions.get('screen');

import { Images, argonTheme } from "../constants";


import { Button, Icon, Input } from "../components";
import { twidditFeed } from "../gql/queries"
import { useQuery } from "@apollo/client";

export default function Home (props) {
  const [clicked, setClicked] = useState(false);
    return (
      <Block flex middle>
        <ImageBackground
          source={Images.twidditRegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex={0.85} middle style={styles.socialConnect}>
                <Image source={Images.twidditFilledLogo} />
          </Block>
        </ImageBackground>

        </Block>
    )
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

