import { Block, Text, theme } from "galio-framework";
import { Image, ScrollView, StyleSheet } from "react-native";

import { DrawerItem as DrawerCustomItem } from "../components";
import Images from "../constants/Images";
import React from "react";


function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const screens = ["Home", "Profile", "Planes", "Communiddits","Newplan", "Newvaca"];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.06} style={styles.header}>
        <Text>Parchate</Text>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
            
          </Block>
          
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  },
});

export default CustomDrawerContent;