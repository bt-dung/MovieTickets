const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    membership_level_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    numberphone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    customer_score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

User.associate = (models) => {
    User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    });

    User.belongsTo(models.MembershipLevel, {
        foreignKey: 'membership_level_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
};

/**
 * Insert a new User
 * @param {Object} userData - Data to insert
 * @returns {Object} - The created movie object
 */
User.insertUser = async (userData) => {
    try {
        const existingUser = await User.findOne({ where: { email: userData.email } });

        if (!existingUser) {
            const newUser = await User.create(userData);
            return newUser;
        } else {
            throw new Error(`User already exists with email: ${userData.email}`);
        }
    } catch (error) {
        console.error("Error inserting user:", error.message);
        throw error;
    }
};

User.login = async function (email, password) {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.verified) {
            throw new Error("Account not verified");
        }

        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            throw new Error("Incorrect password");
        }

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = User;
