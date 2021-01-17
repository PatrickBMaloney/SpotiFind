import spotipy
import spotipy.util as util
import pandas as pd
import numpy as np
import datetime
import csv
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import math
import os

from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth
from math import pi, ceil
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn import svm

# spotify authentication: client_id, client_secret, username need real values
scope = "user-library-read playlist-modify-private playlist-modify-public"
OAuth = SpotifyOAuth(
    scope=scope,
    redirect_uri='http://localhost:8889/callback',
    client_id='id',
    client_secret='secret',
    username='username')

sp = spotipy.Spotify(auth_manager=OAuth)


def get_features_from_favourites():
    '''
    Returns a dataframe of the current user's favourite songs
    '''
    df_result = pd.DataFrame()
    track_list = ''
    added_ts_list = []
    artist_list = []
    title_list = []

    more_songs = True
    offset_index = 0

    while more_songs:
        songs = sp.current_user_saved_tracks(offset=offset_index)

        for song in songs['items']:
            track_list += song['track']['id'] + ','

            added_ts_list.append(song['added_at'])
            title_list.append(song['track']['name'])

            artists = song['track']['artists']
            artists_name = ''
            for artist in artists:
                artists_name += artist['name'] + ','
            artist_list.append(artists_name[:-1])

        track_features = sp.audio_features(track_list[:-1])
        df_temp = pd.DataFrame(track_features)
        df_result = df_result.append(df_temp)
        track_list = ''

        if songs['next'] == None:
            more_songs = False
        else:
            offset_index += songs['limit']
            print('Progress: ' + str(offset_index) +
                  ' of ' + str(songs['total']))

    df_result['added_at'], df_result['song_title'], df_result['artists'] = added_ts_list, title_list, artist_list
    print('--- COMPLETED ---')

    return df_result


def get_features_from_playlist_search(username, playlist_id, keyword):
    '''
    Returns a dataframe of the spotify's playlists given keyword
    '''
    offset = 0
    songs = []
    keyword_list = []
    names = []
    ids = []

    while True:
        content = sp.user_playlist_tracks(
            username, playlist_id, fields=None, limit=100, offset=offset, market=None)
        songs += content['items']
        if content['next'] is not None:
            offset += 100
        else:
            break

    for i in songs:
        ids.append(i['track']['id'])
        names.append(i['track']['name'])
        keyword_list.append(keyword)

    index = 0
    audio_features = []
    while index < len(ids):
        audio_features += sp.audio_features(ids[index:index + 50])
        index += 50

    features_list = []
    for features in audio_features:
        features_list.append([features['energy'], features['liveness'],
                              features['tempo'], features['speechiness'],
                              features['acousticness'], features['instrumentalness'],
                              features['time_signature'], features['danceability'],
                              features['key'], features['duration_ms'],
                              features['loudness'], features['valence'],
                              features['mode'], features['type'],
                              features['uri']])

    df = pd.DataFrame(features_list, columns=['energy', 'liveness',
                                              'tempo', 'speechiness',
                                              'acousticness', 'instrumentalness',
                                              'time_signature', 'danceability',
                                              'key', 'duration_ms', 'loudness',
                                              'valence', 'mode', 'type', 'uri'])
    df['song_title'] = names
    df['id'] = ids
    df['keyword'] = keyword_list
    return df


def load_playlist(playlist=r'/Users/alex 1/Desktop/Spotifind/saved_tracks.h5'):
    '''
    Returns dataframe from tracks saved in a file
    '''

    df_playlist = pd.read_hdf(playlist, key='df')
    df_playlist.drop(['analysis_url', 'track_href',
                      'uri', 'type'], axis=1, inplace=True)

    df_playlist['added_at'] = pd.to_datetime(df_playlist['added_at'])
    df_playlist['added_year'] = df_playlist['added_at'].apply(lambda x: x.year)
    df_playlist['added_month'] = df_playlist['added_at'].apply(
        lambda x: x.month)

    df_playlist['tempo_01'] = df_playlist['tempo'] / df_playlist['tempo'].max()

    return df_playlist


def get_csv_playlists(keyword):
    '''
    Puts 3 spotify playlists into csv file for ML learning
    '''
    playlists = sp.search(q=keyword, type="playlist", limit=3)
    playlist_tracks = []
    for p in playlists['playlists']['items']:
        playlist_tracks.append(
            get_features_from_playlist_search(p['owner']['id'], p['id'], keyword))

    # get top 3 spotify playlist results
    df_playlist_1 = playlist_tracks[0][['keyword', 'id', 'song_title', 'acousticness', 'danceability', 'energy',
                                        'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence']]
    df_playlist_2 = playlist_tracks[1][['keyword', 'id', 'song_title', 'acousticness', 'danceability', 'energy',
                                        'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence']]
    df_playlist_3 = playlist_tracks[2][['keyword', 'id', 'song_title', 'acousticness', 'danceability', 'energy',
                                        'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence']]

    df_playlists = pd.concat([df_playlist_1, df_playlist_2, df_playlist_3])
    csv_filename = "/Users/alex 1/Desktop/Spotifind/csv/" + keyword + "_playlists.csv"
    df_playlists.to_csv(csv_filename)


