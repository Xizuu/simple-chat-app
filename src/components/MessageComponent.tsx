import {getCurrentDate} from "@/lib/utils.ts";

interface ChatMessageProps {
    content: string
    sender: string
    isMe: boolean
}

export default function MessageComponent({ content, sender, isMe }: ChatMessageProps) {

    return (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex-shrink-0 ${isMe ? "ml-2" : "mr-2"}`}>
                    <img
                        src="https://img.icons8.com/sci-fi/48/person-male.png"
                        alt={`${sender} avatar`}
                        width={40}
                        height={40}
                        className="rounded-full"
                        draggable={false}
                    />
                </div>

                <div>
                    <div
                        className={`p-3 rounded-lg ${
                            isMe
                                ? "bg-blue-500 text-white rounded-tr-none"
                                : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                        }`}
                    >
                        <span className={`block text-xs mb-1 font-medium ${isMe ? "text-blue-100" : "text-gray-500"}`}>
                            {isMe ? "You" : sender}
                        </span>
                        <p className="text-sm whitespace-pre-line break-words">
                            {content}
                        </p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${isMe ? "text-right" : "text-left"}`}>{getCurrentDate()}</div>
                </div>
            </div>
        </div>
    )
}
