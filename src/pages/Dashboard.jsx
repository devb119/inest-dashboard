import TableContent from "../components/TableContent";
import data from './sample_data.json'

const Dashboard = () => {
    return (
        <div>
            <div className="h-20 bg-gray-50 shadow-lg justify-center items-center flex">Header</div>
            <div className="h-20 bg-white shadow-sm justify-center items-center flex mt-2">Search</div>
            <div>
                <TableContent data={data}/>
            </div>
        </div>
    );
}
export default Dashboard;
