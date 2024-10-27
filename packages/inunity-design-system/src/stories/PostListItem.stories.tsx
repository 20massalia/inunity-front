import { Meta, StoryFn } from '@storybook/react';

import PostListItem, { PostListItemProps } from '../components/PostListItem';
import { WithMenuProvider } from '../WithMenuProvider';



const Template: StoryFn<PostListItemProps> = (args) => {
  return (
    <PostListItem {...args} />
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
  department: 'Software Developer',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  date: '2024-01-01',
  likes: 10,
  bookmarks: 100,
  postId: '1',
  toggleLike: () => {},
  toggleBookmark: () => {},
  isLiked: false,
  isBookmarked: false,
};


export default {
    title: 'Components/PostListItem',
    component: PostListItem,
    decorators: [WithMenuProvider], 
  } as Meta;