import React from 'react';
import { useParams } from 'react-router-dom';

const AboutOthersAccount = () => {
  const { accountId } = useParams();
  return <>accountId: {accountId}</>;
};

export default AboutOthersAccount;
