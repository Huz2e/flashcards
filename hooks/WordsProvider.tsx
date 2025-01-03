import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { saveWords, loadWords } from "@/utils/Storage";


export type Word = {
  russian: string;
  english: string;
  deck?: string;
};

type WordsContextType = {
  words: Word[];
  setWords: React.Dispatch<React.SetStateAction<Word[]>>;
  decks: string[];
  selectedDeck: string | null;
  setSelectedDeck: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
};

const WordsContext = createContext<WordsContextType | undefined>(undefined);

export const WordsProvider = ({ children }: { children: ReactNode }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeWords = async () => {
      const savedWords = await loadWords();
      setWords(savedWords.length > 0 ? savedWords : defaultWords);
      setIsLoading(false);
    };
    initializeWords();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveWords(words);
    }
  }, [words, isLoading]);

  const decks = [...new Set(words.map(word => word.deck || "Default"))];

  return (
    <WordsContext.Provider value={{ 
      words,
      setWords, 
      decks,
      selectedDeck,
      setSelectedDeck,
      isLoading
    }}>
      {children}
    </WordsContext.Provider>
  );
};

export const useWords = () => {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error("useWords must be used within a WordsProvider");
  }
  return context;
};

const defaultWords: Word[] = [
    { russian: "Привет", english: "Hello", deck: "Basics" },
    { russian: "Книга", english: "Book", deck: "Basics" },
    { russian: "Друг", english: "Friend", deck: "Basics" },
    { russian: "Дом", english: "House", deck: "Basics" },
    { russian: "Доброта", english: "Kindness", deck: "Advanced" },
    { russian: "Отношения", english: "Relationships", deck: "Advanced" },
    { russian: "Уважение", english: "Respect", deck: "Advanced" },
];