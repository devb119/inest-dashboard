import { DatePicker, Select } from "antd";
import dayjs from "dayjs";

const DateChoose = () => {
  const onChange = (value) => {
    console.log("Selected Time: ", value);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const options = [
    { label: "GRIMM", value: "GRIMM" },
    { label: "HUST", value: "HUST" },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="flex justify-between mx-10">
      <div className="flex w-1/2 mt-4">
        <div>
          <h1>Start Date</h1>
          <DatePicker
            defaultValue={dayjs("2023-11-20", "YYYY-MM-DD")}
            showTime={{ format: "HH:mm" }}
            onChange={onChange}
            onOk={onOk}
          />
        </div>
        <div className="ml-4">
          <h1>End Date</h1>
          <DatePicker
            defaultValue={dayjs("2023-11-20", "YYYY-MM-DD")}
            showTime={{ format: "HH:mm" }}
            onChange={onChange}
            onOk={onOk}
          />
        </div>
      </div>
      <div className="mt-4 w-1/2 justify-self-end">
        <h1>Filter devices</h1>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Select devices"
          onChange={handleChange}
          options={options}
        />
      </div>
    </div>
  );
};
export default DateChoose;
