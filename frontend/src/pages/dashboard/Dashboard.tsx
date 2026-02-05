import { Button } from "../../components";

const Dashboard = () => {
  return (
    <div>
      <Button
        label="Dashboard Button"
        variant="outlined"
        onClick={() => console.log("Button clicked!")}
      />

      {/* <Table /> */}
    </div>
  );
};

export default Dashboard;
