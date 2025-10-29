import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid-subscription";

export default async function Plan() {
  const session = await getSession()
  
    if (!session) {redirect('/')}
      
  return (
    <div>
      <GridPlans/>
    </div>
  );
}
