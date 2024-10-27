import { Meta, StoryFn } from '@storybook/react';
import { UserProfile, UserProfileProps } from '../components/UserProfile';
import { WithMenuProvider } from '../WithMenuProvider';
import React from 'react';
import {useMenu} from '../contexts/MenuContext'


const Template: StoryFn<UserProfileProps> = (args) => {
    const { openMenuId, setOpenMenuId } = useMenu();
    const isMenuOpen = openMenuId === args.id;
    const setIsMenuOpen = (value: boolean) => setOpenMenuId(value ? args.id : null);   
  return (
    <UserProfile 
      {...args} 
      isMenuOpen={isMenuOpen} 
      onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  profileImage: 'path/to/image.jpg',
  name: 'John Doe',
  introduction: 'Software Developer',
  id: 'user1',
  actions: [
    { label: 'Edit Profile', onClick: () => console.log('Edit Profile clicked') },
    { label: 'Logout', onClick: () => console.log('Logout clicked') },
  ],

};


export default {
    title: 'Components/UserProfile',
    component: UserProfile,
    decorators: [WithMenuProvider], 
  } as Meta;