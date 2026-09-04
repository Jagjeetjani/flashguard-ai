import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import StatusBar from './components/layout/StatusBar';
import OverviewPage from './pages/OverviewPage';
import RiskMapPage from './pages/RiskMapPage';
import PredictionPage from './pages/PredictionPage';
import AlertsPage from './pages/AlertsPage';
import VulnerabilityPage from './pages/VulnerabilityPage';
import AIIntelligencePage from './pages/AIIntelligencePage';
import CitizenReportsPage from './pages/CitizenReportsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import useFloodStore from './store/useFloodStore';

const AppContent = () => {
  const { recalculateRisks, overallRisk } = useFloodStore();
  const location = useLocation();
  
  useEffect(() => {
    recalculateRisks();
  }, [recalculateRisks]);
  
  const getPageTitle = (path) => {
    switch(path) {
      case '/': return 'Dashboard Overview';
      case '/map': return 'Risk Map';
      case '/prediction': return 'AI Predictions';
      case '/alerts': return 'Emergency Alerts';
      case '/vulnerability': return 'Vulnerability Assessment';
      case '/ai-intelligence': return 'AI Intelligence Pipeline';
      case '/citizen-reports': return 'Citizen Reports';
      case '/analytics': return 'Analytics & Trends';
      default: return 'Dashboard Overview';
    }
  };

  const title = getPageTitle(location.pathname);
  const showWarning = overallRisk >= 55;

  return (
    <div className="flex h-screen bg-[#F4F7FB] text-[#172033] overflow-hidden font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col md:ml-64 relative w-full overflow-y-auto">
        <StatusBar />
        <Header title={title} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/map" element={<RiskMapPage />} />
            <Route path="/prediction" element={<PredictionPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/vulnerability" element={<VulnerabilityPage />} />
            <Route path="/ai-intelligence" element={<AIIntelligencePage />} />
            <Route path="/citizen-reports" element={<CitizenReportsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
