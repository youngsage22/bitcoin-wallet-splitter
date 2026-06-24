import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

interface Transaction {
  id: string
  timestamp: string
  recipients: string[]
  amounts: number[]
  status: string
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTransactions()
    const interval = setInterval(fetchTransactions, 5000) // Refresh every 5s
    return () => clearInterval(interval)
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE}/transactions/history?limit=20`)
      setTransactions(response.data.transactions)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 bg-green-900'
      case 'pending':
        return 'text-yellow-400 bg-yellow-900'
      case 'failed':
        return 'text-red-400 bg-red-900'
      default:
        return 'text-gray-400 bg-gray-900'
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg p-8 border border-purple-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Transactions</h2>
        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No transactions yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="pb-3 text-white font-semibold">Date</th>
                <th className="pb-3 text-white font-semibold">TX ID</th>
                <th className="pb-3 text-white font-semibold">Recipients</th>
                <th className="pb-3 text-white font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-700 hover:bg-slate-700 transition">
                  <td className="py-3">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="py-3 font-mono text-sm">{tx.id.slice(0, 8)}...</td>
                  <td className="py-3">{tx.recipients.length} wallets</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
