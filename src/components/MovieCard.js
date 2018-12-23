import React from 'react';
import {View, Text, StyleSheet,	Dimensions,	Image, TouchableOpacity,} from 'react-native';

const MovieCard = ({ movie, isFirstColumn, onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		style={[
			styles.container,
			isFirstColumn ? styles.firstColumn : styles.lastColumn
		]}>
		<View style={styles.card}>
			{
				movie.path
					? <Image
						source={{
							uri: movie.path
						}}
						aspectRatio={1}
						resizeMode="cover"
					/>
					: null
			}
			<View style={styles.cardTitleWrapper}>
				<Text style={styles.cardTitle}>{movie.title}</Text>
			</View>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		width: '50%',
		padding: 5,
		height: Dimensions.get('window').width / 2,

		// borderWidth: 1,
		// borderColor: 'blue',
	},
	card: {
		flex: 1,
		borderWidth: 1,
	},
	cardTitleWrapper: {
		backgroundColor: '#757575',
		height: 40,

		position: 'absolute',
		bottom: 0,
		opacity: .8,

		width: '100%',

		paddingTop: 2,
		paddingBottom: 10,

		paddingLeft: 3,
		paddingRight: 3,

		alignItems: 'center'
	},
	cardTitle: {
		color: 'white',
		fontSize: 15,
		fontWeight: 'bold'
	},
	firstColumn: {
		paddingLeft: 10
	},
	lastColumn: {
		paddingRight: 10
	}
});

export default MovieCard;