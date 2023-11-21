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
    <div className="flex">
      <div className="flex w-1/2 ml-10 mt-4">
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
      <div className="mt-4 w-1/2">
        <h1>Filter devices</h1>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "50%" }}
          placeholder="Select devices"
          onChange={handleChange}
          options={options}
        />
      </div>
    </div>
  );
};
export default DateChoose;
