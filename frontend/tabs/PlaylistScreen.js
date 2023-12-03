// PlaylistScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native';

const PlaylistScreen = ({ route }) => {
  const { params } = route;
  const [playlist, setPlaylist] = useState(params?.song ? [params.song] : []);

  useEffect(() => {
    if (params?.song) {
      setPlaylist(prevPlaylist => [...prevPlaylist, params.song]);
    }
  }, [params]);

  const handleLinkPress = (link) => {
    console.log('Opening Spotify link:', link);
    Linking.openURL(link);
  };

  const handleDelete = (index) => {
    setPlaylist(prevPlaylist => prevPlaylist.filter((item, i) => i !== index));
  };

  const renderSong = ({ item, index }) => (
    <TouchableOpacity style={styles.songContainer}>
      {item.album_image && <Image source={{ uri: item.album_image }} style={styles.albumImage} />}
      <View style={styles.textContainer}>
        <Text>{item.name} by {item.artists.join(', ')}</Text>
        <TouchableOpacity onPress={() => handleLinkPress(item.spotify_link)}>
          <Text style={styles.linkText}>Spotify Link</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleDelete(index)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Playlist</Text>
      <FlatList
        data={playlist}
        keyExtractor={(item) => item.name}
        renderItem={renderSong}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1B139',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  flatList: {
    flex: 1,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumImage: {
    width: 50,
    height: 50,
    marginVertical: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
  },
});

export default PlaylistScreen;
