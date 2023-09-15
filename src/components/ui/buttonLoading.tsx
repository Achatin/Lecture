import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FC } from "react"

interface ButtonLoadingProps {
  className: string | "",
}

const ButtonLoading: FC<ButtonLoadingProps> = ({children, className}) => {
  return (
    <Button disabled className={className}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  )
};

export default ButtonLoading