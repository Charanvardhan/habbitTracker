import { createHabit } from './actions/createHabit';
import { listHabits } from './actions/listHabits';
import { checkInHabit } from './actions/checkInHabit';
import { MemoryHabitRepo } from './testing/memoryHabitRepo';
import { MemoryCheckInRepo } from './testing/memoryCheckInRepo';

const habitRepo = new MemoryHabitRepo();
const checkInRepo = new MemoryCheckInRepo();

async function main() {
  const created = await createHabit({ title: 'Drink water' }, { habitRepo });
  console.log('createHabit =>', created);

  if (created._tag === 'Ok') {
    const id = created.value.id;

    const checked = await checkInHabit(
      { habitId: id, date: '2026-01-18' },
      { habitRepo, checkInRepo },
    );
    console.log('checkInHabit =>', checked);
  }

  const all = await listHabits({ habitRepo });
  console.log('listHabits =>', all);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
