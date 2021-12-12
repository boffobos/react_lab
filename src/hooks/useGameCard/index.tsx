import { GameCard, Spinner } from "@/components/components";

export const useGameCard = (gameCardData) => {
  if (gameCardData) {
    return gameCardData.map((game) => <GameCard key={game.id} data={game} />);
  }
  return <Spinner />;
};
