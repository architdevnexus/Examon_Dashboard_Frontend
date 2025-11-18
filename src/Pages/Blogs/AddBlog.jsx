import React from 'react';
import Data from "../../DataStore/DataStore.json";
import MessageCard from '../../Component/Cards/MessageCard';

function Messages() {
  const messageData = [...Data.messages]; // clone to avoid mutating original

  // Sort by timestamp descending (latest first)
  messageData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-sans">
      {/* Page Header */}
      <header className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-indigo-800">📨 Messages</h1>
        <p className="text-gray-500 text-sm">
          Total: <span className="font-semibold">{messageData.length}</span>
        </p>
      </header>

      {/* Messages Grid/List */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {messageData.length > 0 ? (
          messageData.map((message) => (
            <MessageCard key={message.message_id} message={message} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No messages found.
          </p>
        )}
      </section>
    </div>
  );
}

export default Messages;
