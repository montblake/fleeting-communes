# Fleeting Communes
Chat-VideoChat-DirectMessaging app with Rooms
built using NodeJs, Node's ws library for websocket implementation, PeerJS for WebRTC peer-to-peer media sharing, React for UI.

Currently in a super basic functional state. Hoping to build out the ui to explore video conferencing possibilities. 

The name comes from commune/communion more than communicate. The goal a place to be together online for a variety of purposes from co-working to virtual live theatrical events.

Fleeting refers to (at least for now) the lack of any storage, either on the front or back ends. The focus of the development process has been to technically deal with multiple communication protocols (http, websocket, webrtc) in one app, to build out without using Socket.io, to take ideas I had seen rendered server-side and figure out a react ui implementation, including my own version of a rooms feature. At some point, the storage issue should be addressed.