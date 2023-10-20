import Title from "../../components/title/Title";
import PriceTable from "./PriceTable";

const Prices = () => {
  return (
    <>
      <div className="prices">
        <Title title="Delivery Cost" />
        <div className="content">
          <PriceTable />
        </div>
      </div>
    </>
  );
};

export default Prices;
