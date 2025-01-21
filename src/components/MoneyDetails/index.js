import './index.css'

const cardObjsList = [
  {
    statName: 'Balance',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
  },
  {
    statName: 'Income',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
  },
  {
    statName: 'Expenses',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
  },
]

const MoneyStatCard = props => {
  const {cardObj, value} = props
  const {imgUrl, statName} = cardObj

  return (
    <div className={`money-stat-card ${statName.toLowerCase()}`}>
      <img className="stat-icon" src={imgUrl} alt={statName.toLowerCase()} />
      <div className="stat-box">
        <p className="stat-name">Your {statName}</p>
        <p data-testid={`${statName.toLowerCase()}Amount`} className="amount">
          Rs {value}
        </p>
      </div>
    </div>
  )
}

const MoneyDetails = props => {
  const {totalStats} = props
  const {totalBalance, totalIncome, totalExpenses} = totalStats

  return (
    <div className="money-stats-list">
      <MoneyStatCard cardObj={cardObjsList[0]} value={totalBalance} />
      <MoneyStatCard cardObj={cardObjsList[1]} value={totalIncome} />
      <MoneyStatCard cardObj={cardObjsList[2]} value={totalExpenses} />
    </div>
  )
}

export default MoneyDetails
