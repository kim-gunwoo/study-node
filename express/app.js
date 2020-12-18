const express = require("express");
const path = require("path");

class App {
  constructor() {
    this.app = express();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 디렉토리 추가
    this.setStatic();

    // 라우팅
    this.getRouting();

    // 404 페이지를 찾을수가 없음
    this.status404();

    // 에러처리
    this.errorHandler();
  }

  setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  setStatic() {
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  getRouting() {
    this.app.use(require("./controllers"));
  }

  status404() {
    this.app.use((req, res, next) => {
      res.status(404).json("not found");
    });
  }

  errorHandler() {
    this.app.use((err, req, res, next) => {
      console.log(err);
      res.status(err.status || 500);
      res.json({ error: err.message || "internal server error" });
    });
  }
}

module.exports = new App().app;
