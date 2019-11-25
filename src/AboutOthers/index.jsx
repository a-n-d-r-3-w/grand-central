import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createAccount } from './aboutOthersActions';

const AboutOthers = props => {
  const handleClickCreateAccount = () => {
    props.createAccount();
  };

  return (
    <>
      <h1>About Others</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickCreateAccount}
      >
        Create account
      </Button>
    </>
  );
};

const mapDispatchToProps = { createAccount };

export default connect(null, mapDispatchToProps)(AboutOthers);
