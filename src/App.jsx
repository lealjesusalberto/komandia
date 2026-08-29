import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Menu as MenuIcon, MonitorPlay } from 'lucide-react';
import KanbanBoard from './components/kanban/KanbanBoard';
import { OrderProvider } from './context/OrderContext';
import MenuAdmin from './components/menu/MenuAdmin';
import PublicMenu from './components/menu/PublicMenu';
import CustomerDisplay from './components/tv/CustomerDisplay';
import LandingPage from './components/landing/LandingPage';

const AdminLayout = () => (
  <div className="flex h-screen w-full bg-background text-text overflow-hidden">
    {/* Sidebar */}
    <div className="w-20 md:w-64 glass flex flex-col border-r border-white/10 z-10 relative">
      <div className="p-4 md:p-6 mb-8 flex justify-center md:justify-start items-center">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center justify-center font-bold text-xl">
          K
        </div>
        <span className="ml-3 font-bold text-xl hidden md:block">Komandia</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <Link to="/dashboard" className="flex items-center p-3 rounded-xl hover:bg-white/5 text-primary bg-primary/10 transition-colors">
          <LayoutDashboard size={24} />
          <span className="ml-3 font-medium hidden md:block">Tablero</span>
        </Link>
        <Link to="/menu" className="flex items-center p-3 rounded-xl hover:bg-white/5 text-text-muted transition-colors">
          <MenuIcon size={24} />
          <span className="ml-3 font-medium hidden md:block">Catálogo</span>
        </Link>
        <Link to="/pantalla" target="_blank" className="flex items-center p-3 rounded-xl hover:bg-white/5 text-text-muted transition-colors mt-4 border border-white/5">
          <MonitorPlay size={24} className="text-purple-400" />
          <span className="ml-3 font-medium hidden md:block">Abrir Pantalla TV</span>
        </Link>
      </nav>
    </div>

    {/* Main Content */}
    <main className="flex-1 h-full overflow-hidden relative">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      
      <Outlet />
    </main>
  </div>
);

const App = () => {
  return (
    <OrderProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin routes with Sidebar */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<KanbanBoard />} />
            <Route path="/menu" element={<MenuAdmin />} />
          </Route>
          
          {/* Full-screen routes without sidebar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/client" element={<PublicMenu />} />
          <Route path="/pantalla" element={<CustomerDisplay />} />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
};

export default App;
