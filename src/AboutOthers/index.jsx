import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createAccount } from './aboutOthersActions';

const AboutOthers = props => {
  const handleClickCreateAccount = () => {
    props.createAccount();
  };

  useEffect(() => {
    if (props.accountId) {
      window.location.href += `/${props.accountId}`;
    }
  });

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

const mapStateToProps = state => ({
  accountId: state.aboutOthersReducer.accountId
});

const mapDispatchToProps = { createAccount };

export default connect(mapStateToProps, mapDispatchToProps)(AboutOthers);
