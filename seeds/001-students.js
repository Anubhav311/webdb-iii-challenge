
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Web19', cohort_id: 1},
        {name: 'Web18', cohort_id: 2},
        {name: 'Web17', cohort_id: 3}
      ]);
    });
};
