import Title from "../../components/title/Title";
import BranchTable from "./BranchTable";

const Branches = () => {
  return (
    <div>
      <div className="branches">
        <Title title="Branches" />
        <div className="content">
          <BranchTable />
        </div>
      </div>
    </div>
  );
};

export default Branches;
