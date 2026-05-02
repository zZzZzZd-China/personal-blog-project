import express from "express";
import loginRouter from "./login.js";
import articleRouter from "./article.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", loginRouter);
app.use("/api", articleRouter);

app.use((err, req, res, next) => {
  res.json({ message: "服务器错误" + err.message, status: "error" });
});

app.listen(3000, () => {
  console.log("Server is running");
});
