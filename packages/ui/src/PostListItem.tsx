"use client";

import React, { useContext } from 'react';
import { UserProfile } from './UserProfile';
import { Typography } from './Typography';
import { useMenu } from './contexts/MenuContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
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
  toggleLike?: (postId: string) => void;
  toggleBookmark?: (postId: string) => void;
  isLiked: boolean;
  isBookmarked: boolean;
  onClick?: () => void;
}


const PostListItem: React.FC<PostListItemProps> = ({ name, department, content, date, likes, bookmarks, postId, toggleLike, toggleBookmark, isLiked, isBookmarked, onClick }) => {
  const { openMenuId, setOpenMenuId } = useMenu();
  const isMenuOpen = openMenuId === name;
  const setIsMenuOpen = (value: boolean) => setOpenMenuId(value ? name : null);
  return (
    <div onClick={onClick} className={`w-full max-w-md h-auto ${COLORS.background} px-4 py-3 flex-col justify-center items-start inline-flex`}>
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
          <div className={`flex items-center gap-2`} onClick={(e) => {
            e.stopPropagation();
            toggleLike?.(postId)
          }}
          >
              <FontAwesomeIcon icon={faHeart} className={`w-6 ${isLiked ? 'text-blue-500' : 'text-black'} cursor-pointer`}
            />
            <Typography variant="caption" className={`${COLORS.stats} ${isLiked ? 'text-blue-500' : 'text-black'}`}>
              {likes}
            </Typography>
          </div>
        </div>
        <div className={`justify-start items-center flex`}>
          <div className={`flex items-center gap-2`} onClick={(e) => {
            e.stopPropagation();
            toggleBookmark?.(postId);
          }}
          >
            <FontAwesomeIcon icon={faBookmark} className={`w-6 ${isBookmarked ? 'text-blue-500' : 'text-black'} cursor-pointer`}
            />

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