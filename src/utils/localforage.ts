import localforage from 'localforage'

//配置数据库名称
localforage.config({
    // 配置数据库的名称
    name: 'article-admin'
})
export default localforage