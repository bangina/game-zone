"use client";
import { AppShell, Header, Title, useMantineTheme, Box, Button } from "@mantine/core";
import React from "react";
import { useAppShell } from "./index";

export const Shell: React.FunctionComponent<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const { user, score, setUser } = useAppShell();
  const theme = useMantineTheme();

  return (
    <AppShell
      padding='md'
      styles={{
        main: {
          background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      header={
        <Header p='xs' style={{ background: theme.colors.blue[8] }} height={60}>
          <Title style={{ color: "white" }}>{title}</Title>
          <Box sx={{ flexGrow: 1 }}></Box>

          {user && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Title style={{ color: "white" }} mr='md'>
                {user} - {score}
              </Title>
              <Button variant='light' onClick={() => setUser(null)}>
                Logout
              </Button>
            </Box>
          )}
          {!user && (
            <Button variant='light' onClick={() => setUser("Mantine")}>
              Login
            </Button>
          )}
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
