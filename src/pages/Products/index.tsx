import { useParams } from "react-router-dom";

export const Products = () => {
  const params = useParams();
  return (
    <div>
      Products page for <strong>{params.platform}</strong>
    </div>
  );
};
