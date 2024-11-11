"use server";

import { agents, db } from "@/drizzle";
import { getUser } from "@/lib/supabase";
import { revalidateGetAgents } from "@/services/agents/actions/get-agent";
import { eq } from "drizzle-orm";
import type { AgentId } from "../../types";

interface UpdateAgentNameInput {
	agentId: AgentId;
	name: string;
}
export async function updateAgentName(input: UpdateAgentNameInput) {
	const user = await getUser();
	await db
		.update(agents)
		.set({ name: input.name })
		.where(eq(agents.id, input.agentId));
	revalidateGetAgents({ userId: user.id });
}
