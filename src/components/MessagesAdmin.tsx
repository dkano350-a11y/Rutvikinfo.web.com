import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Download, Loader2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchMessages = () => {
      try {
        const q = query(collection(db, 'messages'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data: any[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          // Sort descending by createdAt in JS
          data.sort((a, b) => {
            const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : Date.now();
            const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : Date.now();
            return tB - tA;
          });
          setMessages(data);
          setLoading(false);
        }, (error) => {
          console.error('Error fetching messages in realtime:', error);
          setLoading(false);
        });
        return unsubscribe;
      } catch (error) {
        console.error('Error setting up onSnapshot:', error);
        setLoading(false);
      }
    };

    const unsubscribe = fetchMessages();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'dangarrutvik@100#') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy text-white flex items-center justify-center p-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-electric/20 text-electric rounded-2xl flex items-center justify-center">
              <Lock size={32} />
            </div>
          </div>
          <button onClick={() => {
            addDoc(collection(db, 'messages'), {
               name: 'Test Name',
               email: 'test@example.com',
               message: 'Test Message',
               createdAt: new Date()
            })
          }} className="mb-4 bg-gray-500 text-white p-2">Send Test Message</button>
          <h1 className="text-2xl font-bold text-center mb-8">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-electric transition-colors"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-electric text-navy font-bold py-3 px-6 rounded-xl hover:bg-electric/90 transition-colors"
            >
              Access Messages
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-electric" size={48} />
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/50">
            No messages found.
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.map((msg, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={msg.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl">{msg.name}</h3>
                    <p className="text-white/60 text-sm mt-1">
                      <a href={`mailto:${msg.email}`} className="text-electric hover:underline">
                        {msg.email}
                      </a>
                    </p>
                  </div>
                  <div className="text-right text-sm text-white/40">
                    {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : 
                     (msg.createdAt instanceof Date ? msg.createdAt.toLocaleString() : 'Just now')}
                  </div>
                </div>
                
                <div className="bg-navy/50 rounded-xl p-4 mb-4 whitespace-pre-wrap font-mono text-sm leading-relaxed border border-white/5">
                  {msg.message}
                </div>

                {msg.attachmentUrl && (
                  <a
                    href={msg.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-electric/20 text-electric rounded-lg hover:bg-electric/30 transition-colors text-sm font-medium"
                  >
                    <Download size={16} />
                    View File
                  </a>
                )}
                {/* Fallback if using safe-upload message */}
                {!msg.attachmentUrl && msg.attachmentName && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/70 rounded-lg text-sm font-medium">
                    <Download size={16} />
                    {msg.attachmentName} (Local sharing request)
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
