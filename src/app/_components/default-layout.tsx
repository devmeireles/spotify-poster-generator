"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { UserProvider } from '../context/UserContext'

interface DefaultLayoutProps {
	children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
	return (
		<SessionProvider>
			<UserProvider>
				<div>{children}</div>
			</UserProvider>
		</SessionProvider>
	)
}

export default DefaultLayout