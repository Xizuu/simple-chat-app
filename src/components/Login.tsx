import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {useState} from "react";

interface LoginProps {
    onLogin: (token: string, username: string) => void
}

export default function Login({onLogin}: LoginProps) {
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean | false>(false);

    const handleSubmit = async () => {
        setLoading(true)

        const res = await fetch('https://zx4w29z4-5000.asse.devtunnels.ms/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username})
        })

        setLoading(false);

        if (!res.ok) {
            alert('Login failed')
            return
        }
        const data = await res.json();
        onLogin(data.token, username);
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-50 to-blue-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 flex flex-col items-center">
                    <div className="w-16 h-16 mb-4 relative">
                        <img
                            src="/icon.png"
                            alt="ChatApp Logo"
                            width={96}
                            height={96}
                            className="rounded-full"
                        />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">ChatApp</CardTitle>
                    <CardDescription className="text-center">Masuk ke akun Anda untuk mulai chat</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Tunggu sebentar..." : "Masuk"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
