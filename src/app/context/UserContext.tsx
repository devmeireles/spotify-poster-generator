'use client'

import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";
import slugfy from "~/utils/slugfy";

export interface IUserContext {
	username: string | undefined;
	isAuth: boolean;
}

const defaultState: IUserContext = {
	username: undefined,
	isAuth: false,
}

export const UserContext = createContext<IUserContext>(defaultState)

export const useUserContext = (): IUserContext => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a LineupProvider");
	}
	return context;
};

type Props = {
	children: React.ReactNode;
};

export const UserProvider = (props: Props) => {
	const { data } = useSession();

	const username = data?.user.name ?? '';

	const contextValues: IUserContext = {
		username: slugfy(username),
		isAuth: data ? true : false
	};

	return <UserContext.Provider value={contextValues}>{props.children}</UserContext.Provider>

}