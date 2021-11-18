import { Agenda } from 'agenda';
export default (awsConnection) => {
  const agendajs = new Agenda();

  (async () => {
    await agendajs._ready;

    try {
      agendajs._collection.ensureIndex(
        {
          disabled: 1,
          lockedAt: 1,
          name: 1,
          nextRunAt: 1,
          priority: -1,
        },
        {
          name: 'findAndLockNextJobIndex',
        }
      );
    } catch (err) {
      console.log('Failed to create agendajs index!');
      console.error(err);
      throw err;
    }
  })();

  // ...aws s3 scheduleing code
};
