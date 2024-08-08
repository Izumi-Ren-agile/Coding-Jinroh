import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TestPage = () => {
  const Diff = require("diff");

  // 比較する2つの文字列
  const oldString = "String args[]";
  const newString = "String t='k'; int a=1; String args[];";

  // 文字単位での差分を取得
  const diff = Diff.diffChars(oldString, newString);
  console.log("ディフ確認",diff)
  // 加えられた文字と除外された文字を初期化
  let addedChars = "";
  let removedChars = "";

  // 差分を解析
  diff.forEach((part) => {
    if (part.added) {
      // 加えられた文字を記録
      addedChars += part.value;
    } else if (part.removed) {
      // 除外された文字を記録
      removedChars += part.value;
    }
  });

  // 結果を出力
  console.log("Added characters:", addedChars);
  console.log("Removed characters:", removedChars);
};
