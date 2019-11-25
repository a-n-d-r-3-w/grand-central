import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createAccount } from './aboutOthersActions';

function AboutOthers(props) {
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
      {props.accounts.map(account => (
        <div key={account.accountId}>{account.accountId}</div>
      ))}
    </>
  );
}

AboutOthers.defaultProps = {
  accounts: []
};

const mapStateToProps = state => ({
  accounts: state.aboutOthersReducer.accounts
});

const mapDispatchToProps = { createAccount };

export default connect(mapStateToProps, mapDispatchToProps)(AboutOthers);
