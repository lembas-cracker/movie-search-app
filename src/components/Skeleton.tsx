import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = ({ amount }: { amount: number }) => {
  const loadCards = Array(amount).fill(1);
  return (
    <>
      {loadCards.map((_, i) => (
        <div className="card-skeleton" key={i}>
          <div>
            <Skeleton count={5} />
          </div>
          <div>
            <Skeleton circle width={30} height={30} />
          </div>
        </div>
      ))}
    </>
  );
};
export default CardSkeleton;
