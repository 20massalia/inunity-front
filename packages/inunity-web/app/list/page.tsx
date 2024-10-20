"use client";

import { useRouter } from 'next/navigation';
import styles from '../Frame.module.css';
import { useEffect, useState } from 'react';
import { useMessageManager } from '@/lib/MessageManager';
import { platformResolver } from '@/lib/PlatformResolver';
import { MessageEventType } from 'message-type/message-type';

const fetchList = async () => {
  return fetch('http://192.168.1.146:8888/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include'
  })
}

type Post = {author: string; authorOrg: string; content:string; date:string;likes:number;comments:number;};

export default function List() {
  const router = useRouter();

  const messageManager = useMessageManager();

  const [list, setList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchList().then(async res => {
      messageManager?.sendMessage(MessageEventType.Log, res.ok)
      if (res.ok) {
        setList((await res.json()))
        setLoading(false)
      }
    }).catch(err => messageManager?.sendMessage(MessageEventType.Log, err.message))
  }, [])


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
          !loading &&
          list.map(item => <div key={item.content} className={styles.postListItem} onClick={() => {
            messageManager?.sendMessage(MessageEventType.Log, 'test')
            if (platformResolver(navigator.userAgent.toLowerCase()).isWebView) messageManager?.sendMessage(MessageEventType.Navigation, { path: 'detail' })
            else router.push('detail')
          }}>
            <div className={styles.postUserProfile}>
              <div className={styles.userHandle}>
                <div className={styles.user}>{item.author}</div>
                <div className={styles.handleParent}>
                  <div className={styles.handle}>{item.authorOrg}</div>
                </div>
              </div>
              <div className={styles.spacer} />
            </div>
            <div className={styles.div3}>
              <p className={styles.p}>{item.content}</p>
            </div>
            <div className={styles.timestamp}>
              <div className={styles.date}>{item.date}</div>
            </div>
            <div className={styles.line} />
            <div className={styles.interactions}>
              <div className={styles.retweets}>
                <div className={styles.handle}>{item.comments}</div>
              </div>
              <div className={styles.retweets}>
                <div className={styles.handle}>{item.likes}</div>
              </div>
            </div>
          </div>)
        }



      </div>
    </div>);
};
