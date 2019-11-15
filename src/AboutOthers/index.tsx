import React from 'react';
import Button from '@material-ui/core/Button';
import shortid from 'shortid';
import {connect} from 'react-redux';
import {createAccount} from './aboutOthersActions';
import {Account} from './type';

function AboutOthers(props: { accounts: Array<Account>, createAccount: (accountId: string) => {} }) {
  const handleClickCreateAccount = () => {
    const accountId = shortid.generate();
    props.createAccount(accountId);
  };

  return (
    <>
      <h1>About Others</h1>
      <Button variant="contained" color="primary" onClick={handleClickCreateAccount}>
        Create account
      </Button>
      {props.accounts.map((account: Account) => (<div>{account.accountId}</div>))}
    </>
  );
}

AboutOthers.defaultProps = {
  accounts: []
};

const mapStateToProps = (state: { aboutOthersReducer: { accounts: Array<Account> } }) => ({
  accounts: state.aboutOthersReducer.accounts
});

const mapDispatchToProps = {createAccount};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutOthers);