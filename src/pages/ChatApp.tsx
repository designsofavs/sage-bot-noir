import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Plus, 
  Send, 
  FileText, 
  Image as ImageIcon, 
  Menu,
  User,
  MessageSquare,
  X,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: {
    type: "document" | "image";
    name: string;
    url: string;
  }[];
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

const ChatApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentChatId, setCurrentChatId] = useState("1");
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "New Conversation",
      timestamp: "Just now",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello! I'm your Personal AI Assistant. How can I help you today?",
          timestamp: new Date()
        }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("User Profile");
  const [userEmail, setUserEmail] = useState("user@example.com");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const currentChat = chats.find(chat => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, userMessage],
            title: chat.messages.length === 1 ? inputValue.slice(0, 30) : chat.title
          }
        : chat
    ));
    
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand your query. This is a demo response. In a full implementation, I would process your request and provide a detailed, helpful answer.",
        timestamp: new Date()
      };
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      ));
    }, 1000);
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Conversation",
      timestamp: "Just now",
      messages: [
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Hello! I'm your Personal AI Assistant. How can I help you today?",
          timestamp: new Date()
        }
      ]
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const handleLoadChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (chats.length === 1) {
      toast({
        title: "Cannot delete",
        description: "You must have at least one chat",
        variant: "destructive"
      });
      return;
    }
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(chats[0].id === chatId ? chats[1].id : chats[0].id);
    }
    toast({
      title: "Chat deleted",
      description: "The conversation has been removed"
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Document added",
        description: `${file.name} has been attached`
      });
      // In a real implementation, you would upload the file and add it to the message
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Image added",
        description: `${file.name} has been attached`
      });
      // In a real implementation, you would upload the file and add it to the message
    }
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully"
    });
    setProfileOpen(false);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={handleFileUpload}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Sidebar */}
      <aside 
        className={cn(
          "border-r border-sidebar-border bg-sidebar transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        )}
      >
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-6 h-6 text-sidebar-primary" />
            <span className="font-bold text-sidebar-foreground">PersonalAI</span>
          </div>
          
          <Button 
            className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
            onClick={handleNewChat}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-sidebar-foreground mb-2">Recent Chats</h3>
              <div className="space-y-1">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleLoadChat(chat.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-colors group relative",
                      currentChatId === chat.id 
                        ? "bg-sidebar-accent/70 text-sidebar-foreground" 
                        : "hover:bg-sidebar-accent text-sidebar-foreground"
                    )}
                  >
                    <div className="flex items-start gap-2 pr-8">
                      <MessageSquare className="w-4 h-4 mt-0.5 text-sidebar-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{chat.title}</p>
                        <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <button 
            onClick={() => setProfileOpen(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-sidebar-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-sidebar-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">Manage account</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border/50 p-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-muted"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">Personal AI Assistant</h1>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border/50 p-4 bg-card">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything..."
                  className="pr-24 h-12 bg-input border-border/50 focus:border-primary"
                />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 hover:bg-muted"
                    title="Add document"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 hover:bg-muted"
                    title="Add image"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSend}
                className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </main>

      {/* Profile Dialog */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Account</DialogTitle>
            <DialogDescription>
              Update your profile information here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setProfileOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Message bubble component with auto-hide timestamp
const MessageBubble = ({ message }: { message: Message }) => {
  const [showTime, setShowTime] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTime(false);
    }, 3000); // Auto-hide after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "flex gap-4",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {message.role === "assistant" && (
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-primary" />
        </div>
      )}
      
      <div
        className={cn(
          "rounded-lg p-4 max-w-[80%]",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border/50"
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p 
          className={cn(
            "text-xs mt-2 opacity-70 transition-opacity duration-300",
            !showTime && "opacity-0"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>

      {message.role === "user" && (
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-accent" />
        </div>
      )}
    </div>
  );
};

export default ChatApp;
