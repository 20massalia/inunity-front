"use client";

import { useRouter } from 'next/navigation';
import styles from '../Frame.module.css';


import { MessageEventType } from 'message-type/message-type';
import { Typography, UserProfile } from 'ui/components';
import { useQuery } from '@tanstack/react-query';
import PostListItem from 'ui/src/PostListItem';
import { Metadata } from 'next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import { usePlatform } from '@/hooks/usePlatform';
import { useMessageManager } from '@/components/MessageContext';


const fetchList = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include'
  })
}

type Post = { author: string; authorOrg: string; content: string; date: string; likes: number; comments: number; };


export default function List() {
  const router = useRouter();

  const messageManager = useMessageManager();

  const { data, isLoading } = useQuery({
    queryKey: ['list'],
    queryFn: () => fetchList().then(async res => {
      return (await res.json()) as Post[];
    }),
  })
  const { isWebView } = usePlatform();
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 100; // Maximum scroll value for full transition
      const header = headerRef.current!
      const h5 = subTitleRef.current!
      const h1 = titleRef.current!
    
      // Calculate new height and font sizes
      const newHeight = Math.max(100, 250 - (scrollPosition * 2)); // Minimum height set to 100px
      const newFontSizeH5 = Math.min(Math.max(10, 30 - (scrollPosition * 0.3)), 30);
      const newFontSizeH1 = Math.max(16, 30 - (scrollPosition * 0.3));
    
      const h5YPosition = 10 - (scrollPosition)


      // Apply styles
      header.style.height = `${newHeight}px`;
      if (newHeight <= 130) {
        header.style.position = 'fixed';
        header.style.top = '0';
      }
      else header.style.position = 'inherit';
      
      titlesRef.current!.style.transform = `translateY(${h5YPosition})`;
      h5.style.fontSize = `${newFontSizeH5}px`;
      h1.style.fontSize = `${newFontSizeH1}px`;

    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  const titleRef = useRef<HTMLElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div >
      <meta name="theme-color" content="#002874"></meta>
      <div style={{height:'100vh'}}>
        <div ref={headerRef} className='h-[250px] pt-[50px] flex bg-[#002874] w-full  text-white'>
          <div className="px-4 py-3 flex flex-1 flex-col justify-between">
          <div className="flex flex-row justify-between">
            <FontAwesomeIcon icon={faChevronLeft} fontSize={24} />
            <div className="flex gap-3">
              <FontAwesomeIcon icon={faEdit} fontSize={24}/>
              <FontAwesomeIcon icon={faSearch} fontSize={24} />
            </div>
          </div>
          <div ref={titlesRef} className="flex flex-col gap-2">
            <Typography ref={titleRef} variant='h5'>컴퓨터공학부</Typography>
            <Typography ref={subTitleRef} variant='h1'>공지사항</Typography>
          </div>
          </div>
        </div>
        {
          !isLoading &&
          data?.map(item => <div key={item.content} className={styles.postListItem}
            onClick={() => {
              if (isWebView) messageManager?.sendMessage(MessageEventType.Navigation, { path: 'detail' })
              else router.push('detail')
            }}>
            <PostListItem
            
              name={item.author}
              department={item.authorOrg}
              content={item.content}
              date={item.date}
              likes={item.likes}
              bookmarks={item.comments}
              postId={''}
              toggleLike={function (postId: string): void {
                throw new Error('Function not implemented.');
              }} toggleBookmark={function (postId: string): void {
                throw new Error('Function not implemented.');
              }} isLiked={false} isBookmarked={false} />

          </div>)
        }



      </div>
    </div>);
};
