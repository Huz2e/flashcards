import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useWords } from "@/hooks/WordsProvider";
import { styles } from "@/assets/styles"
import Button from "@/components/Button";

type AddCardScreenProps = {
  navigation: any;
};

const AddCardScreen = ({ navigation }: AddCardScreenProps) => {
  const { words, setWords, decks, selectedDeck } = useWords();
  const [russian, setRussian] = useState("");
  const [english, setEnglish] = useState("");
  const [deckChoice, setDeckChoice] = useState(selectedDeck || "Basics");

  const handleAdd = () => {
    if (russian && english) {
      setWords([...words, { 
        russian, 
        english, 
        deck: deckChoice
      }]);
      navigation.navigate("Tabs", { screen: "Main" });
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.h1}>Add New Card</Text>
      <View style={styles.controls}>
        {decks.map((deck) => (
          <Button 
            key={deck}
            style={[
              styles.button,
              deckChoice === deck && styles.buttonSelected
            ]}
            onPress={() => setDeckChoice(deck)}
            text={deck}
          />
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Russian word"
        value={russian}
        onChangeText={setRussian}
      />
      <TextInput
        style={styles.input}
        placeholder="English word"
        value={english}
        onChangeText={setEnglish}
      />
      <Button 
        style={[styles.button, !(russian && english) && styles.buttonDisabled]} 
        onPress={handleAdd}
        disabled={!(russian && english)}
        text='Add'
      />
    </View>
  );
};

export default AddCardScreen;
