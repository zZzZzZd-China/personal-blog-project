import { Router } from "express";
import db from "./db.js";
const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 1. 从数据库查询用户
  db.query(
    "SELECT * FROM 001_schema.login WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ message: "服务器错误", status: "error" });
        return;
      }
      // 2. 根据查询结果返回不同状态
      if (results.length > 0) {
        // 登录成功，返回用户信息和成功状态
        res.json({
          message: "登录成功",
          status: 200,
          data: results[0],
        });
      } else {
        // 用户名或密码错误
        res.json({
          message: "用户名或密码错误",
          status: 401,
        });
      }
    },
  );
});

router.put("/setting", (req, res) => {
  console.log(req.body);
  db.query(
    "update 001_schema.login set ? where username = ?",
    [req.body, req.body.username],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ message: "服务器错误", status: "error" });
        return;
      }
      res.json({ message: "修改个人信息成功", status: "200" });
    },
  );
});

router.post("/enroll", (req, res) => {
  console.log(req.body);
  db.query("insert into 001_schema.login set ?", [req.body], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "服务器错误", status: "error" });
      return;
    }
    res.json({ message: "注册成功", status: "200" });
  });
});
export default router;
