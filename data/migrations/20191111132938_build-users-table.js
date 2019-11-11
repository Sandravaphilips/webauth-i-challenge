
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('username', 50);
        table.varchar("password");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
