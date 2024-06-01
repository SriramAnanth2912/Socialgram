import { Button } from "@/components/ui/button"
const signupForm = () => {
  return (
    <div className="flex items-center justify-center">
      <Button onClick={()=> console.log('clicked')}>Click me</Button>
    </div>
  )
}

export default signupForm