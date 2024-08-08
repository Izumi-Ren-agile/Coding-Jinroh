import React from "react";

/**
 * 
 * @param {Object} props - 言語とソースコードを持ったオブジェクト
 * @param {string} props.language - 使用するプログラミング言語
 * @param {string} props.sourceCode - 実行するソースコード
 * @returns {Object} - stdoutの結果とコンパイルエラーを含んだオブジェクト
 */
export const SimpleCompiler = async ({ language, sourceCode }) => {
  const sourceCodeForURL = encodeURIComponent(sourceCode);

  const urlForPost = `http://api.paiza.io:80/runners/create?source_code=${sourceCodeForURL}&language=${language}&api_key=guest`;

  try {
    // POSTリクエストを送信してIDを取得
    const postResponse = await fetch(urlForPost, { method: "POST" });
    const postResult = await postResponse.json();
    const id = postResult.id;

    // GETリクエストで結果を取得する関数
    const getCompiledData = async () => {
      try {
        const urlForGet = `http://api.paiza.io/runners/get_details?id=${id}&api_key=guest`;

        const getResponse = await fetch(urlForGet);
        const jsonData = await getResponse.json();

        if (jsonData.status === "completed") {
          return {
            output: jsonData.stdout,
            buildErrors: jsonData.build_stderr,
          };
        } else {
          return new Promise((resolve) => {
            setTimeout(async () => {
              resolve(await getCompiledData()); // 状態がcompletedになるまで再帰的に呼び出し
            }, 1000); // 1秒後に再度チェック
          });
        }
      } catch (error) {
        return { error: error.message };
      }
    };

    return await getCompiledData(); // コンパイル結果の取得を開始
  } catch (error) {
    return { error: error.message };
  }
};
