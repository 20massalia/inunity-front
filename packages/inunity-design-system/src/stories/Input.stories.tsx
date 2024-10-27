import { Meta, StoryFn } from '@storybook/react';
import Input, { InputProps } from '../components/Input';

const passwordVisibleIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4C6.477 4 2 8.477 2 14s4.477 10 10 10 10-4.477 10-10S17.523 4 12 4zm0 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25h-1.5v-1.5h6v1.5h-4.5v4.5h-1.5v-4.5zm0 6h-1.5v-1.5h6v1.5h-4.5v4.5h-1.5v-4.5zm0-12h-1.5v-1.5h6v1.5h-4.5v4.5h-1.5v-4.5z"/></svg>;
const passwordInvisibleIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4C6.477 4 2 8.477 2 14s4.477 10 10 10 10-4.477 10-10S17.523 4 12 4zm0 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25h-1.5v-1.5h6v1.5h-4.5v4.5h-1.5v-4.5zm0 6h-1.5v-1.5h6v1.5h-4.5v4.5h-1.5v-4.5zm0-12h-1.5v-1.5h6v1.5h-4.5v4.5h-1.5v-4.5z"/></svg>;
const leftUploadIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/><path d="M21 15v4c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-4l14-14zm0 16H5v-4l14 4zm0-6H5v4l14-4z"/></svg>;

const Template: StoryFn<InputProps> = (args) => {
  return (
    <Input  {...args}/>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: '',
  setValue: () => {},
  leftIcon: leftUploadIcon,
  rightIcon: passwordVisibleIcon
};

export default {
    title: 'Components/Input',
    component: Input,
  } as Meta;