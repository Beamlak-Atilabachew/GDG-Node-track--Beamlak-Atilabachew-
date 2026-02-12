import { userSchema } from "../utils/validation.js";

let users = [
    { name: "Belachew", id: 101 },
    { name: "Jonhson", id: 102 },
    { name: "Demsash", id: 103 },
];

export const getAllUser = (req, res) => {
    res.status(200).json(users);
};
export const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
};
export const createNewUser = (req, res) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }
    const { name } = req.body;
    const newUser = { name, id: users.length + 1 };
    users.push(newUser);
    console.log(newUser);
    res.status(201).json({ message: "User successfully created" });
};
export const updateUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const idIndex = users.findIndex((u) => u.id === id);
    const updates = req.body;

    if (idIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    const oldUser = users[idIndex];

    const updatedUser = {
        name: updates.name !== undefined ? updates.name : oldUser.name,
    };

    users[idIndex] = updatedUser;

    res.json({
        message: "User updated successfully",
        updatedUser: updatedUser,
    });
};
export const deleteUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const idIndex = users.findIndex((u) => u.id === id);

    if (idIndex === -1) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    const deletedUser = users[idIndex];

    users.splice(idIndex, 1);
    res.json({
        message: "User deleted successfully",
        deletedUser: deletedUser,
    });
};