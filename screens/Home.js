import { React, useState, useEffect, useRef} from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";
// import { BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
// import "expo-dev-client";


import app from "../src/FireStore";
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Home(props) {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [chanels, setChanels] = useState([]);
  const [currentChanel, setCurrentChanel] = useState([]);

  const db = getFirestore(app);

  const auth = getAuth();

  const loadData = async () => {
    const q = query(collection(db, "Channels"));
    let chanels = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      chanels.push(doc.data());
      
    });
    setChanels(chanels);
  };

  useEffect(() => {
    loadData(chanels);
  }, [chanels]);


  //Youtube.
  //const [playing, setPlaying] = useState(false);



  //

  return (
    <View style={styles.container}>
      {currentChanel.streamingUrl ? 
      (
        <View style={styles.vid}>
          {currentChanel.streamingUrl.includes("youtu") ? 
          (
          <YoutubePlayer
          height={300}
          play={true}
          forceAndroidAutoplay={true}
          videoId={currentChanel.id}
          />
          ):
          <Video
          ref={video}
          style={styles.vid}
          source={{
            uri: currentChanel.streamingUrl,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />}
        </View>
      ) : <Image source={require('../assets/placed.png')} style={styles.vid}></Image>}
      
        <View style={styles.baseLine}>
        
        <Image
          style={styles.logo}
          resizeMode={"contain"}
          source={{ uri: currentChanel.img }}
        />
        {currentChanel.streamingUrl ?(
        <Text style={styles.baseLineText}>
          {`${currentChanel.name}`} Live Streaming.
        </Text>
        ):
        <Text style={styles.baseLineText}>
          Select a Channel from below list.
        </Text>}
      </View>

      {/* <BannerAd
      unitId={"ca-app-pub-4489583181179784/9195835028"}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    /> */}

      <View style={styles.list}>
        <FlatList
          data={chanels}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setCurrentChanel(item);
                }}
                style={styles.card}
              >
                <Image source={{ uri: item.img }} style={styles.image}></Image>
                <Text style={styles.txt}>Live</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e7edf0",
  },
  vid: {
    width: "100%",
    height: 225,
    backgroundColor: "#000000",
  },

  baseLine: {
    flexDirection: "row",
    height: 50,
    padding: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf:'center',
  },

  baseLineText: {
    marginStart: 10,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  card: {
    width: 150,
    height: 100,
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column",
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  list: {
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    alignSelf: 'center',
  },
  txt: {
    color: "red",
    position: "absolute",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 5,
    right: 15,
    fontSize: 14,
    fontWeight: "bold",
  },
});
