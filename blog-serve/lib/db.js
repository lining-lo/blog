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
                    type int NOT NULL COMMENT '类型（-1所有、0文章、1说说、2留言墙、3树洞、4相册）',
                    type_id VARCHAR(100) NOT NULL COMMENT '所属类型的ID（文章ID、说说ID、留言墙ID、树洞ID）',
                    user_id VARCHAR(100) NOT NULL COMMENT '评论者ID',
                    user_name VARCHAR(100) COMMENT '用户名称',
                    user_type INT NOT NULL COMMENT '用户类型 (0登录用户，1游客)',
                    user_imgurl VARCHAR(100) COMMENT '用户头像',
                    createdate VARCHAR(100) NOT NULL COMMENT '创建时间',
                    content VARCHAR(100) NOT NULL COMMENT '评论内容',
                    replier_id VARCHAR(100) COMMENT '回复者ID',
                    replier_name VARCHAR(100) COMMENT '回复者名称',
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
        {
            name: 'user',
            sql: `create table if not exists user( 
                    id VARCHAR(100) NOT NULL,
                    username VARCHAR(100) NOT NULL COMMENT '用户名',
                    password VARCHAR(100) NOT NULL COMMENT '密码',
                    imgurl VARCHAR(100) COMMENT '头像路径',
                    permission INT DEFAULT 1 COMMENT '权限(0管理员,1普通用户)',
                    createdate VARCHAR(100) NOT NULL COMMENT '创建时间',
                    email VARCHAR(100) COMMENT '邮箱',
                    PRIMARY KEY ( id )
                );`
        },
        {
            name: 'link',
            sql: `create table if not exists link( 
                    id VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL COMMENT '网站名称',
                    introduction VARCHAR(100) NOT NULL COMMENT '简介',
                    cover VARCHAR(100) NOT NULL COMMENT '封面',
                    url VARCHAR(100) NOT NULL COMMENT '网址',
                    state INT DEFAULT 1 COMMENT '权限(0通过,1审核中)',
                    createdate VARCHAR(100) NOT NULL COMMENT '申请时间',
                    passdate VARCHAR(100) COMMENT '申请时间',
                    PRIMARY KEY ( id )
                );`
        },
        {
            name: 'album',
            sql: `create table if not exists album( 
                    id VARCHAR(100) NOT NULL,
                    type INT NOT NULL COMMENT '所属类型 (-1所有，0风景、1美食、2日常、3二次元)',
                    name VARCHAR(100) NOT NULL COMMENT '标题',
                    imgurl VARCHAR(100) NOT NULL COMMENT '地址',
                    createdate VARCHAR(100) NOT NULL COMMENT '创建时间',
                    PRIMARY KEY ( id )
                );`
        },
        {
            name: 'diary',
            sql: `create table if not exists diary(
                    id VARCHAR(100) NOT NULL,
                    content VARCHAR(1000) NOT NULL COMMENT '留言内容',
                    imgurl VARCHAR(100) COMMENT '图片',
                    user_id VARCHAR(100) NOT NULL COMMENT '发布者ID',
                    user_name VARCHAR(100) COMMENT '发布者名称',
                    createdate VARCHAR(100) NOT NULL COMMENT '创建时间',
                    PRIMARY KEY (id)
                    );`
        },
        {
            name: 'favorites',
            sql: `create table if not exists favorites( 
                    id VARCHAR(100) NOT NULL,
                    label INT DEFAULT 0 COMMENT '标签(0前端,1后端,2工具)',
                    name VARCHAR(100) NOT NULL COMMENT '名称',
                    introduction VARCHAR(100) NOT NULL COMMENT '介绍',
                    icon VARCHAR(100) NOT NULL COMMENT '图标',
                    url VARCHAR(100) NOT NULL COMMENT '地址',
                    createdate VARCHAR(100) NOT NULL COMMENT '创建时间',
                    PRIMARY KEY ( id )
                );`
        },
        {
            name: 'article',
            sql: `create table if not exists article( 
                    id VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL COMMENT '标题',
                    label INT DEFAULT 0 COMMENT '标签(0前端,1后端,2生活,3AI)',
                    content VARCHAR(5000) NOT NULL COMMENT '内容',
                    cover VARCHAR(100) NOT NULL COMMENT '封面',
                    top int DEFAULT 1 COMMENT '是否置顶(0置顶)',
                    count int DEFAULT 0 COMMENT '查看次数',
                    createdate VARCHAR(100) NOT NULL COMMENT '创建时间',
                    updatedate VARCHAR(100) NOT NULL COMMENT '修改时间',
                    PRIMARY KEY ( id )
             );`
        },
        {
            name: 'info',
            sql: `create table if not exists info( 
                    id VARCHAR(100) NOT NULL,
                    count int DEFAULT 0 COMMENT '查看次数',
                    createdate VARCHAR(100) NOT NULL COMMENT '建站日期',
                    PRIMARY KEY ( id )
                );`
        },
        {
            name: 'label',
            sql: `create table if not exists label(
                    id INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(100) NOT NULL COMMENT '名称',
                    createdate VARCHAR(100) NOT NULL COMMENT '时间',
                    PRIMARY KEY ( id )
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
    insertComment: (values) => {
        const sql = 'insert into comment set id=?,type=?,type_id=?,user_id=?,user_name=?,user_type=?,user_imgurl=?,createdate=?,content=?,replier_id=?,replier_name=?;'
        return query(sql, values)
    },
    // 评论数
    commentCount: (values) => {
        const sql = 'SELECT count(*) as count FROM comment WHERE type_id=?;'
        return query(sql, values)
    },
    // 分页查询评论
    findCommentPage: (type_id, type, page, pagesize) => {
        let sql = null
        let values = null
        if (type === 3) {// 查询树洞
            sql = `SELECT * FROM comment WHERE type = ? ORDER BY createdate LIMIT ?,?`
            values = [type, (page - 1) * pagesize, pagesize]
        }else if(type === -1){// 查询所有
            sql = `SELECT * FROM comment ORDER BY createdate DESC LIMIT ?,?`
            values = [(page - 1) * pagesize, pagesize]
        }else {// 查询除树洞的所有
            sql = `SELECT * FROM comment WHERE type_id = ? AND type = ? ORDER BY createdate LIMIT ?,?`
            values = [type_id, type, (page - 1) * pagesize, pagesize]
        }
        return query(sql, values)
    },
    // 查看评论数量
    selectCommentCount: async () => {
        const sql = `SELECT count(*) as count FROM comment`
        return query(sql, [])
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
    // 某条信息点赞数
    praiseCount: (values) => {
        const sql = `SELECT count(*) as count from praise WHERE type_id = ?;`
        return query(sql, values)
    },
    // 是否点赞
    isPraise: async (values) => {
        const sql = `SELECT count(*) as count FROM praise WHERE type_id = ? AND user_id = ? AND user_type = ?;`
        return query(sql, values)
    },
    // 新建点赞
    insertPraise: async (values) => {
        const sql = `insert into praise set id=?,type_id=?,user_id=?,user_type=?,createdate=?;`
        return query(sql, values)
    },
    // 查看点赞数量
    selectPraiseCount: async () => {
        const sql = `SELECT count(*) as count FROM praise`
        return query(sql, [])
    },

    /**
     * 用户相关
     */
    // 新建用户
    insertUser: async (values) => {
        const sql = 'insert into user set id=?,username=?,password=?,createdate=?,imgurl=?;'
        return query(sql, values)
    },
    // 根据用户名查找用户
    findUserByUserName: async (values) => {
        const sql = `SELECT * FROM user WHERE username = ?;`
        return query(sql, values)
    },
    // 用户登录
    login: async (values) => {
        const sql = `SELECT * FROM user WHERE username=? AND password =?;`
        return query(sql, values)
    },
    // 修改用户信息
    updateUser: async (values) => {
        const sql = `UPDATE user SET username = ?,password = ?,imgurl= ?,permission=?,createdate = ? ,email = ?  WHERE id = ?;`
        return query(sql, values)
    },
    // 根据用户名和邮箱查找用户
    findUserByUserNameAndEmai: async (values) => {
        const sql = `SELECT * from user WHERE username = ? and email = ?;`
        return query(sql, values)
    },
    // 根据邮箱和用户名修改密码
    updatePasswordByEmail: async (values) => {
        const sql = `UPDATE user SET password = ? WHERE username = ? and email=?;`
        return query(sql, values)
    },
    // 查看点赞数量
    selectUserCount: async () => {
        const sql = `SELECT count(*) as count FROM user`
        return query(sql, [])
    },

    /**
     * 友链相关
     */
    // 新建友链
    insertLink: async (values) => {
        const sql = `INSERT INTO link SET id=?,name=?,introduction=?,cover=?,url=?,createdate=?`
        return query(sql, values)
    },
    // 分页查询友链
    selectLinkPage: async (values) => {
        const sql = `SELECT * FROM link WHERE state = 0 ORDER BY createdate DESC LIMIT ?,? `
        return query(sql, values)
    },

    /**
     * 图库相关
     */
    // 分页获取图库
    selectAlbumPage: async (values) => {
        const sql = `SELECT * FROM album ORDER BY createdate DESC LIMIT ?,? `
        return query(sql, values)
    },
    // 查看图库数量
    selectAlbumCount: async () => {
        const sql = `SELECT count(*) as count FROM album`
        return query(sql, [])
    },

    /**
     * 说说相关
     */
    // 分页获取说说
    selectDiaryPage: async (values) => {
        const sql = `SELECT * FROM Diary ORDER BY createdate DESC LIMIT ?,? `
        return query(sql, values)
    },

    /**
     * 收藏相关
     */
    // 新建收藏
    insertFavorites: async (values) => {
        const sql = `INSERT INTO favorites SET id=?,label=?,name=?,introduction=?,icon=?,url=?,createdate=?`
        return query(sql, values)
    },
    // 分页查询收藏
    selectFavoritesPage: async (values) => {
        const sql = `SELECT * FROM  favorites ORDER BY createdate DESC LIMIT ?,? `
        return query(sql, values)
    },

    /**
     * 文章相关
     */
    // 分页查询文章
    selectArticlePage: async (values) => {
        const sql = `SELECT * FROM article ORDER BY createdate DESC LIMIT ?,? `
        return query(sql, values)
    },
    // 根据id查找文章
    selectArticleById: async (values) => {
        const sql = `SELECT * FROM article where id = ? `
        query('UPDATE article SET count = count + 1 WHERE id = ?', values)
        return query(sql, values)
    },
    // 查询文章数量
    selectArticleCount: async () => {
        const sql = `SELECT count(*) as count FROM article`
        return query(sql, [])
    },

    /**
     * 网站信息相关
     */
    // 获取网站信息
    selectInfo: async () => {
        const sql = `SELECT * FROM info`
        query('UPDATE info SET count = count + 1', [])
        return query(sql, [])
    },

    /**
     * 分类（标签）相关
     */
    // 分页获取标签
    selectLabelPage: async (values) => {
        const sql = `SELECT * FROM label ORDER BY createdate DESC LIMIT ?,? `
        return query(sql, values)
    },
    // 查询标签数量
    selectLabelCount: async () => {
        const sql = `SELECT count(*) as count FROM label`
        return query(sql, [])
    },
};