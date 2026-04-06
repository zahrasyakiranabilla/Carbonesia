interface UnderlineProps {
  children: React.ReactNode
  className?: string
}

export function Underline({ children, className }: UnderlineProps) {
  return (
    <span
      className={`bg-gradient-to-r from-transparent to-[#213E88] bg-[length:100%_1.5px] bg-no-repeat bg-bottom pb-1 ml-2 ${className ?? ''}`}
    >
      {children}
    </span>
  )
}