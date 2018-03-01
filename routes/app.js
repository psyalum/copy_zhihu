var express = require('express');
var router = express.Router();
var options = {
    root: 'D:/ss/copy_zhihu.test/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};
router.post('/login', function (req, res) {
    //debugger;
    var body = req.body;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: '1234',
        database: 'db_zhihu'
    });
    connection.connect();
    connection.query("SELECT db_zhihu_user_password,db_zhihu_user_id FROM db_zhihu_user WHERE db_zhihu_user_name=?", body.name, function (error, results, fields) {
        if (error) {
            debugger;
            return connection.rollback(function () {
                throw error;
            });
        }else{
            debugger;
            if(results.length===0){//如果用户名不存在
                res.send('failure');
            }else{//用户存在，分两种情况，密码正确，密码错误
                if (results[0].db_zhihu_user_password === body.pwd) {
                    debugger;
                    res.send(results[0]);
                } else {
                    debugger;
                    res.send('failure');
                }
            }
        }
    });
});
router.get('/getSearchContent', function (req, res) {
   // debugger;
    var body=req.query.search;
    console.log(body);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: '1234',
        database: 'db_zhihu',

    });
    connection.connect();
    var a="SELECT db_zhihu_ques.db_zhihu_ques_id,db_zhihu_ques_title,appro_num,db_zhihu_answ_content,db_zhihu_answ_id,db_zhihu_user_name FROM db_zhihu_ques " +
        "JOIN db_zhihu_answ ON db_zhihu_ques.db_zhihu_ques_id=db_zhihu_answ.db_zhihu_answ_ques " +
        "JOIN db_zhihu_user on db_zhihu_answ.db_zhihu_answ_author=db_zhihu_user.db_zhihu_user_id " +
        "JOIN (SELECT db_zhihu_appro_answerid,count(1) AS appro_num FROM db_zhihu_appro " +
        "GROUP BY db_zhihu_appro_answerid) A on db_zhihu_answ.db_zhihu_answ_id=A.db_zhihu_appro_answerid  WHERE db_zhihu_ques_title LIKE '%"+body+"%'";
    connection.query(a, function (error, results, fields) {
        if (error) {
            return connection.rollback(function () {
                throw error;
            });
        }else{
            res.send(results);
        }
    });
});
router.get('/getContent', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: '1234',
        database: 'db_zhihu',
    });
    connection.connect();
    connection.query("SELECT db_zhihu_ques.db_zhihu_ques_id,db_zhihu_ques_title,appro_num,db_zhihu_answ_content,db_zhihu_answ_id,db_zhihu_user_name FROM db_zhihu_ques " +
        "JOIN db_zhihu_answ ON db_zhihu_ques.db_zhihu_ques_id=db_zhihu_answ.db_zhihu_answ_ques " +
        "JOIN db_zhihu_user on db_zhihu_answ.db_zhihu_answ_author=db_zhihu_user.db_zhihu_user_id " +
        "JOIN (SELECT db_zhihu_appro_answerid,count(1) AS appro_num FROM db_zhihu_appro " +
        "GROUP BY db_zhihu_appro_answerid) A on db_zhihu_answ.db_zhihu_answ_id=A.db_zhihu_appro_answerid", function (error, results, fields) {
        if (error) {
            return connection.rollback(function () {
                throw error;
            });
        }else{
            //debugger;
            data = {};
            for (var i = 0; i < results.length; i++) {
                data[results[i].db_zhihu_ques_id] = results[i];
            }
            // data[results.]
            res.send(data);
        }
    });
});
router.post('/register', function (req, res) {
    var body = req.body;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: '1234',
        database: 'db_zhihu'
    });
    connection.connect();
    connection.query("INSERT INTO db_zhihu_user SET ?", {
        db_zhihu_user_name: body.name,
        db_zhihu_user_password: body.pwd,
        db_zhihu_user_phonenumber: body.phone
    }, function (error, results, fields) {
        if (error) {
            return connection.rollback(function () {
                throw error;
            });
        } else {
            res.send('success');
        }
    });
})
router.post('/postquestion', function (req, res) {
    //debugger;
    var body = req.body;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: '1234',
        database: 'db_zhihu'
    });
    connection.connect();
    connection.query("INSERT INTO db_zhihu_ques SET ?", {
        db_zhihu_ques_title: body.title,
        db_zhihu_ques_content: body.content,
        db_zhihu_ques_author: body.author
    }, function (error, results, fields) {
        if (error) {
            return connection.rollback(function () {
                throw error;
            });
        } else {
            res.send('success');
        }
    });
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile('zhihu.html', options);
});
router.post('/approval', function (req, res) {
    debugger;
   req.cookies.name=req.body.cookname;
   //req.cookies.name='赵文爽';//这句先暂时加这里，以后做一个session，保持会话
    //req.cookies.name = '狄仁杰342342342';
    var body = req.body;
    var mysql = require('mysql');
    var appname = req.cookies.name;
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: '1234',
        database: 'db_zhihu'
        //multipleStatements:true//允许多个sql语句同时查询
    });
    console.log(body.num);
    console.log(body.answid);

    connection.connect();
    connection.query("SELECT db_zhihu_appro.db_zhihu_appro_answerid," +
        "db_zhihu_user.db_zhihu_user_id FROM db_zhihu_appro " +
        "JOIN db_zhihu_user ON db_zhihu_user.db_zhihu_user_id=db_zhihu_appro.db_zhihu_appro_userid " +
        "WHERE db_zhihu_user_name=? AND db_zhihu_appro_answerid=?", [appname, body.answid]
        , function (error, results, fields) {
        //debugger;
            if (error) {
                debugger;
                return connection.rollback(function () {
                    throw error;
                });
            } else {
                debugger;
                var updateApproNum = parseInt(body.num);
                if (results.length > 0) {
                    res.send({"data": updateApproNum,'message':'你已经赞过，不可重复点赞'});
                } else {
                    //debugger;
                    connection.query("SELECT db_zhihu_user_id FROM db_zhihu_user WHERE db_zhihu_user_name=?",[appname],
                     function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function () {
                                throw error;
                            });
                        } else {
                            console.log(body.answerid);
                            connection.query("INSERT INTO db_zhihu_appro SET ?",{
                                 db_zhihu_appro_answerid: body.answid,
                                 db_zhihu_appro_userid: results[0].db_zhihu_user_id
                            },function(error,results,fields){
                                if (error) {
                                    return connection.rollback(function () {
                                        throw error;
                                    });
                                } else {
                                    updateApproNum = updateApproNum + 1;
                                    res.send({"data": updateApproNum});
                                }
                            });
                        }
                    });
                }
            }
        });
});
router.post('/comment', function (req, res) {
    //debugger;
    var coanswerid=req.body.answerid;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: '1234',
        database: 'db_zhihu',

    });
    connection.connect();
    connection.query("SELECT db_zhihu_comment.db_zhihu_comment_id AS firstID," +
        "db_zhihu_comment.db_zhihu_comment_content AS firstContem," +
        "db_zhihu_answ_content,db_zhihu_answ_id," +
        "db_zhihu_user.db_zhihu_user_name AS firstName," +
        "A.db_zhihu_comment_id AS secondeID," +
        "A.db_zhihu_comment_content AS secondContent," +
        "A.db_zhihu_user_name AS secondName " +
        "FROM db_zhihu_comment " +
        "LEFT JOIN db_zhihu_answ ON db_zhihu_comment.db_zhihu_comment_answerid=db_zhihu_answ.db_zhihu_answ_id " +
        "LEFT JOIN db_zhihu_user on db_zhihu_comment.db_zhihu_comment_userid=db_zhihu_user.db_zhihu_user_id " +
        "LEFT JOIN (SELECT * FROM db_zhihu_comment JOIN db_zhihu_user on db_zhihu_comment_userid=db_zhihu_user_id) A " +
        "on db_zhihu_comment.db_zhihu_comment_id=A.db_zhihu_comment_seconduserid " +
        "WHERE db_zhihu_answ_id=?",coanswerid, function (error, results, fields) {
        if (error) {
            return connection.rollback(function () {
                throw error;
            });
        }else{
            res.send(results);
        }
    });
});
router.post('/postcomment', function (req, res) {
    debugger;
    var body = req.body;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: '1234',
        database: 'db_zhihu'
    });
    connection.connect();
    connection.query("INSERT INTO db_zhihu_comment SET ?", {
        db_zhihu_comment_content: body.commcontent,
        db_zhihu_comment_answerid: body.commanswid,
        db_zhihu_comment_userid: body.commuserid,
        db_zhihu_comment_seconduserid:body.commsenuserid
    }, function (error, results, fields) {
        if (error) {
            return connection.rollback(function () {
                throw error;
            });
        } else {
            res.send('success');
        }
    });
})
router.post('/getdetail', function (req, res) {
    debugger;
    var body = req.body;
    var tempid=body.id;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: '1234',
        database: 'db_zhihu'
    });
    connection.connect();
    connection.query("SELECT db_zhihu_ques.db_zhihu_ques_id,db_zhihu_ques_title,appro_num,db_zhihu_answ_content,db_zhihu_answ_id,db_zhihu_user_name FROM db_zhihu_ques " +
        "JOIN db_zhihu_answ ON db_zhihu_ques.db_zhihu_ques_id=db_zhihu_answ.db_zhihu_answ_ques " +
        "JOIN db_zhihu_user on db_zhihu_answ.db_zhihu_answ_author=db_zhihu_user.db_zhihu_user_id " +
        "JOIN (SELECT db_zhihu_appro_answerid,count(1) AS appro_num FROM db_zhihu_appro " +
        "GROUP BY db_zhihu_appro_answerid) A on db_zhihu_answ.db_zhihu_answ_id=A.db_zhihu_appro_answerid "+
        "where db_zhihu_answ_ques=? ",[tempid], function (error, results, fields) {
        if (error) {
            return connection.rollback(function () {
                throw error;
            });
        } else {
            res.send(results);
        }
    });
})
module.exports = router;