def get_variable_adjusted_playlist(acousticness_value, danceability_value, energy_value, instrumentalness_value, liveness_value, loudness_value, speechiness_value, tempo_value, valence_value):
    '''
    Generates playlist given multiple song feature values
    '''
    # user_tracks = get_features_from_favourites()
    user_tracks = load_playlist()
    num_tracks = len(user_tracks.index)
    # user_tracks['id'].tolist()

    acousticness_value = acousticness_value / 100
    danceability_value = danceability_value / 100
    energy_value = energy_value / 100
    instrumentalness_value = instrumentalness_value / 100
    liveness_value = liveness_value / 100
    loudness_value = (1 - (loudness_value / 100))*-20
    speechiness_value = speechiness_value / 100
    valence_value = valence_value / 100

    user_arr = np.array(user_tracks.sample(num_tracks)[['keyword', 'id', 'song_title', 'acousticness', 'danceability', 'energy',
                                                        'instrumentalness', 'liveness', 'loudness', 'speechiness', 'tempo', 'valence']].values)

    ids = []
    for i in range(num_tracks):
        if (((acousticness_value - 0.05) <= user_arr[i][3] <= (acousticness_value + 0.05))
                and ((danceability_value - 0.05) <= user_arr[i][4] <= (danceability_value + 0.05))
                and ((energy_value - 0.05) <= user_arr[i][5] <= (energy_value + 0.05))
                and ((instrumentalness_value - 0.05) <= user_arr[i][6] <= (instrumentalness_value + 0.05))
                and ((liveness_value - 0.05) <= user_arr[i][7] <= (liveness_value + 0.05))
                and ((loudness_value - 1) <= user_arr[i][8] <= (loudness_value + 1))
                and ((speechiness_value - 0.05) <= user_arr[i][9] <= (speechiness_value + 0.05))
                and ((tempo_value - 60) <= user_arr[i][10] <= (tempo_value + 0.05))
                and ((valence_value - 0.05) <= user_arr[i][11] <= (valence_value + 0.05))):
            ids.append(user_arr[i][1])


def get_user_tracks_ML():
    '''
    Generates list of arrays of the user's tracks to feed to the ML model
    '''
    user_tracks = load_playlist()
    num_tracks = len(user_tracks.index)
    ids = user_tracks['id'].tolist()

    user_tracks_arr = np.array(user_tracks.sample(num_tracks)[['acousticness', 'danceability', 'energy',
                                                               'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence']].values)

    return ids, user_tracks_arr


def write_playlist(username, playlist_title, track_ids):
    '''
    Writes a playlist to user's account
    '''
    playlist = sp.user_playlist_create(
        username, playlist_title)

    if(len(track_ids) > 100):
        idx = 0
        while idx+100 < len((track_ids)):
            sp.user_playlist_add_tracks(
                username, playlist['id'], track_ids[idx:idx+100])
            idx += 100
        sp.user_playlist_add_tracks(
            username, playlist['id'], track_ids[idx:len(track_ids)])
    else:
        sp.user_playlist_add_tracks(username, playlist['id'], track_ids)


def get_csv_data(path):
    lst = []
    with open(path, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        first = True
        for row in spamreader:
            if first:
                first = False
            else:
                lst.append(row)
    return lst


def train_ML_model():
    dir_path = r'/Users/alex 1/Desktop/Spotifind/csv/'
    paths = os.listdir(dir_path)
    csv_list = []
    csv_list.clear()
    for p in paths:
        csv_list.extend(get_csv_data(dir_path + p))

    x = []
    y_label = []

    for song in csv_list:
        y_label.append(song[1])
        n = len(song)
        x.append(np.array(song[n-12:n]).astype(np.float))

    y = []
    cur = y_label[0]
    count = 0

    for label in y_label:
        if label != cur:
            count += 1
            print(cur, label)
            cur = label
        y.append(count)

    clf = svm.SVC(decision_function_shape='ovo')
    clf.fit(x, y)

    x[0].shape

    filename = '/Users/alex 1/Desktop/Spotifind/spotifind_clf.h5'
    joblib.dump(clf, filename)


def get_playlist_ML(username, keyword_value):
    '''
    Generates a new playlist of the user's tracks based on the label from the ML model
    '''
    generated_playlist_ids = []
    user_tracks_ids, user_tracks_arr = get_user_tracks_ML()
    model = joblib.load(
        '/Users/alex 1/Desktop/Spotifind/spotifind_clf.h5')
    labels = model.predict(user_tracks_arr)

    for i in range(len(labels)):
        if (labels[i] == keyword_value):
            generated_playlist_ids.append(user_tracks_ids[i])

    write_playlist(username, "Test Playlist", generated_playlist_ids)

# get_csv_playlists('country')
# get_csv_playlists('dance')
# get_csv_playlists('pop')
# get_csv_playlists('workout')
# get_csv_playlists('sad')
# get_csv_playlists('happy')
# get_csv_playlists('hype')
# get_csv_playlists('folk')
# get_csv_playlists('party')
# get_csv_playlists('rap')

# train_ML_model()
# get_playlist_ML(username, 0)
