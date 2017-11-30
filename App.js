import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native'
import axios from 'axios'

export default class App extends React.Component {

  state = {
    firstCard: ''
  }

  fetchRandomFirst = async () => {
    let card = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    const firstCard = card.data.cards[0]
    this.setState({ firstCard })
  }

  render() {
      const firstCard = this.state.firstCard.image
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {
              !firstCard ? <Text style={styles.text}>Fetch your  first card</Text>
              : <Image style={styles.images} source={{uri: firstCard}}/>
            }
          </View>
          <View style={styles.allButtonsContainer}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={()=>console.warn('world')}
                title="Higher"
                color="#2ecc71"
              />
              <Button
                onPress={()=>console.warn('hello')}
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
