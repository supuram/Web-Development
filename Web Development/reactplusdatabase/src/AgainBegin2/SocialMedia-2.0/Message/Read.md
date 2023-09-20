1)If i have a frontend in react and backend in Node + express, can i send message from one user to another using XMPP on ejabberd server ?
Ans)Yes, you can use XMPP on an Ejabberd server to send messages from one user to another with a frontend in React and a backend in Node + Express¹²³⁴.

Here's a basic overview of how it could work:

1. **Ejabberd Server**: This is your XMPP server where all the messages will be sent and received. You can spin up an Ejabberd instance using Docker¹.
2. **Node.js**: You can create an XMPP client in Node.js to connect to the Ejabberd server¹. There are libraries available like 'xmpp.js' which can help you interact with your Ejabberd server².
3. **React**: In your React application, you can use the same 'xmpp.js' library or other libraries like 'react-native-xmpp' for a React Native application⁴ to send and receive messages through the Ejabberd server.

Remember, both Node.js and React clients will connect to the Ejabberd server independently. The Node.js client might act as a middleware for any additional processing or business logic before the message is sent from the React application to the Ejabberd server or vice versa.

Please note that this is a high-level overview and actual implementation might require additional considerations based on your specific use case.

Source: Conversation with Bing, 19/9/2023
(1) Extensible Messaging and Presence Protocol - XMPP with Node ... - Section. https://www.section.io/engineering-education/extensible-messaging-and-presence-protocol-with-nodejs-and-docker/.
(2) ejabberd - node-xmpp-server vs node-xmpp-client - Stack Overflow. https://stackoverflow.com/questions/52277848/node-xmpp-server-vs-node-xmpp-client.
(3) artandor/react-xmpp-playground - GitHub. https://github.com/artandor/react-xmpp-playground.
(4) Failing to Connect to Ejabberd Server using react-native-xmpp. https://stackoverflow.com/questions/63520564/failing-to-connect-to-ejabberd-server-using-react-native-xmpp.
(5) undefined. https://github.com/xmppjs/xmpp.js.
(6) undefined. http://strophe.im/strophejs/.
(7) undefined. https://github.com/robbiehanson/XMPPFramework.
(8) undefined. https://github.com/igniterealtime/Smack.