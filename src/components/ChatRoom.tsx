import {LogOut, Paperclip, Send, Smile} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect, useRef, useState} from "react";
import type {Message} from "@/types/message";
import MessageComponent from "@/components/MessageComponent.tsx";
import * as React from "react";

interface ChatRoomProps {
    token: string;
    username: string;
    room: string;
}

export default function ChatRoom({token, username, room}: ChatRoomProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedRoom = 'room1';
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        ws.current = new WebSocket(`${protocol}://zx4w29z4-5000.asse.devtunnels.ms/ws?token=${savedToken}&room=${savedRoom}`);

        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = (event) => {
            const msg: Message = JSON.parse(event.data);
            setMessages(prev => [...prev, msg]);
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        ws.current.onerror = (err) => {
            console.error('WebSocket error', err);
        };

        return () => {
            ws.current?.close();
        };
    }, [token, room]);

    const sendMessage = () => {
        if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({content: input}));
            setInput('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-gray-200 px-4 flex items-center justify-between bg-white">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-3">
                            <div>
                                <h2 className="font-semibold">Hello, {username}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut className="h-5 w-5 text-white"/>
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-4 bg-gray-50">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <MessageComponent
                                key={`${message.username}-${index}`}
                                content={message.content}
                                sender={message.username}
                                isMe={message.username === username}
                            />
                        ))}
                    </div>
                </div>

                <footer className="p-4 border-t border-gray-200 bg-white">
                    <form
                        onSubmit={(e: React.FormEvent) => {
                            e.preventDefault()
                            sendMessage()
                        }}
                        className="flex items-center space-x-2"
                    >
                        <Button type="button" variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5 text-gray-500"/>
                        </Button>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Ketik pesan..."
                            className="flex-1"
                        />
                        <Button type="button" variant="ghost" size="icon">
                            <Smile className="h-5 w-5 text-gray-500"/>
                        </Button>
                        <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
                            <Send className="h-5 w-5"/>
                        </Button>
                    </form>
                </footer>
            </div>
        </div>

    )
}