import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson, getPeople } from './aboutOthersActions';

class AboutOthersAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: this.props.match.params.accountId
    };
    this.handleClickAddPerson = this.handleClickAddPerson.bind(this);
  }

  componentDidMount() {
    this.props.getPeople(this.state.accountId);
  }

  handleClickAddPerson() {
    this.props.addPerson(this.state.accountId);
  }

  render() {
    return (
      <>
        <div>Account ID: {this.state.accountId}</div>
        <button onClick={this.handleClickAddPerson}>Add person</button>
        {this.props.people.map(person => (
          <div>person.name</div>
        ))}
      </>
    );
  }
}

AboutOthersAccount.defaultProps = {
  people: []
};

const mapStateToProps = state => ({
  accountId: state.aboutOthersReducer.accountId,
  people: state.aboutOthersReducer.people
});

const mapDispatchToProps = { addPerson, getPeople };

export default connect(mapStateToProps, mapDispatchToProps)(AboutOthersAccount);
