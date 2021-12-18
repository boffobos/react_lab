import { GameCard, IGameData, Spinner } from "@/components/components";

export const useGameCard = (gameCardData: IGameData[] | null, selectedPlatform = "") => {
  if (gameCardData) {
    return gameCardData.map((game) => <GameCard key={game.id} data={game} selectedPlatform={selectedPlatform} />);
  }
  return <Spinner />;
};
