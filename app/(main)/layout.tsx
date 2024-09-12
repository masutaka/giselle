import { GiselleLogo } from "@/components/giselle-logo";
import { UserButton } from "@/services/accounts/components";
import type { ReactNode } from "react";
import { Nav } from "./nav";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="h-screen overflow-y-hidden bg-black-100 divide-y divide-black-80 flex flex-col">
			<header className="h-[60px] flex items-center px-[24px] justify-between">
				<div className="flex">
					<GiselleLogo className="w-[70px] h-auto fill-white mt-[4px] mr-[8px]" />
					<Nav />
				</div>
				<div>
					<UserButton />
				</div>
			</header>
			<main className="flex-1">{children}</main>
		</div>
	);
}
