/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Projects } from './pages/Projects';
import { Assets } from './pages/Assets';
import { Ideas } from './pages/Ideas';
import { Resources } from './pages/Resources';
import { Timeline } from './pages/Timeline';
import { Partners } from './pages/Partners';
import { Finance } from './pages/Finance';
import { Copilot } from './pages/Copilot';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          <Route path="assets" element={<Assets />} />
          <Route path="ideas" element={<Ideas />} />
          <Route path="resources" element={<Resources />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="partners" element={<Partners />} />
          <Route path="finance" element={<Finance />} />
          <Route path="copilot" element={<Copilot />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
