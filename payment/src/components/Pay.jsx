import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import statement
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 400px;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const Button = styled.button`
  background-color: black;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 2000,
        });
        console.log(res.data);
        navigate("/success");
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <CenteredContainer>
      <Container>
        {stripeToken ? (<span>Processing... Please wait</span>) : (
          <StripeCheckout
            name="DAWN"
            billingAddress
            shippingAddress
            description="Your total is $20"
            amount={2000}
            token={onToken}
            stripeKey={KEY}
          >
            <Button>Pay Now</Button>
          </StripeCheckout>
        )}
      </Container>
    </CenteredContainer>
  );
};

export default Pay;
