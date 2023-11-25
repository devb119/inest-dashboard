import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getListDevices } from "../api";

const DateChoose = (props) => {
  const { setStartTime, setEndTime, setDeviceID } = props;
  const startDate = dayjs().subtract(1, 'month');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      const res = await getListDevices();
      setOptions(res.map((item) => ({ label: item, value: item })));
      setLoading(false);
    }
    fetchDatas();
  })
  const onChangeStart = (value) => {
    const formattedStartTime = value ? dayjs(value).format("YYYY-MM-DD") : "";
    setStartTime(formattedStartTime);
  };
  const onChangeEnd = (value) => {
    const formattedEndTime = value ? dayjs(value).format("YYYY-MM-DD") : "";
    setEndTime(formattedEndTime);
  };
  
  // const options = [
  //   { label: "C10_301", value: "C10_301" },
  // ];
  const handleChange = (value) => {
    setDeviceID(value);
  };

  return (
    <div className="flex justify-between mx-10">
      <div className="flex w-1/2 mt-4">
        <div>
          <h1>Start Date</h1>
          <DatePicker
            defaultValue={startDate}
            showTime={{ format: "HH:mm" }}
            onChange={onChangeStart}
            onOk={onChangeStart}
          />
        </div>
        <div className="ml-4">
          <h1>End Date</h1>
          <DatePicker
            defaultValue={dayjs()}
            showTime={{ format: "HH:mm" }}
            onChange={onChangeEnd}
            onOk={onChangeEnd}
          />
        </div>
      </div>
      <div className="mt-4 w-1/2 justify-self-end">
        <h1>Filter devices</h1>
        {loading && 
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select devices"
            onChange={handleChange}
            options={options}
          />
        }
      </div>
    </div>
  );
};

export default DateChoose;
