import { useMemo } from "react";
import { ArtifactRender } from "./artifact/render";
import type { Artifact, GeneratedObject } from "./artifact/types";
import bg from "./bg.png";
import { WilliIcon } from "./components/icons/willi";
import { stepStatuses } from "./flow/types";
import { useGraph } from "./graph/context";
import { Header } from "./header";
import { ActionItem } from "./viewer/components/action-item";

export function Viewer() {
	const { state } = useGraph();
	const nodeIndexes = useMemo(
		() => Object.fromEntries(state.graph.nodes.map((node) => [node.id, node])),
		[state.graph.nodes],
	);
	const lastArtifact = useMemo(() => {
		const lastJob = state.flow?.jobs[state.flow.jobs.length - 1];
		const lastStep = lastJob?.steps[lastJob.steps.length - 1];
		if (
			lastStep === undefined ||
			lastStep.status === stepStatuses.queued ||
			lastStep.status === stepStatuses.running
		) {
			return null;
		}
		return {
			title: (lastStep.output as GeneratedObject).artifact.title ?? "",
			content: (lastStep.output as GeneratedObject).artifact.content ?? "",
		};
	}, [state.flow]);
	return (
		<div
			className="w-full h-screen bg-black-100 flex flex-col"
			style={{
				backgroundImage: `url(${bg.src})`,
				backgroundPositionX: "center",
				backgroundPositionY: "center",
				backgroundSize: "cover",
			}}
		>
			<Header />
			<div className="flex-1 flex flex-col items-center divide-y mx-[20px] overflow-hidden">
				<div className="flex items-center h-[40px]">
					{state.flow == null ? (
						<div className="text-black-70 font-[800] text-[18px]">No exist</div>
					) : (
						<div className="text-black-70 font-[800] text-[18px]">
							{/* {state.flow.finalNodeId} */}
						</div>
					)}
				</div>
				{state.flow == null ? (
					<div className="flex-1 w-full flex items-center justify-center">
						<div className="flex flex-col items-center gap-[8px]">
							<WilliIcon className="fill-black-70 w-[32px] h-[32px]" />
							<p className="font-[800] text-black-30">
								This has not yet been executed
							</p>
							<p className="text-black-70 text-[12px] text-center leading-5">
								You have not yet executed the node. <br />
								Let's execute the entire thing and create the final output.
							</p>
						</div>
					</div>
				) : (
					<div className="flex-1 flex w-full gap-[16px] pt-[16px] overflow-hidden">
						<div className="w-[200px]">
							<div className="flex flex-col gap-[8px]">
								{state.flow.jobs.map((actionLayer, index) => (
									<div key={actionLayer.id}>
										<p className="text-[12px] text-black-30">
											Step {index + 1}
										</p>
										<div className="flex flex-col gap-[4px]">
											{actionLayer.steps.map((step) => (
												<ActionItem
													key={step.id}
													step={step}
													node={nodeIndexes[step.nodeId]}
												/>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="overflow-y-scroll">
							{lastArtifact && (
								<ArtifactRender
									title={lastArtifact.title}
									content={lastArtifact.content}
								/>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
