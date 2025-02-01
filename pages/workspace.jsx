import Chatview from '@/components/custom/Chatview';
import Codeview from '@/components/custom/Codeview';
import Navbar from '@/components/custom/Navbar';
import { Toaster } from '@/components/ui/toaster';

const Workspace = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Navbar />
      <div className="gap-5 grid grid-cols-1 md:grid-cols-3 px-10 w-full h-full">
        <div className="relative w-full h-[80%] overflow-hidden">
          <Chatview />
        </div>
        <div className="col-span-2">
          <Codeview />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
