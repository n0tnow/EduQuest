import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useWeb3 } from '../../contexts/Web3Context';
import { 
  ChevronLeft,
  Layout, 
  BookOpen, 
  Trophy,
  GraduationCap,
  Map,
  Users,
  Wallet,
  ChevronDown,
  MessageSquare,
  ShoppingBag
} from 'lucide-react';

const MenuItem = ({ item, isCollapsed, router, activeSubmenu, setActiveSubmenu }) => {
  const isActive = item.submenu 
    ? item.submenuItems?.some(subItem => router.pathname === subItem.path)
    : router.pathname === item.path;

  const isSubmenuOpen = activeSubmenu === item.title;

  const handleClick = () => {
    if (item.submenu) {
      setActiveSubmenu(isSubmenuOpen ? null : item.title);
    } else {
      router.push(item.path);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`w-full flex items-center px-4 py-3 text-gray-400 hover:text-white transition-colors
          ${isActive ? 'text-white bg-purple-600' : 'hover:bg-gray-800'}
          ${isCollapsed ? 'justify-center' : 'justify-between'}`}
      >
        <div className="flex items-center">
          {item.icon}
          {!isCollapsed && <span className="ml-3">{item.title}</span>}
        </div>
        {!isCollapsed && item.submenu && (
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Submenu */}
      {item.submenu && !isCollapsed && isSubmenuOpen && (
        <div className="pl-4">
          {item.submenuItems.map((subItem, subIndex) => (
            <button
              key={subIndex}
              onClick={() => router.push(subItem.path)}
              className={`w-full flex items-center px-4 py-2 text-sm rounded-lg my-1 transition-colors
                ${router.pathname === subItem.path
                  ? 'text-white bg-purple-600'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            >
              <div className="flex items-center">
                {subItem.icon}
                <div className="ml-3">
                  <div>{subItem.title}</div>
                  {subItem.reward && <div className="text-xs text-gray-500">{subItem.reward}</div>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const { account } = useWeb3();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Layout size={20} />,
      path: '/dashboard'
    },
    {
      title: 'Available Courses',
      icon: <BookOpen size={20} />,
      path: '/courses/available',
    },
    {
      title: 'My Learning',
      icon: <GraduationCap size={20} />,
      path: '/courses/learning'
    },
    {
      title: 'Learning Path',
      icon: <Map size={20} />,
      path: '/courses/path'
    },
    {
      title: 'Individual Tournaments',
      icon: <Trophy size={20} />,
      submenu: true,
      submenuItems: [
        {
          title: 'Daily Challenge',
          path: '/tournaments/individual/daily',
          reward: '50 Points + NFT'
        },
        {
          title: 'Weekly League',
          path: '/tournaments/individual/weekly',
          reward: '150 Points + Rare NFT'
        },
        {
          title: 'Monthly Championship',
          path: '/tournaments/individual/monthly',
          reward: '500 Points + Epic NFT'
        }
      ]
    },
    {
      title: 'Team Tournaments',
      icon: <Users size={20} />,
      submenu: true,
      submenuItems: [
        {
          title: 'Daily Team Battle',
          path: '/tournaments/team/daily',
          reward: '100 Points/Team + NFT'
        },
        {
          title: 'Weekly Team League',
          path: '/tournaments/team/weekly',
          reward: '300 Points/Team + Rare NFT'
        },
        {
          title: 'Monthly Team Cup',
          path: '/tournaments/team/monthly',
          reward: '1000 Points/Team + Legendary NFT'
        }
      ]
    },
    {
      title: 'NFT Marketplace',
      icon: <ShoppingBag size={20} />,
      path: '/nft-marketplace'
    },
    {
      title: 'Community',
      icon: <MessageSquare size={20} />,
      path: '/community-platform/Community'
    }
  ];

  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-900 shadow-xl z-50 transition-all duration-300
      ${isCollapsed ? 'w-20' : 'w-64'} border-r border-gray-800 flex flex-col`}>
      {/* Logo Section */}
      <div className="flex-shrink-0 h-16 flex items-center justify-between px-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">EQ</span>
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <span className="text-white font-bold text-lg">EduQuest</span>
              <span className="text-purple-400 text-xs block">Learn & Earn</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation with Custom Scrollbar */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <div className="py-4">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              isCollapsed={isCollapsed}
              router={router}
              activeSubmenu={activeSubmenu}
              setActiveSubmenu={setActiveSubmenu}
            />
          ))}
        </div>
      </nav>

      {/* Connected Wallet */}
      {account && (
        <div className="flex-shrink-0 p-4 border-t border-gray-800">
          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <Wallet className="h-5 w-5 text-purple-400" />
              {!isCollapsed && (
                <div className="ml-3">
                  <p className="text-xs text-gray-400">Connected Wallet</p>
                  <p className="text-sm text-purple-400 font-medium truncate">
                    {`${account.slice(0, 6)}...${account.slice(-4)}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;