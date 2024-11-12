import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { Label } from "../../components/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/select";
import {
	Section,
	SectionFormField,
	SectionHeader,
} from "../components/section";

const mockRepositories = [
	{
		id: "r-1",
		name: "giselles-ai/giselle",
	},
	{
		id: "r-2",
		name: "toyamarinyon/langfuse-ai-sdk",
	},
	{
		id: "r-3",
		name: "toyamarinyon/coral",
	},
];

const mockEvents = [
	{
		id: "e-1",
		name: "Comment on Issue",
	},
	{
		id: "e-2",
		name: "Issue created",
	},
];

const mockNodes = [
	{
		id: "f-1",
		name: "Untitled node - 1 → Untitle node - 6",
	},
	{
		id: "f-2",
		name: "Untitled node - 3 → Untitle node - 4",
	},
];
const mockNextActions = [
	{
		id: "r-1",
		name: "Comment on trigger issue",
	},
	{
		id: "r-2",
		name: "Create a pull request",
	},
];
interface GitHubIntegrationProps {
	setTabValue: (value: string) => void;
}
export function GitHubIntegration(props: GitHubIntegrationProps) {
	return (
		<div className="grid gap-[24px] px-[24px] py-[24px]">
			<header className="flex justify-between">
				<p
					className="text-[22px] font-rosart text-black--30"
					style={{ textShadow: "0px 0px 20px hsla(207, 100%, 48%, 1)" }}
				>
					GitHub Integration
				</p>
				<button type="button">
					<XIcon
						className="w-[16px] h-[16px]"
						onClick={() => props.setTabValue("")}
					/>
				</button>
			</header>
			<div className="grid gap-[16px]">
				<Section>
					<SectionHeader title="Repository" />
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Choose value" />
						</SelectTrigger>
						<SelectContent>
							{mockRepositories.map((repository) => (
								<SelectItem value={repository.id} key={repository.id}>
									{repository.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Section>
				<Section>
					<SectionHeader title="Trigger" />
					<SectionFormField>
						<Label htmlFor="event">Event</Label>
						<Select name="event">
							<SelectTrigger>
								<SelectValue placeholder="Choose value" />
							</SelectTrigger>
							<SelectContent>
								{mockEvents.map((event) => (
									<SelectItem value={event.id} key={event.id}>
										{event.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</SectionFormField>
					<SectionFormField>
						<Label htmlFor="command">Call sign</Label>
						<Input
							type="text"
							name="command"
							placeholder="Enter call sign"
							className="w-full"
						/>
						<span className="text-black-70 text-[12px]">
							You can call this agent by commenting{" "}
							<span className="py-[0px] px-[4px] text-black--30 bg-black-70 rounded-[2px]">
								/giselle report-agent
							</span>{" "}
							in the issue route06inc/giselle.
						</span>
					</SectionFormField>
				</Section>
				<Section>
					<SectionHeader title="Action" />
					<SectionFormField>
						<Label htmlFor="event">Run flow</Label>
						<Select name="event">
							<SelectTrigger>
								<SelectValue placeholder="Choose value" />
							</SelectTrigger>
							<SelectContent>
								{mockNodes.map((node) => (
									<SelectItem value={node.id} key={node.id}>
										{node.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</SectionFormField>
					<SectionFormField>
						<Label htmlFor="event">Then</Label>
						<Select name="event">
							<SelectTrigger>
								<SelectValue placeholder="Choose value" />
							</SelectTrigger>
							<SelectContent>
								{mockNextActions.map((nextAction) => (
									<SelectItem value={nextAction.id} key={nextAction.id}>
										{nextAction.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</SectionFormField>
				</Section>
			</div>
		</div>
	);
}
