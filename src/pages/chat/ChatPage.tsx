import { Topbar } from '@/components/Topbar';
import { useChatStore } from '@/stores/useChatStore';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { UserList } from './components/UserList';
import { ChatHeader } from './components/ChatHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MessageInput } from './components/MessageInput';
import { formatTime } from '@/utils';

export const ChatPage = () => {
  const { messages, selectedUser, fetchMessages, fetchUsers } = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar />
      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UserList />
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />
              <ScrollArea className="h-[calc(100vh-340px)] ">
                <div className="p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-[calc(100vh-480px)] w-full">
                      <div className="flex flex-col justify-center items-center">
                        <div className="text-white-500 font-medium">
                          This chat is empty
                        </div>
                        <div className="text-sm text-zinc-300">
                          Send something to this user
                        </div>
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex items-center gap-3 ${
                          message.senderId === user?.id
                            ? 'flex-row-reverse'
                            : ''
                        }`}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={
                              message.senderId === user?.id
                                ? user.imageUrl
                                : selectedUser.imageUrl
                            }
                          />
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 max-w-[70%] ${
                            message.senderId === user?.id
                              ? 'bg-green-600/80'
                              : 'bg-zinc-800'
                          }`}
                        >
                          <p className="text-sm text-white">
                            {message.content}
                          </p>
                          <span className="text-xs text-zinc-300 mt-1 block">
                            {formatTime(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
};

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img
      src="/logo/beatworld-logo.png"
      alt="Beatworld"
      className="size-16 animate-pulse"
    />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">
        No conversation selected
      </h3>
      <p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
);
