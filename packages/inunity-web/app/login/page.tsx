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
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">ID</label>
          <input
            id="id"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={({ target: { value } }) => edit('id', value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pw" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="pw"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={({ target: { value } }) => edit('pw', value)}
          />
        </div>
        <p
          className="text-sm text-blue-600 hover:underline cursor-pointer mb-4"
          onClick={() => messageManager?.sendMessage(MessageEventType.Navigation, {route: 'find', pararms: {param1: 'param1'}})}
        >
          Lost Password?
        </p>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={onSubmit}
        >
          Login
        </button>
        {username && (
          <p className="mt-4 text-sm text-gray-600">
            Welcome, {username}
          </p>
        )}
      </div>
    </div>
  );
}