import { WordsProvider } from "@/hooks/WordsProvider";
import AppNavigator from "@/components/AppNavigator";

export default function App() {
  return (
    <WordsProvider>
      <AppNavigator/>
    </WordsProvider>
  );
}