import React, { useState } from "react";
import { Linking } from "expo";
import { truncate } from "lodash";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Url } from "../models/UrlStateTypes";
import { LinkBox } from "../styles/listStyles/Linkbox";
import { Title } from "../styles/listStyles/LinkTitle";
import { Desc } from "../styles/listStyles/LinkDesc";
import { _Url } from "../styles/listStyles/LinkUrl";
import { Tag } from "../styles/listStyles/LinkTag";
import { Img } from "../styles/listStyles/LinkImg";
import { AntDesign } from "@expo/vector-icons";
import useLinkData from "../hooks/useLinkData";
import sendFavoriteRequest from "../core/apis/favorite";
const link = ({ data }: Url): JSX.Element => {
  // const [lastTap, setLastTap] = useState<number>(Date.now());
  const { onFavoriteBtnPress } = useLinkData();
  const sliceText = (text: string, length: number) => {
    return truncate(text, { length });
  };

  const renderDesc = (description: string): JSX.Element | void => {
    return <Desc>{sliceText(description, 20)}</Desc>;
  };

  // const handleDoubleTap = (url_id: number, favorite: boolean) => {
  //   const now = Date.now();
  //   const DOUBLE_PRESS_DELAY = 300;
  //   if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
  //     handleFavoriteDoublePress(url_id, favorite);
  //   } else {
  //     setLastTap(now);
  //     // lastTap = now;
  //   }
  // };
  const handleFavoriteBtnPress = async (linkData: Url) => {
    const { id, favorite } = linkData;
    try {
      sendFavoriteRequest(id, favorite);
      await onFavoriteBtnPress(linkData);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <LinkBox>
      <TouchableOpacity onPress={() => handleFavoriteBtnPress(data)}>
        <AntDesign
          name={data.favorite ? "star" : "staro"}
          size={20}
          style={{
            width: 32,
            height: 32,
            top: 20,
            left: 20,

            position: "absolute",
            color: `${data.favorite ? "#ffd93b" : "#dedede"}`,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginLeft: 64 }}
        onPress={() => Linking.openURL(data.url)}
      >
        <Title
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          minimumFontScale={0.01}
        >
          {sliceText(data.og_title, 17)}
        </Title>
        {data.og_description && renderDesc(data.og_description)}
        <_Url>{sliceText(data.url, 36)}</_Url>
        <FlatList
          data={data.tags}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          scrollEnabled={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Tag>{item}</Tag>}
        />
        <Img
          source={{
            uri: `${data.og_image}`,
          }}
        />
      </TouchableOpacity>
    </LinkBox>
  );
};

export default link;
