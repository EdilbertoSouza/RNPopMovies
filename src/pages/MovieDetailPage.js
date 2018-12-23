import React from 'react';
import {StyleSheet,	ScrollView,	View, Text, Image, Button, Alert} from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

import Line from '../components/Line';
import LongText from '../components/LongText';

export default class MovieDetailPage extends React.Component {
	constructor(props) {
		super(props);
        this.initialState = {
            favorite: false
        };
        this.state = this.initialState;
	}

    static navigationOptions = {
        title: "PopMovies - Filme Detalhe",
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#6ca2f7',
            borderBottomWidth: 1,
            borderBottomColor: '#C5C5C5',
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 20,
        }
    };

    async updateIsFavoriteMovie(movie) {
        try {
            const uid = await firebase.auth().currentUser.uid;
            if (movie.favorite) {
                movie.favorite = false;
                result = await firebase.database().ref(`favorites/${uid}/${movie.id}`).remove();
            } else {
                movie.favorite = true;
                result = await firebase.database().ref(`favorites/${uid}/${movie.id}`).
                                    set({                                         
                                         favorite: movie.favorite,
                                         id: movie.id,
                                         key: movie.key,
                                         overview: movie.overview,
                                         path: movie.path,
                                         release: movie.release,
                                         title: movie.title,
                                         vote: movie.vote                                         
                                        });
            }
            this.setState(
                {favorite: movie.favorite}
            );
        } catch (error) {
            console.log(error.toString())
        }
    };

	render() {
		const { navigation } = this.props;
        const { movie } = navigation.state.params;
        
		return (
			<ScrollView>
				{
					movie.path
						?  <Image
							style={styles.image}
							source={{uri: movie.path}} />
						: null
				}
				<Line label="Título"        content={movie.title} />
				<Line label="Nota"          content={movie.vote} />
                <Line label="Favorito"      content={movie.favorite ? 'Sim' : 'Não'} />
				<LongText label="Descrição" content={movie.overview} />

				<View style={styles.button}>
					<Button
                        title="Favoritar"
                        onPress={() => this.updateIsFavoriteMovie(movie)} />
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	image: {
        aspectRatio: 0.7
	},
	button: {
		margin: 10
	}
});
