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
            name: 'comment',
            sql: `create table if not exists comment(
                    id VARCHAR(100) NOT NULL,
                    type int NOT NULL COMMENT '类型（0文章、1说说、2留言墙、3树洞）',
                    type_id VARCHAR(100) NOT NULL COMMENT '所属类型的ID（文章ID、说说ID、留言墙ID、树洞ID）',
                    user_id VARCHAR(100) NOT NULL COMMENT '评论者ID',
                    user_name VARCHAR(100) COMMENT '用户名称',
                    user_type INT NOT NULL COMMENT '用户类型 (0登录用户，1游客)',
                    createdate VARCHAR(100) NOT NULL COMMENT '创建时间',
                    content VARCHAR(100) NOT NULL COMMENT '评论内容',
                    replier_id VARCHAR(100)  COMMENT '回复者ID',
                    PRIMARY KEY (id)
                );`
        },
        {
            name: 'wall',
            sql: `create table if not exists wall(
                    id VARCHAR(100) NOT NULL,
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
        {
            name: 'praise',
            sql: `create table if not exists praise(
                    id VARCHAR(100) NOT NULL,
                    type_id VARCHAR(100) NOT NULL COMMENT '所属类型的ID（文章ID、说说ID、留言墙ID、树洞ID）',
                    user_id VARCHAR(100) NOT NULL COMMENT '点赞者ID',
                    user_type INT NOT NULL COMMENT '用户类型 (0登录用户，1游客)',
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
     * 评论相关
     */
    // 新建评论
    insertComment:(values) => {
        const sql = 'insert into comment set id=?,type=?,type_id=?,user_id=?,user_name=?,user_type=?,createdate=?,content=?,replier_id=?;'
        return query(sql, values)
    },
    // 评论数
    commentCount:(values) => {
        const sql = 'SELECT count(*) as count FROM comment WHERE type_id=?;'
        return query(sql, values)
    },
    // 分页查询评论
    findCommentPage:(values) => {
        const sql = `SELECT * FROM comment WHERE type_id = ? ORDER BY createdate LIMIT ?,?`
        return query(sql, values)
    },

    /**
     * 留言墙相关
     */
    // 新建墙
    insertWall: async (values) => {
        const sql = "insert into wall set id=?,label=?,color=?,content=?,user_id=?,user_type=?,user_name=?,createdate=?;"
        return query(sql, values)
    },
    // 分页查询墙
    selectWallPage: async (values) => {
        let sql = 'SELECT * FROM wall ORDER BY createdate DESC LIMIT ?,?;';
        return query(sql, values);
    },

    /**
     * 点赞相关
     */
    //某条信息点赞数
    praiseCount: (values) => {
        const sql = `SELECT count(*) as count from praise WHERE type_id = ?;`
        return query(sql, values)
    },
    //是否点赞
    isPraise: async (values) => {
        const sql = `SELECT count(*) as count FROM praise WHERE type_id = ? AND user_id = ? AND user_type = ?;`
        return query(sql, values)
    }
};