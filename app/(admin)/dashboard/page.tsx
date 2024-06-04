
import { Sidebar } from "../../../components/Dashboard/Sidebar";
import { Products } from "./Products";
import AddProduct from "./AddProduct";

const page =  () => {
  return (
    <div className=" bg-W100">
      <Sidebar />
      <div className="ml-[250px]  p-8 h-screen">
        <AddProduct/>
        {/* <Products /> */}
      </div>
    </div>
  );
};

export default page;
