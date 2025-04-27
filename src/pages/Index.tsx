
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Healthcare Admin System</h1>
        <p className="text-xl text-gray-600 mb-8">Manage your healthcare facility efficiently</p>
        <Button asChild>
          <Link to="/admin">Access Admin Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
