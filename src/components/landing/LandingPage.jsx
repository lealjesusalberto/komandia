import React from 'react';
import { Link } from 'react-router-dom';
import { MonitorPlay, Smartphone, LayoutDashboard, Code, Server, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-teal-500 selection:text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-600/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-800/50 bg-gray-900/70 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
              <img src="/img/logowolves.png" alt="Wolves dev Logo" className="h-20 w-auto drop-shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
              <span className="text-3xl font-extrabold tracking-wider text-white">
                WOLVES <span className="text-teal-400">DEV</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-gray-800/40 p-1.5 rounded-full border border-gray-700/50 backdrop-blur-md">
              <a href="#servicios" className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all">Servicios</a>
              <a href="#komandia" className="px-6 py-2.5 rounded-full text-sm font-bold text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all">Komandia KDS</a>
              <a href="#contacto" className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all">Contacto</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-40 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          {/* Custom Generated Premium Image */}
          <img 
            src="/img/hero-bg.jpg" 
            alt="Wolves Dev Premium Background" 
            className="w-full h-full object-cover opacity-50 mix-blend-screen"
          />
          {/* Elegant gradients to blend the image perfectly into the dark theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-900/60 to-gray-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-transparent to-gray-900/50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Desarrollo de Software <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              A Medida
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto mb-10 drop-shadow-md">
            En Wolves dev transformamos tus ideas en soluciones tecnológicas escalables, rápidas y modernas. Construimos el futuro digital de tu empresa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#komandia" className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-gray-900 font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(20,184,166,0.4)]">
              Ver Demo de Komandia
            </a>
            <a href="#contacto" className="px-8 py-4 bg-gray-800/80 hover:bg-gray-700 text-white font-bold rounded-full transition-all border border-gray-600 hover:border-teal-500/50 backdrop-blur-sm">
              Contáctanos
            </a>
          </div>
        </div>
      </section>

      {/* Services Features */}
      <section id="servicios" className="py-20 bg-gray-800/30 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Por qué elegir Wolves dev</h2>
            <p className="text-gray-400">Soluciones de alto rendimiento diseñadas para destacar.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-colors group">
              <Code className="w-12 h-12 text-teal-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">Tecnología Moderna</h3>
              <p className="text-gray-400">Utilizamos los frameworks más recientes para asegurar que tu aplicación sea rápida y segura.</p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-colors group">
              <Server className="w-12 h-12 text-teal-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">Escalabilidad</h3>
              <p className="text-gray-400">Arquitecturas preparadas para crecer junto con tu negocio sin interrupciones.</p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-colors group">
              <Zap className="w-12 h-12 text-teal-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">Rendimiento Extremo</h3>
              <p className="text-gray-400">Optimizamos cada línea de código para ofrecer experiencias de usuario instantáneas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Komandia Demo Section */}
      <section id="komandia" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 p-8 md:p-12 overflow-hidden relative shadow-2xl shadow-teal-900/20">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-sm font-bold mb-6 border border-teal-500/30">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  Producto Estrella
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">Komandia KDS</h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Conoce nuestro sistema de gestión de comandas (KDS) diseñado para restaurantes modernos. 
                  Una solución integral que conecta a tus clientes, tu cocina y la sala en tiempo real.
                </p>
                
                <div className="space-y-4">
                  <Link to="/dashboard" className="flex items-center p-4 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 hover:border-teal-500/50 rounded-xl transition-all group">
                    <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                      <LayoutDashboard className="w-6 h-6 text-teal-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-bold text-lg">Vista de Administración</h4>
                      <p className="text-sm text-gray-400">Tablero Kanban para la cocina</p>
                    </div>
                  </Link>
                  
                  <Link to="/client" className="flex items-center p-4 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 hover:border-teal-500/50 rounded-xl transition-all group">
                    <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                      <Smartphone className="w-6 h-6 text-teal-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-bold text-lg">Menú del Cliente</h4>
                      <p className="text-sm text-gray-400">Interfaz para tomar pedidos</p>
                    </div>
                  </Link>

                  <Link to="/pantalla" target="_blank" className="flex items-center p-4 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 hover:border-teal-500/50 rounded-xl transition-all group">
                    <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                      <MonitorPlay className="w-6 h-6 text-teal-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-bold text-lg">Pantalla de Sala (TV)</h4>
                      <p className="text-sm text-gray-400">Avisos de pedidos listos</p>
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block relative">
                {/* Abstract UI representation */}
                <div className="aspect-[4/3] rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl p-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                  <div className="flex gap-4 h-full opacity-50 transform rotate-[-5deg] scale-110 origin-center translate-x-4">
                    <div className="flex-1 bg-gray-800 rounded-xl p-2 space-y-2">
                      <div className="w-full h-8 bg-gray-700 rounded-lg"></div>
                      <div className="w-full h-24 bg-gray-700/50 rounded-lg"></div>
                      <div className="w-full h-24 bg-gray-700/50 rounded-lg"></div>
                    </div>
                    <div className="flex-1 bg-gray-800 rounded-xl p-2 space-y-2">
                      <div className="w-full h-8 bg-gray-700 rounded-lg"></div>
                      <div className="w-full h-24 bg-teal-500/20 border border-teal-500/30 rounded-lg"></div>
                      <div className="w-full h-24 bg-gray-700/50 rounded-lg"></div>
                    </div>
                    <div className="flex-1 bg-gray-800 rounded-xl p-2 space-y-2">
                      <div className="w-full h-8 bg-gray-700 rounded-lg"></div>
                      <div className="w-full h-24 bg-gray-700/50 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-12 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-8 max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 opacity-70">
            <img src="/img/logowolves.png" alt="Wolves dev Logo" className="h-10 w-auto grayscale" />
            <span className="font-bold text-xl tracking-wider text-white">WOLVES DEV</span>
          </div>
          
          <div className="flex flex-col items-center md:items-start text-gray-400 text-sm space-y-2 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-8">
            <div className="flex items-center gap-2 font-medium">
               <span className="text-lg">🇻🇪</span> San Bernardino Caracas - Venezuela
            </div>
            <div className="text-gray-500 font-mono">
              RIF: V205283001
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Wolves dev. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
