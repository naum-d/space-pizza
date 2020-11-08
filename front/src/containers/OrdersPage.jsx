import React from 'react';
import { Container } from '@material-ui/core';
import Order from '../components/Orders/Order';

const OrdersPage = () => {

  return <Container children={<Order />} />;
};

OrdersPage.propTypes = {};

export default OrdersPage;
