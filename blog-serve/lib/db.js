const mysql = require('mysql2/promise');
const config = require('../config/default');

// 创建连接池
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 封装通用查询方法
const query = async (sql, values) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [results] = await connection.execute(sql, values);
        await connection.commit();
        return results;
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Database error:', error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// 创建数据库
const createDatabase = async () => {
    const createDatabaseSql = `CREATE DATABASE IF NOT EXISTS ${config.database.DATABASE} DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;`;
    const tempPool = mysql.createPool({
        host: config.database.HOST,
        user: config.database.USER,
        password: config.database.PASSWORD
    });
    try {
        const connection = await tempPool.getConnection();
        await connection.execute(createDatabaseSql);
        connection.release();
        console.log('Database created successfully');
    } catch (error) {
        console.error('Error creating database:', error);
        throw error;
    } finally {
        await tempPool.end();
    }
};

// 创建数据表
const createTables = async () => {
    const tables = [
        {
            name: 'wall',
            sql: `create table if not exists wall(
                    id INT NOT NULL,
                    label int NOT NULL COMMENT '留言标签（0留言、1理想...）',
                    color int NOT NULL COMMENT '留言颜色（0红、1黄...）',
                    content VARCHAR(1000) NOT NULL COMMENT '留言内容',
                    user_id VARCHAR(100) NOT NULL COMMENT '留言者ID',
                    user_type INT NOT NULL COMMENT '用户类型 (0登录用户，1游客)',
                    user_name VARCHAR(100) COMMENT '留言者名称',
                    createdate VARCHAR(100) NOT NULL COMMENT '创建时间',
                    PRIMARY KEY (id)
                );`
        },
    ];

    for (const table of tables) {
        try {
            await query(table.sql);
            console.log(`Table ${table.name} created successfully`);
        } catch (error) {
            console.error(`Error creating table ${table.name}:`, error);
            throw error;
        }
    }
};

// 初始化数据库
const initDatabase = async () => {
    try {
        await createDatabase();
        await createTables();
        console.log('Database initialization completed');
    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
};

initDatabase()

// 数据库操作方法
module.exports = {
    /**
     * 留言墙相关
     */
    // 新建留言
    insertWall: async (values) => {
        const sql = "insert into wall set id=?,label=?,color=?,content=?,user_id=?,user_type=?,user_name=?,createdate=?;"
        return query(sql, values)
    },

    // // 新建反馈
    // insertFeedBack: async (values) => {
    //     const sql = 'INSERT INTO feedbacks (wallId, userId, type, moment) VALUES (?, ?, ?, NOW());';
    //     return query(sql, values);
    // },

    // // 新建评论
    // insertComment: async (values) => {
    //     const sql = 'INSERT INTO comments (wallId, userId, imgurl, comment, name, moment) VALUES (?, ?, ?, ?, ?, NOW());';
    //     return query(sql, values);
    // },

    // // 新建用户
    // insertUser: async (values) => {
    //     const sql = 'INSERT INTO user (username, password, moment) VALUES (?, ?, NOW());';
    //     return query(sql, values);
    // },

    // // 删除墙及其关联数据
    // deleteWall: async (id) => {
    //     const sql = 'DELETE FROM walls WHERE id = ?;';
    //     return query(sql, [id]);
    // },

    // // 删除反馈
    // deleteFeedback: async (id) => {
    //     const sql = 'DELETE FROM feedbacks WHERE id = ?;';
    //     return query(sql, [id]);
    // },

    // // 删除评论
    // deleteComment: async (id) => {
    //     const sql = 'DELETE FROM comments WHERE id = ?;';
    //     return query(sql, [id]);
    // },

    // // 分页查询墙
    // findWallPage: async (page, pagesize, type, label) => {
    //     let sql;
    //     let params;
    //     if (label === -1) {
    //         // 查询全部
    //         sql = 'SELECT * FROM walls WHERE type = ? ORDER BY id DESC LIMIT ? OFFSET ?;';
    //         params = [type, pagesize, (page - 1) * pagesize];
    //     } else {
    //         // 查询选择的标签
    //         sql = 'SELECT * FROM walls WHERE type = ? AND label = ? ORDER BY id DESC LIMIT ? OFFSET ?;';
    //         params = [type, label, pagesize, (page - 1) * pagesize];
    //     }
    //     return query(sql, params);
    // },

    // // 倒叙分页查询墙的评论
    // findCommentPage: async (wallId, page, pagesize) => {
    //     const sql = 'SELECT * FROM comments WHERE wallId = ? ORDER BY id DESC LIMIT ? OFFSET ?;';
    //     return query(sql, [wallId, pagesize, (page - 1) * pagesize]);
    // },

    // // 查询各反馈总数据
    // feedbackCount: async (wallId, type) => {
    //     const sql = 'SELECT COUNT(*) as count FROM feedbacks WHERE wallId = ? AND type = ?;';
    //     return query(sql, [wallId, type]);
    // },

    // // 查询评论总数
    // commentCount: async (wallId) => {
    //     const sql = 'SELECT COUNT(*) as count FROM comments WHERE wallId = ?;';
    //     return query(sql, [wallId]);
    // },

    // // 是否点赞
    // isLike: async (wallId, userId) => {
    //     const sql = 'SELECT COUNT(*) as count FROM feedbacks WHERE wallId = ? AND userId = ? AND type = 0;';
    //     return query(sql, [wallId, userId]);
    // },

    // // 根据用户名查找用户
    // findUserByUserName: async (username) => {
    //     const sql = 'SELECT * FROM user WHERE username = ?;';
    //     return query(sql, [username]);
    // },

    // // 根据用户名和密码查找用户（用户登录）
    // findUserByUserNameAndPassword: async (username, password) => {
    //     const sql = 'SELECT * FROM user WHERE username = ? AND password = ?;';
    //     return query(sql, [username, password]);
    // },

    // // 更新用户信息
    // updateUser: async (username, password, email, imgurl, id) => {
    //     const sql = 'UPDATE user SET username = ?, password = ?, email = ?, imgurl = ? WHERE id = ?;';
    //     return query(sql, [username, password, email, imgurl, id]);
    // },

    // // 根据邮箱和用户名修改密码
    // updatePasswordByEmail: async (password, username, email) => {
    //     const sql = 'UPDATE user SET password = ? WHERE username = ? AND email = ?;';
    //     return query(sql, [password, username, email]);
    // },

    // // 根据用户名和邮箱查找用户
    // findUserByUserNameAndEmail: async (username, email) => {
    //     const sql = 'SELECT * FROM user WHERE username = ? AND email = ?;';
    //     return query(sql, [username, email]);
    // }
};