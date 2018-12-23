import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import FormRow from '../components/FormRow'

export default class LoginPage extends Component {

    constructor(props) {
		super(props);

		this.state = {
			mail: '',
			pass: '',
			isLoading: false,
			message: ''
		}
    };

    static navigationOptions = {
        title: "PopMovies - Login",
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
    
    componentDidMount() {
        const config = {
            apiKey: "AIzaSyCUd7l3EpPHfTmmoqXx2Zje82zMnQ93KMg",
            authDomain: "popmovies-uni7-edilberto.firebaseapp.com",
            databaseURL: "https://popmovies-uni7-edilberto.firebaseio.com/",
            projectId: "popmovies-uni7-edilberto",
            storageBucket: "popmovies-uni7-edilberto.appspot.com",
            messagingSenderId: "1035722246652"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    componentWillUnmount() {
        signOut();
    }

    async signin() {
        this.setState({ isLoading: true, message: '' });
        const { mail, pass } = this.state;        

        try {
            const credentials = await firebase.auth().signInWithEmailAndPassword(mail, pass)
            //console.log(credentials.user.email)
            this.setState({isLoading: false, message: ''});
            if (credentials != null) {
                this.props.navigation.navigate('Movie');
            }
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                Alert.alert(
                    'Usuário não encontrado',
                    'Deseja criar um cadastro com as informações inseridas?',
                    [{
                        text: 'Não',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel' // IOS
                    }, {
                        text: 'Sim',
                        onPress: () => {
                            firebase.auth().createUserWithEmailAndPassword(mail, pass)
                        }
                    }],
                    { cancelable: false }
                );
            } else {
				this.setState({isLoading: false, message: this.getMessageByErrorCode(error.code)});
                Alert.alert('Conexão não estabelecida', 'Não foi possível se conectar a base de dados com o e-mail ' 
                + mail + '. \n\n' + this.getMessageByErrorCode(error.code));
            }
        }
    }

    getMessageByErrorCode(errorCode) {
		switch (errorCode) {
			case 'auth/wrong-password':
				return 'Senha incorreta!';
			case 'auth/user-not-found':
				return 'Usuário não encontrado!';
			default:
				return 'Erro desconhecido!';
		}
    }
    
    async signOut() {
        try {
            const firebaseAuth = await firebase.auth().getInstance();
            firebaseAuth.signOut();                
        } catch (error) {
            console.log(error.toString())
        }
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>Seja bem vindo!</Text>
                </View>
                <FormRow>
                    <TextInput style={styles.input} 
                        placeholder="user@mail.com" 
                        onChangeText={(mail) => this.setState({mail})}/>
                </FormRow>
                <FormRow>
                <TextInput style={styles.input} 
                        placeholder="******" 
                        secureTextEntry
                        onChangeText={(pass) => this.setState({pass})}/>
                </FormRow>
                <TouchableOpacity style={styles.buttonOption} onPress={this.signin.bind(this)}>
                    <Text style={styles.buttonText}> Entrar </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 10,
		paddingRight: 10,
        alignItems: 'center',
	},
	input: {
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 5,
    },
	buttonOption: {
		borderRadius: 5,
		backgroundColor: '#757575',
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80,
	},
    buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 30,
		alignItems: 'center',
		justifyContent: 'center',
    },
	text: {
		fontSize: 18,
        margin: 10,
	},
});