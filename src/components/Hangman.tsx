// Hangman.tsx
import { useState, useEffect } from 'react';
import hangmanPart1 from '../img/hangmanPart1.png';
import hangmanPart2 from '../img/hangmanPart2.png';
import hangmanPart3 from '../img/hangmanPart3.png';
import hangmanPart4 from '../img/hangmanPart4.png';

interface HangmanProps {
  words: string[];
  hints: { [word: string]: string };
}

const Hangman = ({ words, hints }: HangmanProps) => {
  const [selectedWord, setSelectedWord] = useState<string>(words[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState<number>(0);

  useEffect(() => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setErrorCount(0);
  }, [words]);

  const displayWord = selectedWord.split('').map((letter, index) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return '_';
    }
  });

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setErrorCount((prev) => prev + 1);
      }
    }
  };

  const restartGame = () => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setErrorCount(0);
  };

  const hangmanImages = [hangmanPart1, hangmanPart2, hangmanPart3, hangmanPart4];

  return (
    <div>
      <p>{displayWord.join(' ')}</p>
      <p>Hint: {hints[selectedWord]}</p>
      <input maxLength={1} onChange={(e) => handleGuess(e.target.value)} />
      <img src={hangmanImages[errorCount]} alt={`Hangman Part ${errorCount + 1}`} />
      {(displayWord.join('') === selectedWord || errorCount >= 4) && (
        <button onClick={restartGame}>Select New Word</button>
      )}
      <p>Error count: {errorCount}</p>
      {displayWord.join('') === selectedWord && (
        <p>You won in this round</p>
      )}
    </div>
  );
};

export default Hangman;
