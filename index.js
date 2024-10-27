// ==UserScript==
// @name         yopu_download
// @namespace    http://tampermonkey.net/
// @version      2024-10-27
// @description  有谱吗曲谱下载脚本
// @author       Truraly
// @match        https://yopu.co/view/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yopu.co
// @grant        none
// ==/UserScript==

/**
 * 用于“有谱吗”网站的曲谱下载
 * 修改页面元素使打印功能可以打印出完整的曲谱内容
 * 使用方法：添加为油猴插件
 *
 * 注意：
 * - 使用前设置好 `简化和弦` `并行显示` 等选项
 * - 请将浏览器的深色模式改为浅色模式
 * - 和弦展示模式请选择 `和弦名`
 */
(function () {
  "use strict";
  let main = () => {
    // 找到包含曲谱的元素
    let mainEle = document.querySelectorAll("div.sheet-container ");

    if (mainEle.length === 0) {
      console.error("没有找到曲谱内容, 请检查页面是否正确");
      return;
    }

    // 将body下其他元素替换为这单一元素
    document.body.innerHTML = mainEle[0].outerHTML;

    // 删除body外的#immersive-translate-popup
    let popup = document.getElementById("immersive-translate-popup");
    if (popup) {
      popup.remove();
    }

    // 打开下载窗口
    window.print();

    return "all done";
  };

  // 添加一个按钮，到body下

  let btn = document.createElement("button");
  btn.textContent = "下载曲谱";
  btn.style.position = "fixed";
  btn.style.right = "10px";
  btn.style.bottom = "10px";
  btn.style.zIndex = "9999";
  btn.onclick = main;
  document.body.appendChild(btn);
})();
