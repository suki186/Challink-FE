import React from 'react';
import s from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import TabBar from '../tabBar/TabBar';

const Layout = () => {
  return (
    <div className={s.layoutContainer}>
      <main className={s.mainContent}>
        <Outlet />
      </main>
      <footer className={s.tabBarContent}>
        <TabBar />
      </footer>
    </div>
  );
};

export default Layout;
