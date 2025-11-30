import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Saisie from './pages/Saisie.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import FormulaireComparatif from './forms/FormulaireComparatif.jsx';
import FormulaireFocusGroup from './forms/FormulaireFocusGroup.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/saisie" />} />
        <Route path="/saisie" element={<Saisie />}>
          {/* Child routes will be rendered inside Saisie's <Outlet /> */}
          <Route path="comparatif" element={<FormulaireComparatif />} />
          <Route path="focus-group" element={<FormulaireFocusGroup />} />
        </Route>
        
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
