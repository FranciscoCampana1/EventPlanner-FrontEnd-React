import React from "react";
import {  Routes, Route } from "react-router-dom";
import { Admin, Home, Events,EventCreate, Menu, Diary ,Register,UserProfile,PageNotFound} from './containers'


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event-create" element={<EventCreate />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" exact={true} element={<PageNotFound />} />
    </Routes>
  );
}
