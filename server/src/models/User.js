const { DataTypes, Op, fn } = require('sequelize');
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
    createdAt: 'createdAt',
    updatedAt: false,
    timestamps: true,
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

    User.hasMany(models.Notification, {
        foreignKey: 'user_id',
        as: 'sentNotifications'
    });

    User.hasMany(models.Notification, {
        foreignKey: 'admin_id',
        as: 'receivedNotifications'
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
    console.log(email, password)
    try {
        const user = await User.findOne({ where: { email } });
        console.log("user", user);
        if (!user) {
            throw new Error("User not found");
        }

        if (!user.verified) {
            throw new Error("Account not verified!! Please complete the verification process before logging into the system. Thank you!");
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
User.updateUser = async function (id, data) {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.update(data);
        return user;
    } catch (error) {
        throw error;
    }
}

User.deleteUser = async function (id) {
    try {
        const deletedRowsCount = await User.destroy({
            where: { id: id }
        });

        if (deletedRowsCount === 0) {
            throw new Error('User  not found');
        }

        return deletedRowsCount;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

User.analystUser = async function (startTime, endTime) {
    try {
        const count = await User.count({
            where: {
                createdAt: {
                    [Op.between]: [new Date(startTime), new Date(endTime)]
                }
            }
        });

        return { totalUsers: count };
    } catch (error) {
        throw error;
    }
};

module.exports = User;
