import React, { useState } from 'react';
import { UserProfile } from '../components/UserProfile';

const SomePage = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleToggleMenu = (id: string) => {
    setOpenMenuId(prevId => prevId === id ? null : id);
  };

  return (
    <div>
      <UserProfile
        profileImage="path/to/image.jpg"
        name="John Doe"
        introduction="Software Developer"
        id="user1"
        isMenuOpen={openMenuId === "user1"}
        onToggleMenu={() => handleToggleMenu("user1")}
        actions={[
          { label: 'Edit Profile', onClick: () => console.log('Edit Profile clicked') },
          { label: 'Logout', onClick: () => console.log('Logout clicked') },
        ]}
      />
      {/* 다른 UserProfile 컴포넌트들... */}
    </div>
  );
};

export default SomePage;
