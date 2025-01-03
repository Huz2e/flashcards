import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  body: {
    fontFamily: 'Arial',
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    paddingTop: 20,
    overflow: 'hidden',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  card: {
    cursor: 'pointer',
  },
  cardFront: {
    position: 'relative',
    width: 250,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    width: 250,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#4caf50',
    color: '#fff',
    backfaceVisibility: 'hidden',
  },
  cardFrontText: {
    color: '#333',
  },
  cardBackText: {
    color: '#fff',
  },
  controls: {
    width: '100%',
    maxWidth: 400,
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#4caf50',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonSelected:{
    backgroundColor: "#2e7530",
    elevation: 5,
  },
  input: {
    width: '90%',
    maxWidth: 250,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
});

export default styles;