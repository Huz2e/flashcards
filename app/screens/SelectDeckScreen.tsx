import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Button from "@/components/Button";
import { useWords } from "@/hooks/WordsProvider";
import { styles } from "@/assets/styles";

type DeckSelectorProps = {
    navigation: any;
};

const DeckSelector = ({ navigation }: DeckSelectorProps) => {
    const { decks, selectedDeck, setSelectedDeck } = useWords();
    const [newDeckName, setNewDeckName] = useState("");

    const handleSelectDeck = (deck: string) => {
        setSelectedDeck(deck);
        navigation.navigate("Tabs", { screen: "Main" });
    };

    const handleCreateDeck = () => {
        if (newDeckName.trim() && !decks.includes(newDeckName.trim())) {
            setSelectedDeck(newDeckName.trim());
            setNewDeckName("");
            navigation.navigate("Add Card");
        }
    };

    return (
        <View style={styles.body}>
            <Text style={styles.h1}>Select Deck</Text>
            <View style={[styles.controls]}>
                <TextInput
                    style={styles.input}
                    placeholder="New deck name"
                    value={newDeckName}
                    onChangeText={setNewDeckName}
                />
                <Button
                    style={[styles.button, !newDeckName.trim() && styles.buttonDisabled]}
                    onPress={handleCreateDeck}
                    text = "Create Deck"
                    disabled={!newDeckName.trim()}
                />
            </View>
            <View style={styles.controls}>
                {decks.map((deck) => (
                    <Button
                        key={deck}
                        style={[
                            styles.button,
                            selectedDeck === deck && styles.buttonSelected
                        ]}
                        onPress={() => handleSelectDeck(deck)}
                        text = {deck}
                    />
                ))}
                <Button
                    style={styles.button}
                    onPress={() => handleSelectDeck("")}
                    text = "All Cards"
                />
            </View>
        </View>
    );
};

export default DeckSelector;