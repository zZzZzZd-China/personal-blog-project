import { Router } from "express";
import db from "./db.js";
const router = Router();

//个人
router.get("/get-personal-article", (req, res) => {
  db.query(
    "select * from 001_schema.article where user = ? and isDelete = 0",
    [req.query.user],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ message: "服务器错误", status: "error" });
        return;
      }
      res.json({ message: "获取用户文章成功", status: 200, data: results });
    },
  );
});
router.post("/delete-personal-article", (req, res) => {
  console.log(req.body);
  db.query(
    "update 001_schema.article set isDelete = ? where id = ?",
    [1, req.body.id],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ message: "服务器错误", status: "error" });
        return;
      }
      res.json({ message: "删除文章成功", status: 200 });
    },
  );
});
router.post("/post-personal-article", (req, res) => {
  db.query(
    "insert into 001_schema.article set ?",
    [req.body],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ message: "服务器错误", status: "error" });
        return;
      }
      res.json({ message: "提交成功", status: "200" });
    },
  );
});
router.put("/put-personal-article", (req, res) => {
  console.log(req.body);
  db.query(
    "update 001_schema.article set ? where id= ? and isDelete = 0",
    [req.body, req.body.id],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ message: "服务器错误", status: "error" });
        return;
      }
      res.json({ message: "修改成功", status: "200" });
    },
  );
});

router.get("/get--personal-article-count", (req, res) => {
  db.query(
    "select categories , count(*) as total_count from 001_schema.article where isDelete=0 group by categories",
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ message: "服务器错误", status: "error" });
        return;
      }
      res.json({
        message: "获取站内文章数量成功",
        status: "200",
        data: results,
      });
    },
  );
});
export default router;
