import React, { useState } from 'react';

const SecurityOption: React.FC<{ title: string; description: string; enabled: boolean; onToggle: () => void }> = ({ title, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <div>
      <h3 className="font-semibold text-lg text-secondary dark:text-dark-secondary">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={enabled} onChange={onToggle} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

const RoleManagementPage: React.FC = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['all'], members: ['John Doe'] },
    { id: 2, name: 'Editor', permissions: ['edit', 'create'], members: ['Jane Smith'] },
    { id: 3, name: 'Viewer', permissions: ['view'], members: ['Peter Jones', 'Mary Williams'] },
  ]);
  const [newRole, setNewRole] = useState('');
  const [newPermission, setNewPermission] = useState('');
  const [newMember, setNewMember] = useState('');
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [roleBasedAccess, setRoleBasedAccess] = useState(true);

  const handleAddRole = () => {
    if (newRole.trim() !== '' && !roles.find(role => role.name === newRole)) {
      setRoles([...roles, { id: Date.now(), name: newRole, permissions: [], members: [] }]);
      setNewRole('');
    }
  };

  const handleAddPermission = () => {
    if (selectedRole !== null && newPermission.trim() !== '') {
      setRoles(roles.map(role => 
        role.id === selectedRole 
          ? { ...role, permissions: [...role.permissions, newPermission] } 
          : role
      ));
      setNewPermission('');
    }
  };

  const handleAddMember = () => {
    if (selectedRole !== null && newMember.trim() !== '') {
      setRoles(roles.map(role => 
        role.id === selectedRole 
          ? { ...role, members: [...role.members, newMember] } 
          : role
      ));
      setNewMember('');
    }
  };

  return (
    <div className="p-8 text-primary dark:text-dark-primary">
      <h1 className="text-3xl font-bold mb-6 text-secondary dark:text-dark-secondary">Role-Based Access Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Roles List */}
        <div className="md:col-span-1 bg-primary dark:bg-dark-primary border border-secondary dark:border-dark-secondary rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-secondary dark:text-dark-secondary">Roles</h2>
          <div className="space-y-2">
            {roles.map(role => (
              <div 
                key={role.id} 
                className={`p-4 rounded-lg cursor-pointer transition-all ${selectedRole === role.id ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <h3 className="font-semibold">{role.name}</h3>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <input 
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="New role name"
              className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button 
              onClick={handleAddRole}
              className="w-full mt-2 bg-accent hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
            >
              Add Role
            </button>
          </div>
        </div>

        {/* Permissions and Members */}
        <div className="md:col-span-2 bg-primary dark:bg-dark-primary border border-secondary dark:border-dark-secondary rounded-lg p-6">
          {selectedRole !== null ? (
            roles.filter(role => role.id === selectedRole).map(role => (
              <div key={role.id}>
                <h2 className="text-2xl font-semibold mb-4 text-secondary dark:text-dark-secondary">{role.name} Details</h2>
                
                {/* Permissions */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-secondary dark:text-dark-secondary">Permissions</h3>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    {role.permissions.map((permission, index) => (
                      <li key={index}>{permission}</li>
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      value={newPermission}
                      onChange={(e) => setNewPermission(e.target.value)}
                      placeholder="New permission"
                      className="flex-grow p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button 
                      onClick={handleAddPermission}
                      className="bg-accent hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
                    >
                      Add Permission
                    </button>
                  </div>
                </div>

                <hr className="my-6 border-gray-300 dark:border-gray-600" />

                {/* Members */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-secondary dark:text-dark-secondary">Members</h3>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    {role.members.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      placeholder="New member name"
                      className="flex-grow p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button 
                      onClick={handleAddMember}
                      className="bg-accent hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
                    >
                      Add Member
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">Select a role to see details</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Security Section */}
      <div className="mt-8 bg-primary dark:bg-dark-primary border border-secondary dark:border-dark-secondary rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-secondary dark:text-dark-secondary">Security</h2>
        <div className="space-y-4">
          <SecurityOption 
            title="Two-Factor Authentication (2FA)" 
            description="Add an extra layer of security to your account."
            enabled={twoFactorEnabled}
            onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)}
          />
          <SecurityOption 
            title="Role-Based Access"
            description="Manage who can see and do what in your team."
            enabled={roleBasedAccess}
            onToggle={() => setRoleBasedAccess(!roleBasedAccess)}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPage;
