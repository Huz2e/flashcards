import { Text, Animated, TouchableOpacity } from "react-native";
import  flipCard  from "./FlipAnim";
import { styles } from "@/assets/styles";

type FlashcardProps = {
  russian: string;
  english: string;
  flipAnim: Animated.Value;
  flipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  flipCardFunc?: () => void;
};

/**
 * Flashcard element
 * @param {string} russian russian word
 * @param {string} english english word
 * @param {bool} flipped flipped state variable of the card
 * @param {Function} setFlipped useState function of flipped state
 * @param {Function} [flipAnim] flip animation ref
 * @param {Function} flipCard function to flip card
 */
const Flashcard = ({
  russian,
  english,
  flipped,
  setFlipped,
  flipAnim = new Animated.Value(0),
  flipCardFunc
  }: FlashcardProps ) => {
  const defaultFlipCard = () => flipCard(flipAnim, flipped, setFlipped);

  const frontInterpolate = flipAnim?.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const backInterpolate = flipAnim?.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg']
  });

  const frontAnimatedStyle = flipAnim ? {
    transform: [
      { rotateY: frontInterpolate || '0deg' }
    ]
  } : {};

  const backAnimatedStyle = flipAnim ? {
    transform: [
      { rotateY: backInterpolate || '0deg' }
    ]
  } : {};

  return (
    <TouchableOpacity
      onPress={flipCardFunc || defaultFlipCard}
      style={styles.cardContainer}>
      <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
        <Text style={styles.cardFrontText}>{russian}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <Text style={styles.cardBackText}>{english}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Flashcard;