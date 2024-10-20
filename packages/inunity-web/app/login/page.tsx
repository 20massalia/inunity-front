"use client";

import { useMessageManager } from '@/lib/MessageManager';
import { platformResolver } from '@/lib/PlatformResolver';
import { MessageEventType } from 'message-type/message-type';
import { useRouter } from 'next/navigation';
import { useState,  useEffect } from 'react';

const requestLogin = async (id: string, pw: string) => {
  return fetch('http://192.168.1.146:8888/signin', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: id, password: pw }),
    method: 'POST',
    credentials: 'include'
  })
}

const checkValidity = async () => {
  return fetch('http://192.168.1.146:8888/welcome', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include'
  })
}

export default function Login() {
  const [form, setForm] = useState({ id: '', pw: '' })
  const edit = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
  const messageManager = useMessageManager({
    [MessageEventType.Auth]: () => {
      alert('auth message received');
      messageManager?.sendMessage(MessageEventType.Log, 'Auth Completed!');
    },
  });
  const router = useRouter();

  const onSubmit = async () => {
    requestLogin(form.id, form.pw).then(res => {
      messageManager?.sendMessage(MessageEventType.Log, res.ok)
      if (res) {
        messageManager?.sendMessage(MessageEventType.Login, document.cookie);
        router.replace('/list', );
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
      if (res.ok){
        router.replace('/list',);
      } else setUsername('')

    })
  }, [checkValidity])

 

  return (
    <div className="App">
      <p>id</p>
      <input onChange={({ target: { value } }) => edit('id', value)}></input>
      <p>pw</p>
      <input onChange={({ target: { value } }) => edit('pw', value)}></input>
      <p onClick={() => messageManager?.sendMessage(MessageEventType.Navigation, {route: 'find', pararms: {param1: 'param1'}})}>Lost Password?</p>
      <button onClick={onSubmit}> login </button>
      <p>
        쿠키값:
        {
          // cookies().getAll().join(', ')
        }
      </p>
      <p>
        {
          username
        }
      </p>

    </div>
  );
}