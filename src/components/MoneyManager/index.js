import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const initialTotalStats = {
  totalBalance: 0,
  totalIncome: 0,
  totalExpenses: 0,
}

class MoneyManager extends Component {
  state = {
    totalStats: initialTotalStats,
    transactionDetails: {
      currTitle: '',
      currAmount: '',
      currTransactionType: 'Income',
    },
    transactionsList: [],
  }

  onTitleChange = event => {
    this.setState(prevState => ({
      transactionDetails: {
        ...prevState.transactionDetails,
        currTitle: event.target.value,
      },
    }))
  }

  onAmountChange = event => {
    this.setState(prevState => ({
      transactionDetails: {
        ...prevState.transactionDetails,
        currAmount: event.target.value,
      },
    }))
  }

  onTransactionTypeChange = event => {
    const typeValue = event.target.value
    const newTransactionType = typeValue === 'INCOME' ? 'Income' : 'Expenses'

    this.setState(prevState => ({
      transactionDetails: {
        ...prevState.transactionDetails,
        currTransactionType: newTransactionType,
      },
    }))
  }

  handleTransactionDelete = id => {
    const {transactionsList, totalStats} = this.state
    const {totalBalance, totalIncome, totalExpenses} = totalStats

    const deletingObj = transactionsList.find(each => each.id === id)

    const amountValue = Number(deletingObj.amount)

    let updatedBalance = totalBalance
    let updatedIncome = totalIncome
    let updatedExpenses = totalExpenses

    if (deletingObj.transactionType === 'Income') {
      updatedBalance -= amountValue
      updatedIncome -= amountValue
    } else if (deletingObj.transactionType === 'Expenses') {
      updatedBalance += amountValue
      updatedExpenses -= amountValue
    }

    const updatedTransactionsList = transactionsList.filter(
      each => each.id !== id,
    )

    this.setState({
      transactionsList: updatedTransactionsList,
      totalStats: {
        totalBalance: updatedBalance,
        totalIncome: updatedIncome,
        totalExpenses: updatedExpenses,
      },
    })
  }

  addNewTransaction = event => {
    event.preventDefault()
    const {transactionDetails, totalStats} = this.state
    const {currTitle, currAmount, currTransactionType} = transactionDetails
    const {totalBalance, totalIncome, totalExpenses} = totalStats
    const amountValue = Number(currAmount)

    if (!currAmount || Number.isNaN(amountValue) || amountValue <= 0) {
      this.setState(prevState => ({
        transactionDetails: {
          ...prevState.transactionDetails,
          currAmount: '',
        },
      }))
      alert('Please enter a valid number for the amount.')
      return
    }

    const missingFields = []
    if (currTitle === '') missingFields.push('title')
    if (currAmount === '') missingFields.push('amount')

    if (missingFields.length > 0) {
      alert(`Please fill in the ${missingFields.join(' and ')}.`)
      return
    }

    const newTransactionObj = {
      id: uuidv4(),
      title: currTitle,
      amount: currAmount,
      transactionType: currTransactionType,
    }

    let updatedBalance = totalBalance
    let updatedIncome = totalIncome
    let updatedExpenses = totalExpenses

    if (currTransactionType === 'Income') {
      updatedBalance = totalBalance + amountValue
      updatedIncome = totalIncome + amountValue
    } else if (currTransactionType === 'Expenses') {
      updatedBalance = totalBalance - amountValue
      updatedExpenses = totalExpenses + amountValue
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransactionObj],
      transactionDetails: {
        currTitle: '',
        currAmount: '',
        currTransactionType: 'Income',
      },
      totalStats: {
        totalBalance: updatedBalance,
        totalIncome: updatedIncome,
        totalExpenses: updatedExpenses,
      },
    }))
  }

  render() {
    const {totalStats, transactionDetails, transactionsList} = this.state
    const {currTitle, currAmount, currTransactionType} = transactionDetails

    return (
      <div className="main-bg">
        <main className="application">
          <section className="greetings-section">
            <h1 className="greeting-heading">Hi, Ashwin</h1>
            <p className="greeting-desc">
              Welcome back to your{' '}
              <span className="greeting-desc-highlight">Money Manager</span>
            </p>
          </section>

          <section className="money-stats-section">
            <MoneyDetails totalStats={totalStats} />
          </section>

          <section className="transactions-section">
            <div
              id="add-transaction-card"
              className="transactions-section-card"
            >
              <h1 className="transactions-card-heading">Add Transaction</h1>
              <form onSubmit={this.addNewTransaction}>
                <div className="input-box">
                  <label htmlFor="title">TITLE</label>
                  <input
                    id="title"
                    type="text"
                    onChange={this.onTitleChange}
                    value={currTitle}
                    placeholder="TITLE"
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="amount">AMOUNT</label>
                  <input
                    id="amount"
                    type="text"
                    onChange={this.onAmountChange}
                    value={currAmount}
                    placeholder="AMOUNT"
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="type">TYPE</label>
                  <select
                    value={
                      transactionTypeOptions.find(
                        option => option.displayText === currTransactionType,
                      ).optionId
                    }
                    onChange={this.onTransactionTypeChange}
                  >
                    {transactionTypeOptions.map(option => (
                      <option key={option.optionId} value={option.optionId}>
                        {option.displayText}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>

            <div
              id="transaction-history-card"
              className="transactions-section-card"
            >
              <h1 className="transactions-card-heading">History</h1>
              <div className="history-table-heading">
                <p className="table-title-heading">Title</p>
                <p className="table-amount-heading">Amount</p>
                <p className="table-type-heading">Type</p>
              </div>
              <ul className="history-table-list">
                {transactionsList.map(transObj => (
                  <TransactionItem
                    key={transObj.id}
                    transObj={transObj}
                    handleDelete={this.handleTransactionDelete}
                  />
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default MoneyManager
