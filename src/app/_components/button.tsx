import React from 'react'

interface ButtonProps {
  handleClick: () => void,
  children: React.ReactNode
  active: boolean
}

const Button: React.FC<ButtonProps> = ({ handleClick, active, children }) => {
  return (
    <a type="button"
      className={
        `border-2 border-gray-950 text-center px-4 py-2 flex-1
          ${active ? 'text-white bg-gray-950' : 'text-gray-950 bg-white'}
      `}
      onClick={handleClick}>{children}</a>
  )
}

export default Button