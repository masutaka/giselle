import {
	addAgentNode,
	addNode,
	useBlueprint,
	useBlueprintMutation,
} from "@/app/agents/blueprints";
import {
	type ExcludeAgentNodeClassName,
	type Port,
	findNodeClass,
	useNodeClasses,
} from "@/app/node-classes";
import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import invariant from "tiny-invariant";

type AddNodeArgs =
	| {
			nodeClassName: ExcludeAgentNodeClassName;
			position: { x: number; y: number };
			relevantAgent?: never;
	  }
	| {
			nodeClassName: "agent";
			position: { x: number; y: number };
			relevantAgent: {
				agentId: number;
				agentName: string;
				blueprintId: number;
				inputPorts: Port[];
			};
	  };
export const useAddNodeAction = () => {
	const reactFlowInstance = useReactFlow();
	const blueprint = useBlueprint();
	const nodeClasses = useNodeClasses();
	const { mutateBlueprint } = useBlueprintMutation();
	const addNodeAction = useCallback(
		async ({ nodeClassName, position, relevantAgent }: AddNodeArgs) => {
			invariant(reactFlowInstance != null, "reactFlowInstance is null");
			// reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
			// and you don't need to subtract the reactFlowBounds.left/top anymore
			// details: https://reactflow.dev/whats-new/2023-11-10
			const flowPosition = reactFlowInstance.screenToFlowPosition({
				x: position.x,
				y: position.y,
			});
			const nodeClass = findNodeClass(nodeClasses, nodeClassName);
			const nodeId = createId();
			if (nodeClassName === "agent") {
				mutateBlueprint({
					optimisticAction: {
						type: "addNode",
						node: {
							id: nodeId,
							isCreating: true,
							position: {
								x: flowPosition.x,
								y: flowPosition.y,
							},
							className: nodeClassName,
							properties: [
								...(nodeClass.properties ?? []),
								{
									name: "relevantAgent",
									value: relevantAgent.agentName,
								},
							],
							propertyPortMap: nodeClass.propertyPortMap ?? {},
							inputPorts: [
								...(nodeClass?.inputPorts ?? []),
								...relevantAgent.inputPorts,
							].map(({ type, label, key }, index) => ({
								id: createId(),
								nodeId: nodeId,
								type: type,
								name: label ?? "",
								direction: "input",
								order: index,
								portsBlueprintsId: 0,
								nodeClassKey: key,
							})),
							outputPorts: (nodeClass.outputPorts ?? []).map(
								({ type, label, key }, index) => ({
									id: createId(),
									nodeId: nodeId,
									type: type,
									name: label ?? "",
									direction: "output",
									order: index,
									portsBlueprintsId: 0,
									nodeClassKey: key,
								}),
							),
						},
					},
					mutation: addAgentNode({
						blueprintId: blueprint.id,
						node: {
							className: nodeClassName,
							position: { x: flowPosition.x, y: flowPosition.y },
							relevantAgent: {
								id: relevantAgent.agentId,
								blueprintId: relevantAgent.blueprintId,
							},
						},
					}),
					action: (result) => ({
						type: "addNode",
						node: result,
					}),
				});
			} else {
				mutateBlueprint({
					optimisticAction: {
						type: "addNode",
						node: {
							id: nodeId,
							isCreating: true,
							position: {
								x: flowPosition.x,
								y: flowPosition.y,
							},
							className: nodeClassName,
							properties: nodeClass.properties ?? [],
							propertyPortMap: nodeClass.propertyPortMap ?? {},
							inputPorts: (nodeClass.inputPorts ?? []).map(
								({ type, label, key }, index) => ({
									id: createId(),
									nodeId: nodeId,
									type: type,
									name: label ?? "",
									direction: "input",
									order: index,
									portsBlueprintsId: 0,
									nodeClassKey: key,
								}),
							),
							outputPorts: (nodeClass.outputPorts ?? []).map(
								({ type, label, key }, index) => ({
									id: createId(),
									nodeId: nodeId,
									type: type,
									name: label ?? "",
									direction: "output",
									order: index,
									portsBlueprintsId: 0,
									nodeClassKey: key,
								}),
							),
						},
					},
					mutation: addNode({
						blueprintId: blueprint.id,
						node: {
							className: nodeClassName,
							position: { x: flowPosition.x, y: flowPosition.y },
						},
					}),
					action: (result) => ({
						type: "addNode",
						node: result,
					}),
				});
			}
		},
		[reactFlowInstance, mutateBlueprint, nodeClasses, blueprint.id],
	);
	return { addNodeAction };
};
