import React, {Component} from 'react';
import {View, TouchableOpacity, Text, FlatList, StyleSheet} from 'react-native';
import MovieCard from '../components/MovieCard';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

const isEven = number => number % 2 === 0;

export default class MoviePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            buttonText: "",
        };
    }

    static navigationOptions = {
        title: "PopMovies - Filmes Populares",
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

    async componentDidMount() {
        this.listPopular();
    }

    async listPopular() {
        const movies = await this.fetchListPopular()
        const moviesMap = movies.map((movie, index) => {
            return {title: movie.title,
                    key : `${index}`,
                    id: movie.id,
                    favorite: false,
                    path: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                    overview: movie.overview,
                    release: movie.release_date,
                    vote: movie.vote_average,
                    }
        })
        this.setState({
            movies: moviesMap,
            buttonText: "Listar Favoritos",
        })
    }
    
    async fetchListPopular() {
        try {
            const url = "https://api.themoviedb.org/3/movie/popular?api_key=c08de78bb7f7291eb7ae7b3c368f1b7a&language=pt-BR&page=1"
            const result = await fetch(url);
            const list = await result.json();

            return list.results;
        } catch (error) {
            console.error(error)
        }
    }

    async onPress(param) {
        if (param == "Listar Favoritos") {
            this.listFavorite();
        } else {
            this.listPopular();
        }
    }

    async listFavorite() {
        const movies = await this.fetchListFavorite()

        this.setState({
            movies: movies,
            buttonText: "Listar Populares",
        })
    }

    async fetchListFavorite() {
        try {            
            let list = [];
            const uid = await firebase.auth().currentUser.uid;
            await firebase.database().ref(`favorites/${uid}`)
                    .once('value', snapshot => {
                        snapshot.forEach(childSnapshot => {
                            list.push(childSnapshot.val());
                        });
                    });
            return list;
        } catch (error) {            
            console.log("Erro " + error.toString())
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const {buttonText} = this.props;
        return (
            <View>
                <TouchableOpacity style={styles.buttonOption} onPress={this.onPress.bind(this, this.state.buttonText)}>
                    <Text style={styles.buttonText}> {this.state.buttonText} </Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.movies}
                    renderItem={({ item, index }) => (
                        <MovieCard
                            movie={item}
                            isFirstColumn={isEven(index)}
                            onPress={() => navigate('MovieDetail', { movie: item })}
                        />
                    )}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
	buttonOption: {
		borderRadius: 5,
		backgroundColor: '#757575',
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
		height: 60,
	},
    buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 24,
		alignItems: 'center',
		justifyContent: 'center',
    },
});