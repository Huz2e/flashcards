import { Platform } from 'react-native';
import { Word } from '@/hooks/WordsProvider';

import type * as SQLiteType from 'expo-sqlite';
const isAndroid = Platform.OS === 'android';
const SQLite = isAndroid ? require('expo-sqlite') : null;
const AsyncStorage = isAndroid ? null : require('@react-native-async-storage/async-storage').default;

const STORAGE_KEY = 'flashcards_words';

const initDB = async (): Promise<SQLiteType.SQLiteDatabase> => {
  if (!isAndroid) {
    throw new Error('SQLite is only supported on Android');
  }

  const db = await SQLite.openDatabaseAsync('flashcards.db');
  
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      russian TEXT NOT NULL,
      english TEXT NOT NULL,
      deck TEXT
    );
  `);
  return db;
};

export const saveWords = async (words: Word[]): Promise<void> => {
  if (isAndroid) {
    const db = await initDB();
    await db.execAsync('DELETE FROM words');
    
    for (const word of words) {
      await db.runAsync(
        'INSERT INTO words (russian, english, deck) VALUES (?, ?, ?)',
        [word.russian, word.english, word.deck || 'Basics']
      );
    }
  } else {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    } catch (error) {
      console.error('Error saving words:', error);
    }
  }
};

export const loadWords = async (): Promise<Word[]> => {
  if (isAndroid) {
    const db = await initDB();
    try {
      const words = await db.getAllAsync<Word>('SELECT russian, english, deck FROM words');
      return words;
    } catch (error) {
      console.error('Error loading words:', error);
      return [];
    }
  } else {
    try {
      const wordsJson = await AsyncStorage.getItem(STORAGE_KEY);
      return wordsJson ? JSON.parse(wordsJson) : [];
    } catch (error) {
      console.error('Error loading words:', error);
      return [];
    }
  }
};