import TableContent from "../components/TableContent";
import Header from "../components/Header";
import DateChoose from "../components/DateChoose";
import data from "./sample_data.json";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <DateChoose />
      <div>
        <TableContent data={data} />
      </div>
    </div>
  );
};
export default Dashboard;
