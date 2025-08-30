import { useState } from 'react';
import { ModeToggle } from "../custom/button/mode-toggle";
import {
  User,
  LogOut, // LogOut icon ကို ထည့်ထားပါတယ်။
} from 'lucide-react';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/common/store/authStore';

export const AppBar = () => {
  // အသိပေးချက်အရေအတွက်အတွက် state (ဥပမာ)
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();
  // ရွေးချယ်ထားသော ဘာသာစကားအတွက် state (ဥပမာ)
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  // Zustand store မှ အသုံးပြုသူအမည်နှင့် logout လုပ်ဆောင်ချက်ကို ရယူသည်။
  const { user, logout } = useAuthStore();
  const userName = user?.name || "ဧည့်သည်"; // Guest ဟု ပြင်ထားသည်။

  const handleLogout = () => {
    logout();
    navigate({ to: '/auth/login' })
  }
  // ဘာသာစကားပြောင်းလဲမှုကို ကိုင်တွယ်ရန် လုပ်ဆောင်ချက်
  const handleLanguageChange = (lang: any) => {
    setSelectedLanguage(lang);
    console.log(`ဘာသာစကားကို ပြောင်းလိုက်ပါပြီ: ${lang}`);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* ဘယ်ဘက်ခြမ်း- Sidebar Trigger */}
      <SidebarTrigger />

      {/* ညာဘက်ခြမ်း- Navigation items */}
      <div className="flex items-center space-x-4">
        {/* အသိပေးချက် icon နှင့် Badge */}
        {/*
        <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
          <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {notificationCount}
            </span>
          )}
        </div>
        */}

        {/* Dynamic အမည်ပါသော User Profile/Avatar */}
        <div className="flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200">
          <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300 font-medium hidden sm:block">
            {userName}
          </span>
        </div>

        {/* ဘာသာစကားရွေးချယ်ခြင်း */}
        {/*
        <div className="relative">
          <button
            onClick={() => console.log('ဘာသာစကား dropdown ကို ဖွင့်ပါ')} // Dropdown toggle logic ကို ထည့်သွင်းပါ။
            className="flex items-center space-x-1 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            <span>{selectedLanguage}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        */}
        {/* ရိုးရှင်းသော dropdown content ဥပမာ */}
        {/*
          <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
            <button onClick={() => handleLanguageChange('EN')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">EN</button>
            <button onClick={() => handleLanguageChange('ES')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">ES</button>
            <button onClick={() => handleLanguageChange('FR')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">FR</button>
          </div>
        */}
        {/*</div>*/}

        {/* Settings icon */}
        {/*
        <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
          <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </div>
        */}

        {/* Mode Toggle (အလင်း/အမှောင်) */}
        <ModeToggle />

        {/* Logout ခလုတ် */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
          <span className="hidden sm:block">Logout</span>
        </Button>
      </div>
    </div >
  );
};
