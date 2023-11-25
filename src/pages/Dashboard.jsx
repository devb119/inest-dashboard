import TableContent from "../components/TableContent";
import Header from "../components/Header";
import DateChoose from "../components/DateChoose";
import { useState } from "react";
import dayjs from "dayjs";

const Dashboard = () => {
  const [startTime, setStartTime] = useState(dayjs().subtract(1, 'month').format("YYYY-MM-DD"));
  const [endTime, setEndTime] = useState(dayjs().format("YYYY-MM-DD"));
  const [deviceID, setDeviceID] = useState("C10_301");

  return (
    <div>
      <Header />
      <DateChoose setStartTime={setStartTime} setEndTime={setEndTime} setDeviceID={setDeviceID} />
      <div>
        <TableContent startTime={startTime} endTime={endTime} deviceID={deviceID} />
      </div>
    </div>
  );
};
export default Dashboard;
