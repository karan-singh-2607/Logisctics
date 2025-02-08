import { User, Pencil } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ViewProfile() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-gray-600" />
          </div>
          <span className="text-gray-700 font-medium">Change photo</span>
        </div>
        <Button variant="ghost" size="icon">
          <Pencil className="h-5 w-5" />
        </Button>
      </div>

      <Input placeholder="First Name (Georgian)" defaultValue="თეონა" />
      <Input placeholder="First Name (Latin)" defaultValue="teona" />
      <Input placeholder="Last Name (Georgian)" defaultValue="კვესაძე" />
      <Input placeholder="Last Name (Latin)" defaultValue="Kvesadze" />
      <Input placeholder="E-mail" defaultValue="teona.kvesadze@gmail.com" />
      <Input placeholder="Cell Phone" defaultValue="591991355" />
      <Input placeholder="ID Number 11 digit" defaultValue="60001106104" />

      <Button variant="outline" className="w-full">Delete User</Button>
      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">Save</Button>
    </div>
  )
}

