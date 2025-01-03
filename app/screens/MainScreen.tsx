import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import Flashcard from "@/components/Flashcard";
import Button from "@/components/Button";
import flipCard from "@/components/FlipAnim";
import { useWords } from "@/hooks/WordsProvider";
import { styles } from "@/assets/styles";

type MainScreenProps = {
  navigation: any;
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  const { words, selectedDeck, setWords } = useWords();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const filteredWords = words.filter(word => 
    word && word.russian && word.english && 
    (!selectedDeck || word.deck === selectedDeck)
  );

  useEffect(() => {
    if (currentIndex >= filteredWords.length) {
      setCurrentIndex(0);
    }
  }, [filteredWords.length, currentIndex]);

  const handleNext = () => {
    if(flipped){
    flipCard(flipAnim, flipped, setFlipped);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % filteredWords.length);
    }, 400);}
    else {setCurrentIndex((currentIndex + 1 + filteredWords.length) % filteredWords.length);}
  };

  const handlePrevious = () => {
    if (flipped){
    flipCard(flipAnim, flipped, setFlipped);
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + filteredWords.length) % filteredWords.length);
    }, 400);}
    else{setCurrentIndex((currentIndex - 1 + filteredWords.length) % filteredWords.length);}
  };

  const handleShuffle = () => {
      const shuffled = [...words];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setWords(shuffled);
  };


  return (
    <View style={styles.body}>
      <Text style={styles.h1}>Flashcards</Text>
      <Text style={styles.h1}>Deck: {selectedDeck || "All Cards"}</Text>
      {filteredWords.length > 0 && currentIndex < filteredWords.length ? (
        <>
          <Flashcard
            russian={filteredWords[currentIndex].russian}
            english={filteredWords[currentIndex].english}
            flipped={flipped}
            setFlipped={setFlipped}
            flipAnim={flipAnim}
            flipCardFunc={() => flipCard(flipAnim, flipped, setFlipped)}
          />
          <View style={styles.controls}>
            <Button 
              style={styles.button} 
              onPress={handlePrevious}
              text='Previous'
            />
            <Button 
              style={styles.button} 
              onPress={handleShuffle}
              text='Shuffle'
            />
            <Button 
              style={styles.button} 
              onPress={handleNext}
              text='Next'
            />
          </View>
          <Button 
            style={styles.button} 
            onPress={() => navigation.navigate("Add Card")}
            text='Add New Card'
          />
        </>
      ) : (
        <>
          <Text>No cards available</Text>
          <Button 
            style={styles.button} 
            onPress={() => navigation.navigate("Add Card")}
            text='Add New Card'
          />
        </>
      )}
    </View>
  );
};

export default MainScreen;