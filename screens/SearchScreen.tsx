import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSafeArea} from '../hooks/useSafeAre';
import {toggleActive} from '../redux/slices/SpinnerSlice';
import {
  getSummonerByName,
  getSummonerLeague,
  getSummonerMatchesIds,
  getSummonetMatchesInfo,
} from '../services/SummonerService';
import {colors, sizes} from '../styles/main';

function SearchScreen() {
  const {insets} = useSafeArea();
  const [textInputValue, setTextInputValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleSummoner = (): void => {
    setError(false);
    try {
      dispatch(toggleActive(true));
      getSummonerByName(textInputValue)
        .then(summoner => {
          getSummonerLeague(summoner.id)
            .then(league => {
              getSummonerMatchesIds(summoner.puuid, 10)
                .then(matchesIds => {
                  getSummonetMatchesInfo(matchesIds, summoner.puuid)
                    .then(matchesInfo => {
                      dispatch(toggleActive(false));
                      console.log(league[0]);
                      if (league[0] && summoner && matchesInfo) {
                        navigation.navigate('SummonerOverView', {
                          league: league[0],
                          summoner,
                          matchesInfo,
                        });
                      } else {
                        setError(true);
                      }
                    })
                    .catch(() => {
                      dispatch(toggleActive(false));
                    });
                })
                .catch(() => {
                  dispatch(toggleActive(false));
                });
            })
            .catch(() => {
              dispatch(toggleActive(false));
            });
        })
        .catch(() => {
          dispatch(toggleActive(false));
        });
    } catch (e) {
      console.log(e);
      dispatch(toggleActive(false));
    }
  };
  return (
    <View
      style={{
        ...insets,
        backgroundColor: colors.primary,
        flex: 1,
        ...styles.searchScreenContainer,
      }}>
      <TextInput
        style={styles.searchBar}
        onChangeText={text => setTextInputValue(text)}
        value={textInputValue}
        placeholder="Insert your text!"
        placeholderTextColor={colors.white}
      />
      <Button title="search" onPress={handleSummoner} />
      {error ? (
        <View>
          <Text>NO SUMMONER FINDED!</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  searchScreenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    height: 40,
    width: '80%',
    borderColor: colors.gray,
    borderWidth: 1,
    backgroundColor: colors.light,
    borderRadius: sizes.md,
    paddingHorizontal: sizes.md,
  },
});

export default SearchScreen;
