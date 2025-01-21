import './index.css'

const TransactionItem = props => {
  const {transObj, handleDelete} = props
  const {id, title, amount, transactionType} = transObj
  const onDelete = () => {
    handleDelete(id)
  }
  const capitalise = text => text.charAt(0).toUpperCase() + text.slice(1)

  return (
    <li className="transaction-item">
      <p className="title-entry">{capitalise(title)}</p>
      <p className="amount-entry">Rs {amount}</p>
      <p className="transaction-type-entry">{transactionType}</p>
      <button
        onClick={onDelete}
        data-testid="delete"
        type="button"
        className="delete-btn"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
