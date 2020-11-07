import React from 'react';
import Container from '@material-ui/core/Container';

import Pizzas from '../components/Pizzas/Pizzas';

const PizzasPage = () => {

  return <Container children={<Pizzas />} />;
};

PizzasPage.propTypes = {};

export default PizzasPage;
