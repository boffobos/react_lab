import { GameCard, Spinner } from "@/components/components";

export const useGameCard = (gameCardData, selectedPlatform = "") => {
  if (gameCardData) {
    return gameCardData.map((game) => <GameCard key={game.id} data={game} selectedPlatform={selectedPlatform} />);
  }
  return <Spinner />;
};
