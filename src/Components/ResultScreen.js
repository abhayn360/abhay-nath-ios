import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Store';
import { getUserListForView } from '../ViewModal/UserViewmodal';

const ResultsScreen = () => {
  const dispatch = useDispatch();
  const { login, users, page, loading, hasMore } = useSelector((state) => state);

  const fetchMoreUsers = () => {
    if (!loading && hasMore) {
      dispatch(fetchUsers({ login, page }));
    }
  };

  useEffect(() => {
    fetchMoreUsers(); 
  }, []);

  const transformedUsers = getUserListForView(users);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        titleStyle={{fontSize:16,fontWeight:'500'}}
        subtitle={item.type}
        style={{borderRadius:14,}}
        left={(props) => <Avatar.Image {...props} source={{ uri: item.avatar }} size={45}/>}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transformedUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={styles.loader} /> : null}
        testID="flatlist"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  card: {
    margin: 6,

  },
  loader: {
    marginVertical: 16,
  },
});

export default ResultsScreen;
