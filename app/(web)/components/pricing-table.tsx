interface PriceRow {
  weight: string
  price: string
}

interface PricingTableProps {
  title: string
  description: string
  prices: PriceRow[]
}

export function PricingTable({ title, description, prices }: PricingTableProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Weight</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {prices.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm">{row.weight}</td>
                <td className="px-4 py-2 text-sm">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

