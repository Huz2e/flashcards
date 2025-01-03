import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Animated } from "react-native";
import { useWords } from "@/hooks/WordsProvider";
import { styles } from "@/assets/styles";
import { Timer, formatTime } from "@/utils/Timer";
import flipCard from "@/components/FlipAnim";
import Flashcard from "@/components/Flashcard";
import Button from "@/components/Button";

type PracticeScreenProps = {
  navigation: any;
};

const PracticeScreen = ({ navigation }: PracticeScreenProps) => {
  const { words, selectedDeck } = useWords();
  const [shuffledWords, setShuffledWords] = useState(words);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [points, setPoints] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [useTimer, setUseTimer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const timer = useRef(new Timer((seconds) => setElapsedTime(seconds))).current;

  const filteredWords = shuffledWords.filter(word => 
    !selectedDeck || word.deck === selectedDeck
  );

  const totalTime = filteredWords.length * 15;

  useEffect(() => {
    if (elapsedTime >= totalTime && useTimer) {
      timer.stop();
      setCurrentIndex(filteredWords.length);
    }
  }, [elapsedTime, totalTime, useTimer]);

  const startPractice = (withTimer: boolean) => {
    setUseTimer(withTimer);
    setIsPracticeStarted(true);
    if (withTimer) {
      timer.reset();
      timer.start();
    }
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setPoints(0);
    setInput("");
    setFlipped(false);
    flipAnim.setValue(0);
  };

  const handleCheck = () => {
    if (input.trim() === "") return;
    
    if (input.toLowerCase() === filteredWords[currentIndex].english.toLowerCase()) {
      setPoints(points + 1);
      handleNext();
    } else {
      flipCard(flipAnim, flipped, setFlipped);
    }
  };

  const handleSkip = () => {
    if (isFlipping || flipped) return;
    setIsFlipping(true);
    flipCard(flipAnim, flipped, setFlipped);
    setTimeout(() => {
      setIsFlipping(false);
    }, 1000);
  };

  const handleNext = () => {
    setInput("");
    setFlipped(false);
    flipAnim.setValue(0);
    if (currentIndex + 1 < filteredWords.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(filteredWords.length);
      timer.stop();
    }
  };

  useEffect(() => {
    return () => {
      timer.stop();
    };
  }, []);

  return (
    <View style={styles.body}>
      <Text style={styles.h1}>Practice</Text>
      
      {!isPracticeStarted ? (
        <View style={styles.center}>
          <Text style={styles.h1}>Choose Practice Mode</Text>
          <View style={styles.controls}>
            <Button
              style={styles.button}
              onPress={() => startPractice(false)}
              text="Practice Without Timer"
            />
            <Button
              style={styles.button}
              onPress={() => startPractice(true)}
              text={`Practice With Timer (${totalTime}s)`}
            />
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.h1}>Points: {points}</Text>
          {useTimer && (
            <Text style={styles.h1}>
              Time Left: {formatTime(Math.max(0, totalTime - elapsedTime))}
            </Text>
          )}
          
          {currentIndex < filteredWords.length ? (
            <View>
              <Flashcard
                russian={filteredWords[currentIndex].russian}
                english={filteredWords[currentIndex].english}
                flipped={flipped}
                setFlipped={setFlipped}
                flipAnim={flipAnim}
                flipCardFunc={() => {}}
              />
              <View style={styles.controls}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter translation"
                  value={input}
                  onChangeText={setInput}
                />
                {!flipped ? (
                  <>
                    <Button
                      style={styles.button}
                      onPress={handleCheck}
                      text="Check"
                      disabled={isFlipping}
                    />
                    <Button
                      style={styles.button}
                      onPress={handleSkip}
                      text="Skip"
                      disabled={isFlipping}
                    />
                  </>
                ) : (
                  <Button
                    style={styles.button}
                    onPress={handleNext}
                    text="Next"
                    disabled={isFlipping}
                  />
                )}
              </View>
            </View>
          ) : (
            <View style={styles.center}>
              <Text>Practice completed!</Text>
              <Text>Your score: {points}/{filteredWords.length}</Text>
              <Button
                style={styles.button}
                onPress={() => navigation.navigate("Tabs", { screen: "Main" })}
                text="Return to Main Screen"
              />
              <Button
                style={styles.button}
                onPress={() => {
                  setIsPracticeStarted(false);
                  timer.stop();
                }}
                text="Practice Again"
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default PracticeScreen;