import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/header/Header';
import IngredientsScreen from './components/ingredients/IngredientsScreen'

function App() {
  return (
    <Router>
        <Header />
        <Route exact path="/" component={IngredientsScreen} />
    </Router>
  );
}

export default App;
