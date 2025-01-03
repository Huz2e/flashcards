import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '@/assets/styles';

type ButtonProps = {
    onPress: () => void;
    text: string;
    disabled?: boolean;
    style?: object;
}

const Button = ({ onPress, text, disabled = false, style }: ButtonProps) => {
    return (
        <TouchableOpacity 
            style={[styles.button, disabled && styles.buttonDisabled, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;