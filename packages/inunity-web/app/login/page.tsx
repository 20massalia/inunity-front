"use client";

import { useMessageManager } from '@/components/MessageContext';
import { platformResolver } from '@/lib/PlatformResolver';
import { MessageEventType } from 'message-type/message-type';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import { Button } from 'ui/components';
import Input from 'ui/src/Input';
import Typography from 'ui/src/Typography';



const requestLogin = async (id: string, pw: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL+'/signin', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: id, password: pw }),
    method: 'POST',
    credentials: 'include'
  })
}

const checkValidity = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL +'/welcome', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include'
  })
}

export const medatdata: Metadata = {
  

}

export default function Login() {
  const [form, setForm] = useState({ id: '', pw: '' })
  const edit = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
  const messageManager = useMessageManager();
  const router = useRouter();

  const onSubmit = async () => {
    messageManager.log('sending login request')
    requestLogin(form.id, form.pw).then(res => {
      messageManager?.sendMessage(MessageEventType.Log, res.ok)
      if (res) {
        messageManager?.sendMessage(MessageEventType.Login, document.cookie);
        router.replace('/list',);
      }
      else {
        // Todo: Clear credentials ;;
        messageManager?.sendMessage(MessageEventType.Logout)
      }
    }).catch(err => messageManager?.sendMessage(MessageEventType.Log, (err as Error).message))
  }
  const [username, setUsername] = useState('');
  const { isWebView } = platformResolver(navigator.userAgent.toLowerCase());

  useEffect(() => {
    checkValidity().then(async res => {
      if (!isWebView) return;
      messageManager?.sendMessage(MessageEventType.Log, res.status)
      if (res.ok) {
        router.replace('/list',);
      } else setUsername('')

    })
  }, [checkValidity])


  const [pwVisible, setPwVisible] = useState(false);
  const pwRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`p-5 gap-3 flex flex-col `} >
      <Typography variant='h3'>아이디</Typography>
      <Input
        value={form.id}
        setValue={(value) => edit('id', value)}
        placeholder='포탈 아이디'
      />    
      <Typography variant='h3' >비밀번호</Typography>
      <Input
        ref={pwRef}
        value={form.pw}
        setValue={(value) => edit('pw', value)}
        placeholder='포탈 비밀번호'
        masked={!pwVisible}
        rightIcon={
        <svg onClick={() => {
          setPwVisible(prev => !prev);
          pwRef.current?.focus()
        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 4C6.477 4 0 9.477 0 16s6.477 12 12 12 12-9.477 12-12S17.523 4 12 4zm0 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.25h1.5v-1.5h-1.5v1.5zm0-3h1.5v-1.5h-1.5v1.5zm0-3h1.5v-1.5h-1.5v1.5zm0-3h1.5v-1.5h-1.5v1.5zm0 3h1.5v1.5h-1.5v-1.5zm0 3h1.5v1.5h-1.5v-1.5zm0 3h1.5v1.5h-1.5v-1.5z"/>
        </svg>
        }
      />

      <p onClick={() => messageManager?.sendMessage(MessageEventType.Navigation, { route: 'find', pararms: { param1: 'param1' } })}>Lost Password?</p>
      <Button  onClick={onSubmit}> 로그인 </Button>
    </div>
  );
}