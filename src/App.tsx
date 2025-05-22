import { useEffect, useState } from 'react';
import Login from '@/components/Login';
import ChatRoom from '@/components/ChatRoom';

function App() {
    const [token, setToken] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [room] = useState<string>('room1');

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('username');

        if (savedToken && savedUsername) {
            setToken(savedToken);
            setUsername(savedUsername);
        }
    }, []);

    const handleLogin = (tok: string, user: string) => {
        localStorage.setItem('token', tok);
        localStorage.setItem('username', user);
        setToken(tok);
        setUsername(user);
    };

    if (!token || !username) {
        return (
            <main className="w-screen h-screen">
                <Login onLogin={handleLogin} />
            </main>
        )
    }

    return (
        <main className="w-screen h-screen">
            <ChatRoom token={token} username={username} room={room} />
        </main>
    )
}

export default App;
