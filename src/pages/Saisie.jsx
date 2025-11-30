import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

// --- Icon Components ---
const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>
);

const SpeechBubbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
);

// --- Selection Card Component ---
const SelectionCard = ({ title, description, icon, to, selected, onClick }) => {
  const cardClasses = `
    relative flex flex-col items-center p-8 border-2 rounded-xl-14
    cursor-pointer transition-all duration-300 ease-in-out
    transform hover:-translate-y-1 hover:shadow-2xl
    ${selected 
      ? 'bg-primary-light border-success shadow-xl' 
      : 'bg-white border-neutral-dark/30 hover:border-primary/50'
    }
  `;

  return (
    <div onClick={() => onClick(to)} className={cardClasses}>
      {selected && (
        <div className="absolute top-0 right-0 bg-success text-white text-xs font-bold py-1 px-3 rounded-bl-xl-14 rounded-tr-xl-14">
          Sélectionné
        </div>
      )}
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-text-primary text-center mb-2">{title}</h3>
      <p className="text-text-secondary text-center text-base">{description}</p>
    </div>
  );
};


const Saisie = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPath = location.pathname;
  const isSaisieRoot = selectedPath === '/saisie' || selectedPath === '/saisie/';

  const handleSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* --- Page Header --- */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-3">Saisie de Données</h1>
            <p className="text-lg text-text-secondary">
              Sélectionnez le type de formulaire que vous souhaitez remplir pour commencer.
            </p>
          </div>

          {/* --- Selection Cards --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SelectionCard
              title="Questionnaire Comparatif"
              description="Remplir un questionnaire pour comparer des produits."
              icon={<BarChartIcon />}
              to="/saisie/comparatif"
              selected={selectedPath.startsWith('/saisie/comparatif')}
              onClick={handleSelect}
            />
            <SelectionCard
              title="Enquête Focus Group"
              description="Participer à une enquête de groupe pour donner votre avis."
              icon={<SpeechBubbleIcon />}
              to="/saisie/focus-group"
              selected={selectedPath.startsWith('/saisie/focus-group')}
              onClick={handleSelect}
            />
          </div>

          {/* --- Form Outlet --- */}
          <div className="mt-12">
            {isSaisieRoot && (
              <div className="text-center py-12 px-6 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-medium text-text-primary">Bienvenue !</h3>
                <p className="mt-1 text-base text-text-secondary">Veuillez sélectionner un type de formulaire ci-dessus pour commencer la saisie.</p>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Saisie;