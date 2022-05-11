import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomCreator from './components/RoomCreator';
import Room from './components/Room';
import Footer from './components/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<App />
		<Routes>
			<Route path="/" element={<RoomCreator />} />
			<Route path=":roomID" element={<Room />} />
		</Routes>
		<Footer />
	</BrowserRouter>
);









