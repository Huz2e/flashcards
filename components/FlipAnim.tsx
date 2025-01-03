import { Animated, Easing } from "react-native";

/**
 * A function to flip the card with animation
 * @param {Animated.Value} flipAnim animation value
 * @param {boolean} flipped flipped state variable of the card
 * @param {Function} setFlipped useState function of flipped state
 */
const flipCard = (flipAnim: Animated.Value, flipped: boolean, setFlipped: React.Dispatch<React.SetStateAction<boolean>>) => {
  setFlipped(!flipped); 
  Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 1,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

export default flipCard;