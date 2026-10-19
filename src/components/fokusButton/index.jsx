import { Pressable, StyleSheet, Text } from "react-native";

export const FokusButton = ({ onPress, title, icons }) => {
    return(
        <Pressable style={styles.button} onPress={onPress}>
          {icons}
          <Text style={styles.buttonText}>
            {title}
          </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B872FF',
    borderRadius: 32,
    padding: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#021123',
    fontSize: 18
  },
});