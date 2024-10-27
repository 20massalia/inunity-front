"use client";

import { useRouter } from 'next/navigation';
import styles from '../Frame.module.css';
import { useMessageManager } from '@/lib/MessageManager';
import { platformResolver } from '@/lib/PlatformResolver';
import { MessageEventType } from 'message-type/message-type';
import { UserProfile } from 'ui/components';
import { useQuery } from '@tanstack/react-query';
import PostListItem from 'ui/src/PostListItem';

const fetchList = async () => {
  return fetch('http://192.168.1.146:8888/list', {
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
      messageManager?.sendMessage(MessageEventType.Log, res.ok)
      return (await res.json()) as Post[];
    })
  })


  return (
    <div className={styles.div}>

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
          data?.map(item => <div key={item.content} className={styles.postListItem} onClick={() => {
            messageManager?.sendMessage(MessageEventType.Log, 'test')
            if (platformResolver(navigator.userAgent.toLowerCase()).isWebView) messageManager?.sendMessage(MessageEventType.Navigation, { path: 'detail' })
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
