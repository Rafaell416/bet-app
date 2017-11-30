import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert
} from 'react-native'
import axios from 'axios'

export default class App extends React.Component {

  state = {
    Card: '',
    actualCardNumber: 0,
  }

  fetchCard = async () => await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')

  fetchRandomFirst =  () => {
    this.fetchCard()
      .then(res => {
        let Card = res.data.cards[0]
        const actualCardNumber = Card.value
        this.setState({ Card,  actualCardNumber})
      })
  }

  betNextWillBeHigher = () => {
    const { actualCardNumber  } = this.state
    let previousNumber = actualCardNumber
    this.fetchCard()
      .then(res => {
        let Card = res.data.cards[0]
        let actualCardNumber = Card.value
        this.setState({Card, actualCardNumber})

        if (previousNumber < actualCardNumber) {
          Alert.alert('Yeahh!! You Won :) ')
        }else{
          Alert.alert('Sorry, You Loose :(')
        }
      })
  }

  betNextWillBeLower = () => {
    const { actualCardNumber  } = this.state
    let previousNumber = actualCardNumber
    this.fetchCard()
      .then(res => {
        let Card = res.data.cards[0]
        let actualCardNumber = Card.value
        this.setState({Card, actualCardNumber})

        if (previousNumber > actualCardNumber) {
          Alert.alert('Yeahh!! You Won :) ')
        }else{
          Alert.alert('Sorry, You Loose :(')
        }
      })
  }

  render() {
      const Card = this.state.Card.image
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {
              !Card ? <Text style={styles.text}>Fetch your  first card</Text>
              : <Image style={styles.images} source={{uri: Card}}/>
            }
          </View>
          <View style={styles.allButtonsContainer}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={this.betNextWillBeHigher}
                title="Higher"
                color="#2ecc71"
              />
              <Button
                onPress={this.betNextWillBeLower}
                title="Lower"
                color="#3498db"
              />
            </View>
            <Button
              onPress={this.fetchRandomFirst}
              title="Fetch radom first"
              color="red"
            />
          </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
    padding: 10
  },
  allButtonsContainer: {
    padding: 10,
    marginBottom: 20
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    height: 400,
    width: 290
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
