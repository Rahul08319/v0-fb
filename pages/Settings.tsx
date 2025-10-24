
import React from 'react';
import { FacebookPage } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

interface SettingsProps {
  pages: FacebookPage[];
}

const Settings: React.FC<SettingsProps> = ({ pages }) => {
  const { logout } = useAuth();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card title="Connected Pages">
        <ul role="list" className="divide-y divide-gray-200">
          {pages.map((page) => (
            <li key={page.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src={page.avatarUrl} alt="" />
                <p className="ml-3 text-sm font-medium text-gray-900">{page.name}</p>
              </div>
              <Button variant="secondary">Disconnect</Button>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Account">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Manage your account settings and preferences.
          </p>
          <div className="pt-4 border-t border-gray-200">
            <Button variant="danger" onClick={logout}>
              Sign Out of FBPostForge
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Legal">
         <div className="space-y-2">
            <a href="#" className="text-sm text-brand-blue hover:underline">Privacy Policy</a>
            <br />
            <a href="#" className="text-sm text-brand-blue hover:underline">Terms of Service</a>
         </div>
      </Card>
    </div>
  );
};

export default Settings;
