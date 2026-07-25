import { MachineProfileLoader } from "./modules/manufacturing/machine_profile.loader";

async function test() {
    const machines = await MachineProfileLoader.getAllMachines();

    console.log("Total Machines:", machines.length);

    console.log("First 10 Machine IDs:");

    machines.slice(0, 10).forEach(m => {
        console.log(m.machine_id);
    });
}

test();