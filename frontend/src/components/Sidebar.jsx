import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldCheck, Settings, Map } from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
        { path: '/clients', icon: Users, label: 'Clients' },
        { path: '/rse', icon: Map, label: 'Initiatives RSE' },
        { path: '/admin', icon: Settings, label: 'Administration' },
    ];

    return (
        <div className="h-screen w-64 bg-lloyd-blue text-white flex flex-col shadow-xl">
            <div className="p-6 border-b border-white/10 flex flex-col items-center">
                <img src={logo} alt="PALLoyd Logo" className="h-16 mb-3" />
                <h1 className="text-xl font-bold text-lloyd-spindle">PALLoyd</h1>
                <p className="text-xs text-gray-300 mt-1">Tableau de Bord Admin</p>
            </div>

            <nav className="flex-1 py-6">
                <ul className="space-y-2 px-4">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-lloyd-crimson text-white shadow-md'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`
                                }
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-lloyd-spindle flex items-center justify-center text-lloyd-blue font-bold">
                        A
                    </div>
                    <div>
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-gray-400">Lloyd Assurances</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
