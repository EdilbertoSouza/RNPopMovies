/**
 * PopMovies - App para listar Filmes Populares
 * Desenvolvido por Edilberto Lima de Souza 
 * com React Native https://github.com/facebook/react-native *
 */
import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, Text } from "react-navigation";

import LoginPage from './src/pages/LoginPage.js';
import MoviePage from './src/pages/MoviePage.js';
import MovieDetailPage from './src/pages/MovieDetailPage.js';

export default class App extends React.Component {

  render() {
    return (
      <AppContainer />
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: LoginPage,
  Movie: MoviePage,
  MovieDetail: MovieDetailPage,
}, {
    initialRouteName: "Login",
  });

const AppContainer = createAppContainer(AppNavigator);
