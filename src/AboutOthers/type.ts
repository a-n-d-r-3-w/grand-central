type Person = {
  personId: string
};

export type Account = {
  accountId: string,
  people: Array<Person>
};

export type State = {
  accounts: Array<Account>
}