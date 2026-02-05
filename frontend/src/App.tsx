import { Outlet } from "react-router";
import { Header, Sidebar } from "./components";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-auto">
            <div className="p-4 md:p-8">
              <div className="space-y-6">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
