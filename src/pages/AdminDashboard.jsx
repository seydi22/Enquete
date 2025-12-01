import React, { useEffect, useState } from 'react';
import { getComparatifs, getParticipatives } from '../services/api';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { DocumentTextIcon, ChartBarIcon, TableCellsIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className="bg-primary-light p-3 rounded-full">
            {React.cloneElement(icon, { className: "h-7 w-7 text-primary" })}
        </div>
        <div>
            <p className="text-lg text-text-secondary">{title}</p>
            <p className="text-3xl font-bold text-text-primary">{value}</p>
        </div>
    </div>
);

const Table = ({ headers, children }) => (
    <div className="overflow-x-auto rounded-lg border border-neutral-dark">
        <table className="min-w-full divide-y divide-neutral-dark">
            <thead className="bg-neutral-light">
                <tr>
                    {headers.map(header => (
                        <th key={header} scope="col" className="px-6 py-3.5 text-left text-md font-semibold text-text-primary">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-light bg-white">
                {children}
            </tbody>
        </table>
    </div>
);


const AdminDashboard = () => {
  const [comparatifs, setComparatifs] = useState([]);
  const [participatives, setParticipatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [comparatifsRes, participativesRes] = await Promise.all([
          getComparatifs(),
          getParticipatives()
        ]);
        
        console.log("Comparatifs API Response:", comparatifsRes);
        console.log("Participatives API Response:", participativesRes);
        
        // Add safety checks to ensure data is an array
        setComparatifs(Array.isArray(comparatifsRes?.data) ? comparatifsRes.data : []);
        setParticipatives(Array.isArray(participativesRes?.data) ? participativesRes.data : []);
        
        setError('');
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError('Impossible de charger les données. Le backend est-il démarré ?');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-lightest">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Tableau de Bord Administrateur</h1>

        {loading && (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        )}
        
        {error && (
            <div className="bg-red-100 border-l-4 border-error text-error p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">Erreur de chargement</h3>
                <p>{error}</p>
            </div>
        )}

        {!loading && !error && (
          <div className="space-y-12">
            <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center"><ChartBarIcon className="h-7 w-7 mr-3 text-primary"/>Synthèse des Résultats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard title="Questionnaires Comparatifs" value={comparatifs.length} icon={<DocumentTextIcon />} />
                    <StatCard title="Enquêtes Focus Group" value={participatives.length} icon={<DocumentTextIcon />} />
                    <div className="bg-neutral-light p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
                        <ChartBarIcon className="h-12 w-12 text-gray-400 mb-3"/>
                        <h3 className="text-lg font-semibold text-text-secondary">Graphiques à venir</h3>
                        <p className="text-sm text-text-secondary">Des visualisations de données seront bientôt disponibles ici.</p>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-text-primary flex items-center"><TableCellsIcon className="h-7 w-7 mr-3 text-primary"/>Liste des Enquêtes</h2>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition">
                        <ArrowDownTrayIcon className="h-5 w-5"/>
                        <span>Exporter tout (CSV)</span>
                    </button>
                </div>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold text-text-primary mb-4">Questionnaires Comparatifs ({comparatifs.length})</h3>
                        <Table headers={['Répondant', 'Type', 'Superficie (ha)', 'Spéculation', 'Date']}>
                            {comparatifs.slice(0, 5).map(item => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{item.identification?.individuelNom || item.identification?.groupementNom || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary capitalize">{item.identification?.typeRepondant || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{item.identification?.superficieExploitee || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{item.identification?.speculationPrincipale || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</td>
                                </tr>
                            ))}
                        </Table>
                         {comparatifs.length === 0 && <p className="text-center py-8 text-text-secondary">Aucun questionnaire comparatif trouvé.</p>}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-text-primary mb-4">Enquêtes Focus Group ({participatives.length})</h3>
                        <Table headers={['Localité', 'Nb. Participants', 'Animateur', 'Date']}>
                            {participatives.slice(0, 5).map(item => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{item.identification?.localite || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{item.identification?.listeParticipants?.length || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{item.animateur || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{item.dateAnimateur || item.createdAt ? new Date(item.dateAnimateur || item.createdAt).toLocaleDateString() : 'N/A'}</td>
                                </tr>
                            ))}
                        </Table>
                        {participatives.length === 0 && <p className="text-center py-8 text-text-secondary">Aucune enquête de focus group trouvée.</p>}
                    </div>
                </div>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
