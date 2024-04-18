import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Button, Header, Icon, Input, Select, Switch } from "../components/";

import { argonTheme } from '../constants';


class Twiddit extends React.Component {
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block flex style={imgContainer}>
            <Image source={{uri: item.image}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} style={styles.cardTitle}>{item.username}</Text>
            <Text size={14} style={styles.cardTitle}>{item.twiddit}</Text>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.cta}</Text>
            <Block row flex={0.25} middle style={styles.socialConnect}>
                <Block flex left>
                    <Button small center color="default" style={styles.twidditButton}>
                        <Block row>
                            <Icon
                                size={16}
                                color={argonTheme.COLORS.WHITE}
                                name="ic_mail_24px"
                                family="ArgonExtra"
                            />
                            <Text style={styles.twidditInteractions}>98</Text>
                        </Block>
                    </Button>
                </Block>
                <Block flex center>
                    <Button small center color="default" style={styles.twidditButton}>
                        <Block row>
                            <Icon
                                size={16}
                                color={argonTheme.COLORS.WHITE}
                                name="nav-right"
                                family="ArgonExtra"
                            />
                            <Text style={styles.twidditInteractions}> 98</Text>
                        </Block>
                    </Button>
                </Block>
                <Block flex right>
                    <Button small center color="default" style={styles.twidditButton}>
                        <Block row>
                            <Icon
                                size={16}
                                color={argonTheme.COLORS.WHITE}
                                name="diamond"
                                family="ArgonExtra"
                            />
                            <Text style={styles.twidditInteractions}> 98</Text>
                        </Block>
                    </Button>
                </Block>
            </Block>
          </Block>
          
        </TouchableWithoutFeedback>
        
        
      </Block>
    );
  }
}

Twiddit.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
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
    paddingBottom: 6
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
  twidditButton: {
    backgroundColor: "#d10a30"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  twidditInteractions: {
    color: argonTheme.COLORS.WHITE,
  },
});

export default withNavigation(Twiddit);