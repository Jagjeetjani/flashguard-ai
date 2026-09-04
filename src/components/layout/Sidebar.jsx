import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Brain, Bell, Shield, Cpu, Users, BarChart3 
} from 'lucide-react';
import useFloodStore from '../../store/useFloodStore';
import FlashGuardLogo from '../common/Logo';

const Sidebar = () => {
  const { villageRisks } = useFloodStore();
  
  const warningCount = villageRisks?.filter(
    v => v.riskLevel === 'CRITICAL' || v.riskLevel === 'HIGH'
  ).length || 0;

  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Risk Map', path: '/map', icon: Map },
    { name: 'Prediction', path: '/prediction', icon: Brain },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: warningCount },
    { name: 'Vulnerability', path: '/vulnerability', icon: Shield },
    { name: 'AI Intelligence', path: '/ai-intelligence', icon: Cpu },
    { name: 'Citizen Reports', path: '/citizen-reports', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#E2E8F0] flex flex-col z-50 shadow-sm select-none">
      {/* Exact Logo Branding Area */}
      <div className="px-6 py-5 border-b border-[#E2E8F0]">
        <NavLink to="/" className="block focus:outline-none">
          <FlashGuardLogo variant="light" size="default" />
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
              ${isActive 
                ? 'bg-[#EAF3FC] text-[#1976D2] font-semibold border-l-[3px] border-[#1976D2]' 
                : 'text-[#4A5568] hover:bg-[#F4F7FB] hover:text-[#12355B] border-l-[3px] border-transparent'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-[18px] h-[18px]" />
              <span>{item.name}</span>
            </div>
            {item.badge > 0 && (
              <span className="bg-[#D33D3D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#E2E8F0] text-center bg-[#F8FAFC]">
        <p className="text-xs text-[#788597] font-medium">SIH 2026 Prototype</p>
        <p className="text-[10px] text-[#A0AEC0] mt-0.5">v1.0.0 • Uttarakhand Corridor</p>
      </div>
    </div>
  );
};

export default Sidebar;
