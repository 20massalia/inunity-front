"use client";

import { useRouter } from 'next/navigation';
import styles from '../Frame.module.css';

import { platformResolver, usePlatformResolver } from '@/lib/PlatformResolver';
import { MessageEventType } from 'message-type/message-type';
import { UserProfile } from 'ui/components';
import { useQuery } from '@tanstack/react-query';
import PostListItem from 'ui/src/PostListItem';
import { Metadata } from 'next';
import { useMessageManager } from '@/components/MessageContext';

const fetchList = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL+'/list', {
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
  const {isWebView} = usePlatformResolver();


  return (
    <div className={styles.div}>
      <meta name="theme-color" content="#002874"></meta>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.parent}>
              <div className={styles.div1}>컴퓨터공학부</div>
              <div className={styles.div2}>공지사항</div>
            </div>
          </div>
          <div className={styles.frameDiv}>
            <div className={styles.editWrapper}>
            </div>
            <div className={styles.editWrapper}>
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
