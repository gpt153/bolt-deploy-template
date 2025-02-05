import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { useToast } from "@/components/ui/use-toast";

async function query(data: { question: string }) {
  const response = await fetch(
    "http://localhost:3000/api/v1/prediction/421dabab-9b52-40ee-8497-07c1be1f837b",
    {
      headers: {
        Authorization: "Bearer Hlej74TiWv5PCl9KsCN-mwEHOizBJDeKZpBoKJEXWzo",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response.json();
}

interface Message {
  content: string;
  isUser: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async (message: string) => {
    try {
      setIsLoading(true);
      setMessages((prev) => [...prev, { content: message, isUser: true }]);

      const response = await query({ question: message });
      
      if (response.error) {
        throw new Error(response.error);
      }

      setMessages((prev) => [
        ...prev,
        { content: response.text || "No response received", isUser: false },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.content}
            isUser={message.isUser}
          />
        ))}
      </div>
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
};

export default Index;
