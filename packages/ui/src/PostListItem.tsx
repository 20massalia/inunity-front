import React from 'react';
import { UserProfile } from './UserProfile';
import { useMenu } from './contexts/MenuContext';
import Typography from './Typography'


// Colors
const COLORS = {
  background: 'bg-white',
  profileBackground: 'bg-[#eaddff]',
  name: 'text-[#0f1419]',
  department: 'text-[#536471]',
  content: 'text-[#3b3f43]',
  date: 'text-[#536471]',
  border: 'border-[#eff3f4]',
  stats: 'text-[#0f1419]',
};

export interface PostListItemProps {
  name: string;
  department: string;
  content: string;
  date: string;
  likes: number;
  bookmarks: number; 
  postId: string;
  toggleLike: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
  isLiked: boolean;
  isBookmarked: boolean;
}


const PostListItem: React.FC<PostListItemProps> = ({ name, department, content, date, likes, bookmarks, postId, toggleLike, toggleBookmark, isLiked, isBookmarked }) => {
    const { openMenuId, setOpenMenuId } = useMenu();
    const isMenuOpen = openMenuId === name;
    const setIsMenuOpen = (value: boolean) => setOpenMenuId(value ? name : null);
  return (
    <div className={`w-full max-w-md h-auto ${COLORS.background} p-6 flex-col justify-center items-start inline-flex`}>
        <UserProfile
            profileImage={''}
            name={name}
            introduction={department}
            id={name}
            isMenuOpen={isMenuOpen}
                onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                actions={[
                  { label: 'Edit Post', onClick: () => console.log('Edit Post clicked') },
                  { label: 'Delete Post', onClick: () => console.log('Delete Post clicked') },
                  { label: 'Report Post', onClick: () => console.log('Report Post clicked') }
                ]}
        />
      <Typography variant="body" className={`self-stretch ${COLORS.content}`}>{content}</Typography>
      <div className={`self-stretch pt-4 pb-6 justify-end items-start gap-1 inline-flex`}>
        <Typography variant="body" className={COLORS.date}>{date}</Typography>
      </div>
      <div className={`self-stretch h-px border ${COLORS.border}`}></div>
      <div className={`pl-2 pt-2 justify-start items-start inline-flex gap-2`}>
        <div className={`justify-start items-center flex`}>
          <div className={`flex items-center gap-2`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 ${isLiked ? 'text-blue-500' : 'text-black'} cursor-pointer`}
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => toggleLike(postId)}
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <Typography variant="caption" className={`${COLORS.stats} ${isLiked ? 'text-blue-500' : 'text-black'}`}>
              {likes}
            </Typography>
          </div>
        </div>
        <div className={`justify-start items-center flex`}>
          <div className={`flex items-center gap-2`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 ${isBookmarked ? 'text-blue-500' : 'text-black'} cursor-pointer`}
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => toggleBookmark(postId)}
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <Typography variant="caption" className={`${COLORS.stats} ${isBookmarked ? 'text-blue-500' : 'text-black'}`}>
              {bookmarks}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;