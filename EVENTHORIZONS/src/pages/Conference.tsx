import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "@/contexts/EventContext";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, VideoOff, Mic, MicOff, Users, MessageCircle, Share2,
  ThumbsUp, Heart, Laugh, Hand, PartyPopper, Coffee
} from "lucide-react";

const Conference = () => {
  const { id } = useParams();
  const { getEventById } = useEvents();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [showReactions, setShowReactions] = useState(false);
  const [currentReactions, setCurrentReactions] = useState([]);
  
  const event = getEventById(id || "");
  
  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  useEffect(() => {
    if (!event) {
      toast({
        title: "Event not found",
        description: "The event you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate("/events");
      return;
    }
    
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to join this conference.",
        variant: "destructive"
      });
      navigate(`/events/${id}`);
      return;
    }
    
    // In a real app, we would connect to a video/audio service here
    // For now, we'll simulate joining with mock data
    
    // Add current user to participants
    setParticipants(prev => [
      ...prev, 
      { id: currentUser.id, name: currentUser.name }
    ]);
    
    // Simulate other participants joining (for demo purposes)
    const mockParticipants = [
      { id: "mock1", name: "Jane Smith" },
      { id: "mock2", name: "John Doe" }
    ];
    
    const timer = setTimeout(() => {
      setParticipants(prev => [...prev, ...mockParticipants]);
      toast({
        title: "Participants joined",
        description: "Other participants have joined the conference."
      });
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      // In a real app, we would disconnect from the video/audio service here
    };
  }, [currentUser, event, id, navigate, toast]);
  
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast({
      title: isVideoEnabled ? "Video disabled" : "Video enabled",
    });
  };
  
  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast({
      title: isAudioEnabled ? "Microphone muted" : "Microphone unmuted",
    });
  };
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  const toggleReactions = () => {
    setShowReactions(!showReactions);
  };
  
  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const newMessage = {
      sender: currentUser?.name || "Anonymous",
      content: messageInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageInput("");
  };
  
  const shareConference = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Conference link copied to clipboard"
    });
  };
  
  const sendReaction = (reactionType) => {
    // Create a new reaction with unique ID and type
    const newReaction = {
      id: Date.now(),
      type: reactionType,
      user: currentUser?.name || "Anonymous",
      timestamp: new Date()
    };
    
    // Add to reactions list
    setCurrentReactions(prev => [...prev, newReaction]);
    
    // Announce reaction in chat
    const reactionMessage = {
      sender: "System",
      content: `${currentUser?.name || "Anonymous"} reacted with ${reactionType}`,
      timestamp: new Date(),
      isSystemMessage: true
    };
    
    setMessages(prev => [...prev, reactionMessage]);
    
    // Clear reaction after animation
    setTimeout(() => {
      setCurrentReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 3000);
    
    // Hide reaction panel after selection
    setShowReactions(false);
  };
  
  // Reaction components mapping
  const reactionIcons = {
    "👍": <ThumbsUp size={24} className="text-blue-500" />,
    "❤️": <Heart size={24} className="text-red-500" />,
    "😂": <Laugh size={24} className="text-yellow-500" />,
    "👏": <Hand size={24} className="text-green-500" />,
    "🎉": <PartyPopper size={24} className="text-purple-500" />,
    "☕": <Coffee size={24} className="text-amber-700" />
  };
  
  if (!event || !currentUser) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container py-4 max-w-7xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">{event.title}</h1>
          <p className="text-muted-foreground">Hosted by {event.organizer?.name}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main conference area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Video grid */}
            <div className="bg-black rounded-lg aspect-video relative overflow-hidden">
              {/* Main video area */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isVideoEnabled ? (
                  <div className="text-white">
                    <p className="text-center">Video feed active</p>
                    <p className="text-center text-sm text-muted-foreground">(Simulated for demo)</p>
                  </div>
                ) : (
                  <div className="text-white flex flex-col items-center">
                    <VideoOff size={48} />
                    <p>Video disabled</p>
                  </div>
                )}
              </div>
              
              {/* Reactions overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {currentReactions.map(reaction => {
                  // Calculate random position for the reaction
                  const style = {
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80}%`,
                    position: 'absolute',
                    animation: 'float-up 3s ease-out forwards'
                  };
                  
                  return (
                    <div key={reaction.id} style={style as React.CSSProperties} className="transform transition-all">
                      <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full p-1">
                        {reactionIcons[reaction.type]}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Participant thumbnails */}
              <div className="absolute right-2 top-2 flex flex-col space-y-2">
                {participants.slice(1, 4).map(participant => (
                  <div key={participant.id} className="w-32 h-24 bg-gray-800 rounded overflow-hidden">
                    <div className="flex items-center justify-center h-full text-white text-xs">
                      {participant.name}
                    </div>
                  </div>
                ))}
                
                {participants.length > 4 && (
                  <div className="w-32 h-24 bg-gray-800 rounded overflow-hidden">
                    <div className="flex items-center justify-center h-full text-white text-xs">
                      +{participants.length - 4} more
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 relative">
              <Button 
                variant={isAudioEnabled ? "default" : "destructive"} 
                size="icon" 
                onClick={toggleAudio}
                title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
              >
                {isAudioEnabled ? <Mic /> : <MicOff />}
              </Button>
              
              <Button 
                variant={isVideoEnabled ? "default" : "destructive"} 
                size="icon" 
                onClick={toggleVideo}
                title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
              >
                {isVideoEnabled ? <Video /> : <VideoOff />}
              </Button>
              
              <Button 
                variant={showReactions ? "secondary" : "outline"}
                size="icon" 
                onClick={toggleReactions}
                title="Show reactions"
              >
                <div className="flex space-x-0.5">
                  <ThumbsUp className="h-4 w-4" />
                </div>
              </Button>
              
              <Button 
                variant={isChatOpen ? "secondary" : "outline"}
                size="icon" 
                onClick={toggleChat}
                title="Open chat"
              >
                <MessageCircle />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={shareConference}
                title="Share conference link"
              >
                <Share2 />
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={() => navigate(`/events/${id}`)}
              >
                Leave Conference
              </Button>
              
              {/* Reactions panel */}
              {showReactions && (
                <div className="absolute top-0 transform -translate-y-full bg-background shadow-lg rounded-lg p-2 border">
                  <div className="flex space-x-2">
                    {Object.entries(reactionIcons).map(([emoji, icon]) => (
                      <Button 
                        key={emoji} 
                        variant="ghost" 
                        size="icon"
                        onClick={() => sendReaction(emoji)}
                        className="hover:bg-muted"
                        title={`Send ${emoji} reaction`}
                      >
                        {icon}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Participants list */}
            <Card className="p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center">
                  <Users className="mr-2 h-4 w-4" /> Participants ({participants.length})
                </h3>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {participants.map(participant => (
                  <div key={participant.id} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      {participant.name.charAt(0)}
                    </div>
                    <span className="ml-2">{participant.name}</span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Chat */}
            <Card className={`p-4 transition-all ${isChatOpen ? 'block' : 'hidden lg:block'}`}>
              <h3 className="font-medium mb-2">Chat</h3>
              
              <div className="h-80 overflow-y-auto mb-2 space-y-2 pr-1">
                {messages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center">No messages yet</p>
                ) : (
                  messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`${message.isSystemMessage ? 'bg-muted/50 italic' : 'bg-muted'} p-2 rounded-lg`}
                    >
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{message.sender}</span>
                        <span className="text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={sendMessage} className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <Button type="submit" className="rounded-l-none">Send</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* CSS for floating reactions animation */}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          10% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </MainLayout>
  );
};

export default Conference;