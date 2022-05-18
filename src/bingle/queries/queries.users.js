const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUsers = "INSERT INTO  users (username, email) VALUES ($1, $2)";

module.exports = {
    getUsers,
    getUsersById,
    checkEmailExists,
    addUsers,
}