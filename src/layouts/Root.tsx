import { Outlet } from "react-router-dom"
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Root = () => {
    return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
