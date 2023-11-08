import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '8%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: '8%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: '2%',
    paddingVertical: '3%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
