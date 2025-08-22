import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold text-white">
            Administrador de productos
          </h1>
        </div>
      </header>
      <main className="mx-auto mt-10 w-11/12 max-w-6xl bg-white p-10 shadow">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
