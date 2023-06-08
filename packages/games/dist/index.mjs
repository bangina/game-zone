// CardPicker.tsx
import { useState } from "react";
import { Box, Paper, Text, Button, Title } from "@mantine/core";
import { shuffle } from "lodash";
import { useAppShell } from "ui";
import { jsx, jsxs } from "react/jsx-runtime";
var OPTIONS = [10, 5, 2, -1, -2];
var CardPicker = () => {
  const [cards, setCards] = useState(shuffle(OPTIONS));
  const [played, setPlayed] = useState(null);
  const { addToScore, user } = useAppShell();
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Paper, { shadow: "sm", radius: "md", p: "md", m: "10", withBorder: true, style: { border: "2px solid blue" }, children: [
    /* @__PURE__ */ jsx(Title, { children: "Card Picker!!!" }),
    /* @__PURE__ */ jsx(
      Box,
      {
        sx: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridGap: "1rem"
        },
        children: cards.map((card, index) => /* @__PURE__ */ jsx(
          Box,
          {
            p: 5,
            sx: {
              borderRadius: 15,
              height: 200,
              border: "5px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: played !== null ? index === played ? "gray" : "white" : "black"
            },
            onClick: () => {
              addToScore(card);
              setPlayed(index);
            },
            children: played !== null && /* @__PURE__ */ jsx(Text, { sx: { fontSize: "40pt" }, children: card })
          },
          index
        ))
      }
    ),
    played !== null && /* @__PURE__ */ jsx(
      Button,
      {
        mt: "md",
        size: "lg",
        fullWidth: true,
        onClick: () => {
          setCards(shuffle(OPTIONS));
          setPlayed(null);
        },
        children: "Play Again"
      }
    )
  ] });
};

// TopNumber.tsx
import { useEffect, useState as useState2 } from "react";
import { Paper as Paper2, Button as Button2, Title as Title2 } from "@mantine/core";
import { useAppShell as useAppShell2 } from "ui";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var pickNumber = () => Math.ceil(Math.random() * 10) + 2;
var TopNumber = () => {
  const [topNumber, setTopNumber] = useState2(0);
  const [playing, setPlaying] = useState2(false);
  const [currentValue, setCurrentValue] = useState2(0);
  const { addToScore, user } = useAppShell2();
  useEffect(() => {
    if (playing) {
      const timer = setTimeout(() => {
        if (currentValue < topNumber) {
          setCurrentValue(currentValue + 1);
        } else {
          addToScore(-1);
          setCurrentValue(0);
          setPlaying(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [playing, topNumber, currentValue, addToScore]);
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ jsxs2(Paper2, { shadow: "sm", radius: "md", p: "md", m: "10", withBorder: true, style: { border: "2px solid red" }, children: [
    /* @__PURE__ */ jsx2(Title2, { children: "Top Number" }),
    playing && /* @__PURE__ */ jsxs2(
      Button2,
      {
        mt: "md",
        variant: "outline",
        color: "red",
        size: "xl",
        fullWidth: true,
        onClick: () => {
          addToScore(currentValue);
          setCurrentValue(0);
          setPlaying(false);
        },
        children: [
          currentValue,
          " - Snag It!"
        ]
      }
    ),
    !playing && /* @__PURE__ */ jsx2(
      Button2,
      {
        mt: "md",
        size: "xl",
        fullWidth: true,
        color: "red",
        onClick: () => {
          setPlaying(true);
          setTopNumber(pickNumber());
        },
        children: "Play"
      }
    )
  ] });
};
export {
  CardPicker,
  TopNumber
};
