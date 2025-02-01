'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  connectWallet,
  fetchMessagesAR,
  messageAR,
  runLua,
  spawnProcess,
  transactionAR,
  useQuickWallet,
} from '@/lib/arkit';

const file1Code = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}`;
const file2Code = `import2 { clsx2, type ClassValue } from "clsx2";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}`;

const fileData = [
  {
    file: 'data/file1.tsx',
    body: file1Code,
  },
  {
    file: 'data/file2.tsx',
    body: file2Code,
  },
];

const Testarweave = () => {
  const [process, setProcess] = useState('');
  const [message, setMessage] = useState('');
  const [fetchedMessages, setFetchedMessages] = useState();
  const [spawning, setSpawning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [quickWalletData, setQuicktWalletData] = useState(null);

  const handleGenerateWallet = async () => {
    try {
      const data = await useQuickWallet();
      setQuicktWalletData(data);
    } catch (error) {
      console.error('Error generating Arweave wallet:', error);
    }
  };

  const handleSendMessage = async ({ fileData }) => {
    try {
      setLoading(true);
      const process = localStorage.getItem('spawnedProcess');

      if (!process) {
        alert('No Process Found');
        return;
      }

      const messageId = await messageAR({
        process,
        data: JSON.stringify(fileData),
        tags: [
          {
            name: 'Action',
            value: 'ChatMessage',
          },
        ],
      });
      console.log('MessageId:', messageId);
      setMessage(messageId);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchMessages = async () => {
    try {
      const messages = await fetchMessagesAR({ process });
      // console.log('Fetched Messages:', messages);

      let parsedFiles = [];
      messages.forEach((message) => {
        const { data } = message;
        console.log('Message Data:', data);
        parsedFiles.push(data.map(({ file, body }) => ({ file, body })));
      });
      console.log(parsedFiles);
      setFetchedMessages(parsedFiles);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleTransaction = async () => {
    await transactionAR({
      data: '<html><head><meta charset="UTF-8"><title>Hello permanent world! This was signed via ArConnect!!!</title></head><body></body></html>',
    });
  };

  const handleSpawn = async () => {
    setSpawning(true);
    const storedProcess = localStorage.getItem('spawnedProcess');
    if (storedProcess) {
      console.warn('Process already spawned!');
      setProcess(storedProcess);
    } else {
      const process = await spawnProcess();
      setProcess(process);
      localStorage.setItem('spawnedProcess', process);
    }
    setSpawning(false);
  };

  useEffect(() => {
    const process = localStorage.getItem('spawnedProcess');
    setProcess(process);
    // handleResults();
  }, []);

  return (
    <div className="p-4">
      <div className="space-x-4 mb-8">
        <Button
          onClick={async () => {
            await connectWallet();
          }}
        >
          Connect
        </Button>
        <Button onClick={handleGenerateWallet}>Quick Wallet</Button>
        <Button onClick={handleSpawn}>
          {spawning ? ' Spawning... ' : ' Spawn Process'}
        </Button>
        <Button onClick={handleSendMessage}>
          {loading ? ' Sending...' : ' Send Message'}
        </Button>
        <Button
          onClick={async () => {
            setLoading(true);
            await runLua({
              process,
              code: 'Handlers.add("pingpong",Handlers.utils.hasMatchingData("ping"),Handlers.utils.reply("pong"))',
            })
              .then(console.log)
              .catch(console.error);
            setLoading(false);
          }}
        >
          {loading ? ' Calling...' : 'Call Eval'}
        </Button>
        <Button onClick={handleFetchMessages}>
          {fetching ? ' Fetching... ' : 'Fetch Messages'}
        </Button>
      </div>
      <div>
        <h2>
          {quickWalletData && (
            <div>
              Wallet Address: {quickWalletData.address}
            </div>
          )}
        </h2>
        <h2 className="mb-4 font-bold text-2xl">
          Messages Fetched from Arweave for {process}
        </h2>
        <h2 className="mb-4 font-bold text-2xl">
          Generated MessageId: {message}
        </h2>
        <div>
          {fetchedMessages &&
            fetchedMessages.map((fileGroup, index) => (
              <div key={index}>
                {fileGroup.map(({ file, body }, idx) => (
                  <pre key={idx}>
                    <h1>{file}</h1>
                    <code>{body}</code>
                  </pre>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Testarweave;
