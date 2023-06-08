import { Box, Button, Paper, Text, Title } from "@mantine/core";
import { shuffle } from "lodash";
import { useState } from "react";
import { useAppShell } from "ui";
const OPTIONS = [10, 5, 2, -1, -2];
function CardPicker() {
  const [cards, setCards] = useState<number[]>(shuffle(OPTIONS));
  const [played, setPlayed] = useState<number | null>(null);
  const { addToScore, user } = useAppShell();
  const handleClickCard = (card: number, index: number) => {
    addToScore(card);
    setPlayed(index);
  };

  const handleClickReplay = () => {
    setCards(shuffle(OPTIONS));
    setPlayed(null);
  };

  if (!user) {
    return <div>Log in to play</div>;
  }

  return (
    <Paper shadow='sm' radius='md' p='md' m='10' withBorder>
      <Title>Card Picker</Title>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridGap: "1rem",
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={`${index}_card`}
            p={5}
            sx={{
              border: "1px solid black",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: played !== null ? (index === played ? "#ccc" : "white") : "black",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => handleClickCard(card, index)}
          >
            {played !== null && <Text sx={{ fontSize: 20 }}>{card}</Text>}
          </Box>
        ))}
      </Box>
      {played !== null && (
        <Button mt='md' size='lg' fullWidth onClick={() => handleClickReplay()}>
          Play Again
        </Button>
      )}
    </Paper>
  );
}
export default CardPicker;
